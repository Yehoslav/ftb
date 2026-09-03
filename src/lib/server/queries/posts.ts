import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { type Post, posts } from "../schema";
import type { WPPost } from "$lib/types/wp";

export function toWPPost(row: Post): WPPost {
    const mediaDetails =
        row.featuredImageWidth != null && row.featuredImageHeight != null
            ? { width: row.featuredImageWidth, height: row.featuredImageHeight }
            : null;
    return {
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        date: row.date.toISOString(),
        modified: (row.updatedAt ?? row.date).toISOString(),
        featuredImage: row.featuredImageUrl
            ? {
                node: {
                    sourceUrl: row.featuredImageUrl,
                    srcSet: row.featuredImageSrcset,
                    sizes: row.featuredImageSizes,
                    mediaDetails,
                },
            }
            : null,
    };
}

export interface PostsPage {
    nodes: WPPost[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
}

export function encodeCursor(offset: number): string {
    return btoa(`o:${offset}`);
}

export function decodeCursor(cursor: string | null | undefined): number | null {
    if (!cursor) return null;
    try {
        const decoded = atob(cursor);
        if (!decoded.startsWith("o:")) return null;
        const offset = Number(decoded.slice(2));
        return Number.isInteger(offset) && offset >= 0 ? offset : null;
    } catch {
        return null;
    }
}

export async function getPublishedPosts(
    limit: number,
    offset = 0,
): Promise<PostsPage> {
    const rows = await db
        .select()
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.date))
        .limit(limit + 1)
        .offset(offset);

    const hasNextPage = rows.length > limit;
    const pageRows = rows.slice(0, limit);

    return {
        nodes: pageRows.map(toWPPost),
        pageInfo: {
            hasNextPage,
            endCursor: hasNextPage ? encodeCursor(offset + limit) : null,
        },
    };
}

export async function getRecentPosts(limit: number): Promise<WPPost[]> {
    const rows = await db
        .select()
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.date))
        .limit(limit);
    return rows.map(toWPPost);
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const [row] = await db
        .select()
        .from(posts)
        .where(and(eq(posts.status, "published"), eq(posts.slug, slug)));
    return row ? toWPPost(row) : null;
}

export async function getPostsBySlugs(slugs: string[]): Promise<WPPost[]> {
    if (slugs.length === 0) return [];
    const rows = await db
        .select()
        .from(posts)
        .where(and(eq(posts.status, "published"), inArray(posts.slug, slugs)));
    const bySlug = new Map(rows.map((r) => [r.slug, toWPPost(r)]));
    return slugs.map((s) => bySlug.get(s)).filter((p): p is WPPost =>
        p !== undefined
    );
}

export async function getPublishedPostSlugs(
    limit = 100,
): Promise<Array<{ slug: string; modified: string }>> {
    const rows = await db
        .select({ slug: posts.slug, updatedAt: posts.updatedAt })
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.date))
        .limit(limit);
    return rows.map((r) => ({
        slug: r.slug,
        modified: r.updatedAt.toISOString(),
    }));
}
