import { json } from "@sveltejs/kit";
import { decodeCursor, getPublishedPosts } from "$lib/server/queries/posts";

const POSTS_PER_PAGE = 10;

export async function GET({ url }) {
    const after = url.searchParams.get("after");
    const offset = decodeCursor(after) ?? 0;

    const data = await getPublishedPosts(POSTS_PER_PAGE, offset);

    return json({
        posts: data.nodes,
        pageInfo: data.pageInfo,
    });
}
