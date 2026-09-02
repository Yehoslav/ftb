import { type Cookies, error } from "@sveltejs/kit";
import { db, schema } from "./db";
import { eq } from "drizzle-orm";

const COOKIE_NAME = "ftb_session";
const SESSION_TTL = 7 * 24 * 60 * 60;

export interface SessionUser {
    username: string;
    displayName: string;
    role: "admin" | "editor";
    wpUserId: number | null;
    exp: number;
}

function wpUrl(): string {
    const url = process.env.WP_URL;
    if (!url) throw new Error("WP_URL nu este definit în .env");
    return url.replace(/\/+$/, "");
}

function authSecret(): string {
    const secret = process.env.AUTH_SECRET ?? process.env.REVALIDATE_TOKEN;
    if (!secret) {
        throw new Error(
            "AUTH_SECRET (sau REVALIDATE_TOKEN) nu este definit în .env",
        );
    }
    return secret;
}

const encoder = new TextEncoder();

async function hmacKey(): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        encoder.encode(authSecret()),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"],
    );
}

function toBase64Url(bytes: Uint8Array): string {
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(
        /=+$/,
        "",
    );
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    const buf = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

async function signToken(user: Omit<SessionUser, "exp">): Promise<string> {
    const payload: SessionUser = {
        ...user,
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
    };
    const data = toBase64Url(encoder.encode(JSON.stringify(payload)));
    const signature = await crypto.subtle.sign(
        "HMAC",
        await hmacKey(),
        encoder.encode(data),
    );
    return `${data}.${toBase64Url(new Uint8Array(signature))}`;
}

async function verifyToken(token: string): Promise<SessionUser | null> {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    try {
        const valid = await crypto.subtle.verify(
            "HMAC",
            await hmacKey(),
            fromBase64Url(sig),
            encoder.encode(data),
        );
        if (!valid) return null;
        const payload = JSON.parse(
            new TextDecoder().decode(fromBase64Url(data)),
        ) as SessionUser;
        if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

export interface WPUserInfo {
    id: number;
    name: string;
    slug: string;
    roles: string[];
}

export async function validateWPCredentials(
    username: string,
    appPassword: string,
): Promise<WPUserInfo | null> {
    const basic = btoa(`${username}:${appPassword}`);
    try {
        const resp = await fetch(
            `${wpUrl()}/wp-json/wp/v2/users/me?context=edit`,
            {
                headers: { Authorization: `Basic ${basic}` },
            },
        );
        if (!resp.ok) return null;
        const user = (await resp.json()) as {
            id?: number;
            name?: string;
            slug?: string;
            roles?: string[];
        };
        if (!user.id || !user.slug) return null;
        return {
            id: user.id,
            name: user.name ?? user.slug,
            slug: user.slug,
            roles: user.roles ?? [],
        };
    } catch {
        return null;
    }
}

function mapRole(roles: string[]): "admin" | "editor" {
    return roles.includes("administrator") ? "admin" : "editor";
}

export async function login(
    cookies: Cookies,
    username: string,
    appPassword: string,
): Promise<SessionUser> {
    const wpUser = await validateWPCredentials(username, appPassword);
    if (!wpUser) error(401, "Credențiale WordPress invalide");

    const role = mapRole(wpUser.roles);
    const [row] = await db
        .insert(schema.users)
        .values({
            wpUserId: wpUser.id,
            username: wpUser.slug,
            displayName: wpUser.name,
            role,
            lastLogin: new Date(),
        })
        .onConflictDoUpdate({
            target: schema.users.username,
            set: {
                displayName: wpUser.name,
                role,
                lastLogin: new Date(),
                wpUserId: wpUser.id,
            },
        })
        .returning();

    const token = await signToken({
        username: wpUser.slug,
        displayName: wpUser.name,
        role,
        wpUserId: wpUser.id,
    });

    cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL,
    });

    return {
        username: row.username,
        displayName: row.displayName,
        role: row.role,
        wpUserId: row.wpUserId,
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
    };
}

export function logout(cookies: Cookies): void {
    cookies.delete(COOKIE_NAME, { path: "/" });
}

export async function getSessionUser(
    cookies: Cookies,
): Promise<SessionUser | null> {
    const token = cookies.get(COOKIE_NAME);
    if (!token) return null;
    return verifyToken(token);
}

export async function requireUser(cookies: Cookies): Promise<SessionUser> {
    const user = await getSessionUser(cookies);
    if (!user) error(401, "Autentificare necesară");
    return user;
}

export async function getUserByUsername(username: string) {
    const [row] = await db.select().from(schema.users).where(
        eq(schema.users.username, username),
    );
    return row ?? null;
}
