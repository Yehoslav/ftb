import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { login } from "$lib/server/auth";
import { z } from "zod";

const loginSchema = z.object({
    username: z.string().min(1),
    appPassword: z.string().min(1),
});

export const POST: RequestHandler = async ({ request, cookies }) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return json({ error: "Corp JSON invalid" }, { status: 400 });
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
        return json({
            error: "Completează utilizatorul și parola de aplicație",
        }, { status: 400 });
    }

    try {
        const user = await login(
            cookies,
            parsed.data.username,
            parsed.data.appPassword,
        );
        return json({ user });
    } catch (err) {
        if (
            err && typeof err === "object" && "status" in err &&
            err.status === 401
        ) {
            return json({ error: "Credențiale WordPress invalide" }, {
                status: 401,
            });
        }
        console.error("login error:", err);
        return json({ error: "Eroare la autentificare" }, { status: 500 });
    }
};
