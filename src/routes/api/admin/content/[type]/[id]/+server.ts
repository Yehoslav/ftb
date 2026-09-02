import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUser } from "$lib/server/auth";
import { getHandler } from "$lib/server/content";
import { isContentType } from "$lib/server/validation";

function parseId(raw: string): number {
    const id = Number(raw);
    if (!Number.isInteger(id) || id <= 0) error(400, "ID invalid");
    return id;
}

export const GET: RequestHandler = async ({ cookies, params }) => {
    await requireUser(cookies);
    if (!isContentType(params.type)) error(404, "Tip de conținut necunoscut");

    const row = await getHandler(params.type).get(parseId(params.id));
    if (!row) error(404, "Înregistrarea nu există");
    return json(row);
};

export const PUT: RequestHandler = async ({ cookies, params, request }) => {
    await requireUser(cookies);
    if (!isContentType(params.type)) error(404, "Tip de conținut necunoscut");

    const id = parseId(params.id);
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        error(400, "Corp JSON invalid");
    }

    try {
        const row = await getHandler(params.type).update(id, body);
        if (!row) error(404, "Înregistrarea nu există");
        return json(row);
    } catch (err) {
        if (err && typeof err === "object" && "issues" in err) {
            return json({
                error: "Date invalide",
                issues: (err as { issues: unknown }).issues,
            }, { status: 400 });
        }
        console.error(`update ${params.type}/${id} error:`, err);
        error(500, "Eroare la actualizare");
    }
};

export const DELETE: RequestHandler = async ({ cookies, params }) => {
    await requireUser(cookies);
    if (!isContentType(params.type)) error(404, "Tip de conținut necunoscut");

    const deleted = await getHandler(params.type).remove(parseId(params.id));
    if (!deleted) error(404, "Înregistrarea nu există");
    return json({ ok: true });
};
