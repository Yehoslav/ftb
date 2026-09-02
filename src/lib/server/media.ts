import { eq } from "drizzle-orm";
import { db, schema } from "./db";
import type { NewMediaItem } from "./schema";

export interface UploadedMedia {
    wpId: number;
    url: string;
    filename: string;
    mimeType: string;
    type: NewMediaItem["type"];
    width: number | null;
    height: number | null;
    alt: string;
    title: string;
}

function wpUrl(): string {
    const url = process.env.WP_URL;
    if (!url) throw new Error("WP_URL nu este definit în .env");
    return url.replace(/\/+$/, "");
}

function basicAuth(): string {
    const user = process.env.WP_USER;
    const password = process.env.WP_APP_PASSWORD;
    if (!user || !password) {
        throw new Error("WP_USER / WP_APP_PASSWORD nu sunt definite în .env");
    }
    return `Basic ${btoa(`${user}:${password}`)}`;
}

function detectType(mimeType: string): NewMediaItem["type"] {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    if (
        mimeType === "application/pdf" || mimeType.includes("officedocument") ||
        mimeType.startsWith("text/")
    ) {
        return "document";
    }
    return "other";
}

interface WPMediaResponse {
    id: number;
    source_url?: string;
    title?: { raw?: string };
    alt_text?: string;
    mime_type?: string;
    media_details?: { width?: number; height?: number };
}

export async function uploadToWP(
    file: File,
    metadata?: { alt?: string; title?: string; caption?: string },
): Promise<UploadedMedia> {
    const form = new FormData();
    form.append("file", file, file.name);
    if (metadata?.title) form.append("title", metadata.title);
    if (metadata?.caption) form.append("caption", metadata.caption);

    const resp = await fetch(`${wpUrl()}/wp-json/wp/v2/media`, {
        method: "POST",
        headers: {
            Authorization: basicAuth(),
            "Content-Disposition": `attachment; filename="${
                encodeURIComponent(file.name)
            }"`,
        },
        body: form,
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(
            `Upload WP eșuat (${resp.status}): ${text.slice(0, 300)}`,
        );
    }

    const json = (await resp.json()) as WPMediaResponse;

    const alt = metadata?.alt ?? "";
    if (alt || metadata?.title || metadata?.caption) {
        await fetch(`${wpUrl()}/wp-json/wp/v2/media/${json.id}`, {
            method: "POST",
            headers: {
                Authorization: basicAuth(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                alt_text: alt,
                title: metadata?.title,
                caption: metadata?.caption,
            }),
        }).catch(() => {});
    }

    const mimeType = json.mime_type ?? file.type ?? "application/octet-stream";

    return {
        wpId: json.id,
        url: json.source_url ?? "",
        filename: file.name,
        mimeType,
        type: detectType(mimeType),
        width: json.media_details?.width ?? null,
        height: json.media_details?.height ?? null,
        alt,
        title: metadata?.title ?? json.title?.raw ?? file.name,
    };
}

export async function uploadMedia(
    file: File,
    uploadedBy: string,
    metadata?: { alt?: string; title?: string; caption?: string },
) {
    const uploaded = await uploadToWP(file, metadata);
    const [row] = await db
        .insert(schema.media)
        .values({
            wpId: uploaded.wpId,
            filename: uploaded.filename,
            url: uploaded.url,
            alt: uploaded.alt,
            mimeType: uploaded.mimeType,
            type: uploaded.type,
            width: uploaded.width,
            height: uploaded.height,
            uploadedBy,
        })
        .returning();
    return row;
}

export async function deleteMediaRecord(id: number): Promise<boolean> {
    const rows = await db.delete(schema.media).where(eq(schema.media.id, id))
        .returning();
    return rows.length > 0;
}

export async function listMedia(type?: NewMediaItem["type"], limit = 60) {
    if (type) {
        return db.select().from(schema.media).where(eq(schema.media.type, type))
            .limit(limit);
    }
    return db.select().from(schema.media).limit(limit);
}
