import { count, desc, eq, type SQL } from "drizzle-orm";
import { db, getClient, schema } from "./db";
import {
    type ContentType,
    eventCreateSchema,
    eventUpdateSchema,
    memberCreateSchema,
    memberUpdateSchema,
    pageCreateSchema,
    pageUpdateSchema,
    postCreateSchema,
    postUpdateSchema,
    projectCreateSchema,
    projectUpdateSchema,
    teamCreateSchema,
    teamUpdateSchema,
} from "./validation";
import { slugify } from "$lib/utils/slugify";

export interface ListOptions {
    status?: "draft" | "published";
    page: number;
    limit: number;
}

export interface ListResult {
    items: unknown[];
    total: number;
}

export interface ContentHandler {
    list(opts: ListOptions): Promise<ListResult>;
    get(id: number): Promise<unknown>;
    create(data: unknown): Promise<unknown>;
    update(id: number, data: unknown): Promise<unknown>;
    remove(id: number): Promise<boolean>;
}

async function uniqueSlug(
    table: "posts" | "pages" | "projects" | "events",
    base: string,
    excludeId?: number,
): Promise<string> {
    const clean = slugify(base) || "item";
    const res = await getClient().execute({
        sql: `SELECT slug FROM ${table} WHERE slug LIKE ?` +
            (excludeId ? " AND id != ?" : ""),
        args: excludeId ? [`${clean}%`, excludeId] : [`${clean}%`],
    });
    const taken = new Set(res.rows.map((r) => String(r.slug)));
    if (!taken.has(clean)) return clean;
    for (let i = 2;; i++) {
        const candidate = `${clean}-${i}`;
        if (!taken.has(candidate)) return candidate;
    }
}

function paginate(opts: ListOptions): { limit: number; offset: number } {
    const limit = Math.min(Math.max(opts.limit, 1), 100);
    const page = Math.max(opts.page, 1);
    return { limit, offset: (page - 1) * limit };
}

const postsHandler: ContentHandler = {
    async list({ status, page, limit }) {
        const where: SQL | undefined = status
            ? eq(schema.posts.status, status)
            : undefined;
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.posts,
        ).where(where);
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.posts)
            .where(where)
            .orderBy(desc(schema.posts.date))
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.posts).where(
            eq(schema.posts.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = postCreateSchema.parse(data);
        const slug = await uniqueSlug("posts", input.slug ?? input.title);
        const [row] = await db
            .insert(schema.posts)
            .values({ ...input, slug, date: input.date ?? new Date() })
            .returning();
        return row;
    },
    async update(id, data) {
        const input = postUpdateSchema.parse(data);
        if (input.slug) input.slug = await uniqueSlug("posts", input.slug, id);
        const [row] = await db
            .update(schema.posts)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.posts.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.posts).where(
            eq(schema.posts.id, id),
        ).returning();
        return rows.length > 0;
    },
};

const pagesHandler: ContentHandler = {
    async list({ status, page, limit }) {
        const where: SQL | undefined = status
            ? eq(schema.pages.status, status)
            : undefined;
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.pages,
        ).where(where);
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.pages)
            .where(where)
            .orderBy(schema.pages.menuOrder)
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.pages).where(
            eq(schema.pages.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = pageCreateSchema.parse(data);
        const slug = await uniqueSlug("pages", input.slug ?? input.title);
        const [row] = await db.insert(schema.pages).values({ ...input, slug })
            .returning();
        return row;
    },
    async update(id, data) {
        const input = pageUpdateSchema.parse(data);
        if (input.slug) input.slug = await uniqueSlug("pages", input.slug, id);
        const [row] = await db
            .update(schema.pages)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.pages.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.pages).where(
            eq(schema.pages.id, id),
        ).returning();
        return rows.length > 0;
    },
};

const projectsHandler: ContentHandler = {
    async list({ status, page, limit }) {
        const where: SQL | undefined = status
            ? eq(schema.projects.status, status)
            : undefined;
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.projects,
        ).where(where);
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.projects)
            .where(where)
            .orderBy(schema.projects.type, schema.projects.titlu)
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.projects).where(
            eq(schema.projects.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = projectCreateSchema.parse(data);
        const slug = await uniqueSlug("projects", input.slug ?? input.titlu);
        const [row] = await db.insert(schema.projects).values({
            ...input,
            slug,
        }).returning();
        return row;
    },
    async update(id, data) {
        const input = projectUpdateSchema.parse(data);
        if (input.slug) {
            input.slug = await uniqueSlug("projects", input.slug, id);
        }
        const [row] = await db
            .update(schema.projects)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.projects.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.projects).where(
            eq(schema.projects.id, id),
        ).returning();
        return rows.length > 0;
    },
};

const eventsHandler: ContentHandler = {
    async list({ status, page, limit }) {
        const where: SQL | undefined = status
            ? eq(schema.events.status, status)
            : undefined;
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.events,
        ).where(where);
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.events)
            .where(where)
            .orderBy(desc(schema.events.date))
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.events).where(
            eq(schema.events.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = eventCreateSchema.parse(data);
        const slug = await uniqueSlug("events", input.slug ?? input.title);
        const [row] = await db.insert(schema.events).values({ ...input, slug })
            .returning();
        return row;
    },
    async update(id, data) {
        const input = eventUpdateSchema.parse(data);
        if (input.slug) input.slug = await uniqueSlug("events", input.slug, id);
        const [row] = await db
            .update(schema.events)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.events.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.events).where(
            eq(schema.events.id, id),
        ).returning();
        return rows.length > 0;
    },
};

const membersHandler: ContentHandler = {
    async list({ page, limit }) {
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.members,
        );
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.members)
            .orderBy(schema.members.ordine)
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.members).where(
            eq(schema.members.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = memberCreateSchema.parse(data);
        const [row] = await db.insert(schema.members).values(input).returning();
        return row;
    },
    async update(id, data) {
        const input = memberUpdateSchema.parse(data);
        const [row] = await db
            .update(schema.members)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.members.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.members).where(
            eq(schema.members.id, id),
        ).returning();
        return rows.length > 0;
    },
};

const teamHandler: ContentHandler = {
    async list({ page, limit }) {
        const [{ value: total }] = await db.select({ value: count() }).from(
            schema.team,
        );
        const { limit: l, offset } = paginate({ page, limit });
        const items = await db
            .select()
            .from(schema.team)
            .orderBy(schema.team.ordine)
            .limit(l)
            .offset(offset);
        return { items, total };
    },
    async get(id) {
        const [row] = await db.select().from(schema.team).where(
            eq(schema.team.id, id),
        );
        return row ?? null;
    },
    async create(data) {
        const input = teamCreateSchema.parse(data);
        const [row] = await db.insert(schema.team).values(input).returning();
        return row;
    },
    async update(id, data) {
        const input = teamUpdateSchema.parse(data);
        const [row] = await db
            .update(schema.team)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(schema.team.id, id))
            .returning();
        return row ?? null;
    },
    async remove(id) {
        const rows = await db.delete(schema.team).where(eq(schema.team.id, id))
            .returning();
        return rows.length > 0;
    },
};

const handlers: Record<ContentType, ContentHandler> = {
    posts: postsHandler,
    pages: pagesHandler,
    projects: projectsHandler,
    events: eventsHandler,
    members: membersHandler,
    team: teamHandler,
};

export function getHandler(type: ContentType): ContentHandler {
    return handlers[type];
}
