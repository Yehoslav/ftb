import { count, desc, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { requireUser } from "$lib/server/auth";
import { db, schema } from "$lib/server/db";

export const load: PageServerLoad = async ({ cookies }) => {
    await requireUser(cookies);

    const [
        postsTotal,
        postsDrafts,
        pagesTotal,
        projectsTotal,
        eventsTotal,
        membersTotal,
        teamTotal,
        mediaTotal,
    ] = await Promise.all([
        db.select({ value: count() }).from(schema.posts),
        db.select({ value: count() }).from(schema.posts).where(
            eq(schema.posts.status, "draft"),
        ),
        db.select({ value: count() }).from(schema.pages),
        db.select({ value: count() }).from(schema.projects),
        db.select({ value: count() }).from(schema.events),
        db.select({ value: count() }).from(schema.members),
        db.select({ value: count() }).from(schema.team),
        db.select({ value: count() }).from(schema.media),
    ]);

    const recent = await db
        .select({
            id: schema.posts.id,
            slug: schema.posts.slug,
            title: schema.posts.title,
            status: schema.posts.status,
            date: schema.posts.date,
        })
        .from(schema.posts)
        .orderBy(desc(schema.posts.date))
        .limit(5);

    return {
        counts: {
            posts: postsTotal[0].value,
            postsDrafts: postsDrafts[0].value,
            pages: pagesTotal[0].value,
            projects: projectsTotal[0].value,
            events: eventsTotal[0].value,
            members: membersTotal[0].value,
            team: teamTotal[0].value,
            media: mediaTotal[0].value,
        },
        recent,
    };
};
