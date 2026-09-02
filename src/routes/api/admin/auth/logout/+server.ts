import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { logout } from "$lib/server/auth";

export const POST: RequestHandler = async ({ cookies }) => {
    logout(cookies);
    return json({ ok: true });
};
