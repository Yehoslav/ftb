import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { type Page, pages } from "../schema";
import type { WPPage } from "$lib/types/wp";

export function toWPPage(row: Page): WPPage {
    return {
        title: row.title,
        slug: row.slug,
        uri: `/${row.slug}/`,
        content: row.content,
        date: (row.date ?? row.createdAt).toISOString(),
        modified: (row.modified ?? row.updatedAt).toISOString(),
        featuredImage: null,
    };
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
    const [row] = await db
        .select()
        .from(pages)
        .where(and(eq(pages.status, "published"), eq(pages.slug, slug)));
    return row ? toWPPage(row) : null;
}

export interface GuideMeta {
    slug: string;
    title: string;
    description: string;
    categorie: string | null;
    volatility: "timeless" | "volatile" | "critical" | null;
    modified: string;
}

export async function getPublishedGuides(): Promise<GuideMeta[]> {
    const rows = await db
        .select({
            slug: pages.slug,
            title: pages.title,
            description: pages.description,
            categorie: pages.categorie,
            volatility: pages.volatility,
            modified: pages.modified,
        })
        .from(pages)
        .where(eq(pages.status, "published"))
        .orderBy(pages.menuOrder);
    return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.description,
        categorie: r.categorie,
        volatility: r.volatility,
        modified: (r.modified ?? new Date()).toISOString(),
    }));
}
