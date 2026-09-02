import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUser } from "$lib/server/auth";
import { listMedia, uploadMedia } from "$lib/server/media";

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export const GET: RequestHandler = async ({ cookies, url }) => {
    await requireUser(cookies);
    const typeParam = url.searchParams.get("type");
    const type = typeParam === "image" || typeParam === "document" ||
            typeParam === "video" || typeParam === "other"
        ? typeParam
        : undefined;
    const items = await listMedia(type);
    return json({ items });
};

export const POST: RequestHandler = async ({ cookies, request }) => {
    const user = await requireUser(cookies);

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        error(400, "Formular invalid");
    }

    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
        error(400, "Fișier lipsă");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        error(413, "Fișierul depășește 25 MB");
    }

    const alt = typeof form.get("alt") === "string"
        ? String(form.get("alt"))
        : undefined;
    const title = typeof form.get("title") === "string"
        ? String(form.get("title"))
        : undefined;

    try {
        const row = await uploadMedia(file, user.username, { alt, title });
        return json(row, { status: 201 });
    } catch (err) {
        console.error("media upload error:", err);
        error(500, err instanceof Error ? err.message : "Eroare la upload");
    }
};
