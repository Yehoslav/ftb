import { json } from "@sveltejs/kit";
import { REVALIDATE_TOKEN } from "$env/static/private";
import { clearSheetsCache } from "$lib/server/googleSheets";

export async function POST({ request }) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${REVALIDATE_TOKEN}`) {
        return new Response("Unauthorized", { status: 401 });
    }
    clearSheetsCache();
    return json({ ok: true });
}
