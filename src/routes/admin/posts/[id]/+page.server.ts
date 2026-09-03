import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { requireUser } from "$lib/server/auth";
import { db, schema } from "$lib/server/db";

export const load: PageServerLoad = async ({ cookies, params }) => {
    await requireUser(cookies);

    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) error(404, "Articolul nu există");

    const [row] = await db.select().from(schema.posts).where(
        eq(schema.posts.id, id),
    );
    if (!row) error(404, "Articolul nu există");

    return { row };
};
