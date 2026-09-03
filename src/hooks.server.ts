import { isDemo } from "$lib/demo";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    if (isDemo) {
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
};
