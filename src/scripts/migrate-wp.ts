import { db, schema } from "../lib/server/db.ts";
import {
    type NewPage,
    type NewPost,
    pages as pagesTable,
    posts as postsTable,
} from "../lib/server/schema.ts";
import { resurseCategorii } from "../lib/data/resurse.ts";

const endpoint = process.env.WP_GRAPHQL_ENDPOINT;

interface WPMediaNode {
    sourceUrl?: string | null;
    srcSet?: string | null;
    sizes?: string | null;
    mediaDetails?: { width?: number | null; height?: number | null } | null;
}

interface WPPostNode {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string | null;
    modified: string | null;
    featuredImage?: { node: WPMediaNode } | null;
}

interface WPPageNode {
    title: string;
    slug: string;
    uri: string;
    content: string;
    date: string | null;
    modified: string | null;
    featuredImage?: { node: Pick<WPMediaNode, "sourceUrl"> } | null;
}

interface PostsQueryResult {
    posts: {
        nodes: WPPostNode[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
}

interface PageQueryResult {
    page: WPPageNode | null;
}

async function gql<T>(
    query: string,
    variables?: Record<string, unknown>,
): Promise<T> {
    if (!endpoint) {
        throw new Error("WP_GRAPHQL_ENDPOINT nu este definit în .env");
    }
    const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    const json = (await resp.json()) as {
        data?: T;
        errors?: Array<{ message: string }>;
    };
    if (json.errors?.length) {
        throw new Error(json.errors.map((e) => e.message).join("\n"));
    }
    if (!json.data) throw new Error("Răspuns GraphQL gol");
    return json.data;
}

function toPostRow(node: WPPostNode): NewPost {
    const img = node.featuredImage?.node;
    return {
        slug: node.slug,
        title: node.title,
        content: node.content ?? "",
        excerpt: node.excerpt ?? "",
        featuredImageUrl: img?.sourceUrl ?? null,
        featuredImageSrcset: img?.srcSet ?? null,
        featuredImageSizes: img?.sizes ?? null,
        featuredImageWidth: img?.mediaDetails?.width ?? null,
        featuredImageHeight: img?.mediaDetails?.height ?? null,
        status: "published",
        category: "actualitati",
        date: node.date ? new Date(node.date) : new Date(),
        updatedAt: node.modified ? new Date(node.modified) : new Date(),
    };
}

function upsertSet<T extends object>(
    row: T,
    key: keyof T & string,
): Omit<T, typeof key> {
    const { [key]: _drop, ...rest } = row;
    void _drop;
    return rest as Omit<T, typeof key>;
}

async function fetchAllPosts(): Promise<WPPostNode[]> {
    const all: WPPostNode[] = [];
    let after: string | null = null;
    for (;;) {
        const data: PostsQueryResult = await gql<PostsQueryResult>(
            `query AllPosts($first: Int!, $after: String) {
                posts(first: $first, after: $after, where: { categoryName: "actualitati" }) {
                    nodes {
                        title slug excerpt content date modified
                        featuredImage {
                            node { sourceUrl srcSet sizes mediaDetails { width height } }
                        }
                    }
                    pageInfo { hasNextPage endCursor }
                }
            }`,
            { first: 100, after },
        );
        all.push(...data.posts.nodes);
        if (
            !data.posts.pageInfo.hasNextPage || !data.posts.pageInfo.endCursor
        ) break;
        after = data.posts.pageInfo.endCursor;
    }
    return all;
}

async function fetchGuidePage(slug: string): Promise<WPPageNode | null> {
    const data = await gql<PageQueryResult>(
        `query Page($slug: ID!) {
            page(id: $slug, idType: URI) {
                title slug uri content date modified
                featuredImage { node { sourceUrl } }
            }
        }`,
        { slug },
    );
    return data.page;
}

export async function migrateWp(): Promise<
    { posts: number; pages: number; missing: string[] }
> {
    const wpPosts = await fetchAllPosts();
    for (const node of wpPosts) {
        const row = toPostRow(node);
        await db
            .insert(postsTable)
            .values(row)
            .onConflictDoUpdate({
                target: postsTable.slug,
                set: upsertSet(row, "slug"),
            });
    }
    console.log(`posts migrate: ${wpPosts.length} articole din WP`);

    const guideMeta = resurseCategorii.flatMap((cat) =>
        cat.items.map((item) => ({ ...item, categorieId: cat.id }))
    );

    const missing: string[] = [];
    let pageCount = 0;

    for (const meta of guideMeta) {
        let page: WPPageNode | null = null;
        try {
            page = await fetchGuidePage(meta.slug);
        } catch (err) {
            console.warn(
                `pages: eroare la "${meta.slug}":`,
                err instanceof Error ? err.message : err,
            );
        }
        if (!page) {
            missing.push(meta.slug);
            continue;
        }
        const row: NewPage = {
            slug: page.slug,
            title: page.title,
            content: page.content ?? "",
            description: meta.description,
            categorie: meta.categorieId,
            volatility: meta.volatility,
            status: "published",
            date: page.date ? new Date(page.date) : new Date(),
            modified: page.modified ? new Date(page.modified) : null,
            updatedAt: page.modified ? new Date(page.modified) : new Date(),
        };
        await db
            .insert(pagesTable)
            .values(row)
            .onConflictDoUpdate({
                target: pagesTable.slug,
                set: upsertSet(row, "slug"),
            });
        pageCount++;
    }

    console.log(
        `pages migrate: ${pageCount} pagini ghid, ${missing.length} lipsă`,
    );
    if (missing.length) console.log("lipsă din WP:", missing.join(", "));

    return { posts: wpPosts.length, pages: pageCount, missing };
}

if (import.meta.main) {
    migrateWp()
        .then((r) => {
            console.log("Gata:", r);
            process.exit(0);
        })
        .catch((err) => {
            console.error("Migrarea WP a eșuat:", err);
            process.exit(1);
        });
}
