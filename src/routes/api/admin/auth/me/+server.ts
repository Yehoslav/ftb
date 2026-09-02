import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getSessionUser } from "$lib/server/auth";

export const GET: RequestHandler = async ({ cookies }) => {
    const user = await getSessionUser(cookies);
    if (!user) return json({ user: null }, { status: 401 });
    return json({ user });
};
