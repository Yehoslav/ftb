import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUser } from "$lib/server/auth";
import { getHandler } from "$lib/server/content";
import { isContentType } from "$lib/server/validation";

export const GET: RequestHandler = async ({ cookies, params, url }) => {
    await requireUser(cookies);
    if (!isContentType(params.type)) error(404, "Tip de conținut necunoscut");

    const handler = getHandler(params.type);
    const statusParam = url.searchParams.get("status");
    const status = statusParam === "draft" || statusParam === "published"
        ? statusParam
        : undefined;
    const page = Number(url.searchParams.get("page") ?? 1) || 1;
    const limit = Number(url.searchParams.get("limit") ?? 20) || 20;

    const result = await handler.list({ status, page, limit });
    return json(result);
};

export const POST: RequestHandler = async ({ cookies, params, request }) => {
    await requireUser(cookies);
    if (!isContentType(params.type)) error(404, "Tip de conținut necunoscut");

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        error(400, "Corp JSON invalid");
    }

    const handler = getHandler(params.type);
    try {
        const row = await handler.create(body);
        return json(row, { status: 201 });
    } catch (err) {
        if (err && typeof err === "object" && "issues" in err) {
            return json({
                error: "Date invalide",
                issues: (err as { issues: unknown }).issues,
            }, { status: 400 });
        }
        console.error(`create ${params.type} error:`, err);
        error(500, "Eroare la salvare");
    }
};
