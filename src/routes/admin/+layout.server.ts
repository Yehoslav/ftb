import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getSessionUser } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ cookies, url }) => {
    const user = await getSessionUser(cookies);

    if (!user && url.pathname !== "/admin/login") {
        redirect(302, "/admin/login");
    }
    if (user && url.pathname === "/admin/login") {
        redirect(302, "/admin");
    }

    return { user };
};
