import type { PageServerLoad } from "./$types";
import { getPublishedPosts } from "$lib/server/queries/posts";

const POSTS_PER_PAGE = 10;

export const load: PageServerLoad = async () => {
    const data = await getPublishedPosts(POSTS_PER_PAGE);

    return {
        posts: data.nodes,
        pageInfo: data.pageInfo,
        seo: {
            title: "Noutăți",
            description:
                "Ultimele articole și anunțuri de la Federația Tinerilor Basarabeni.",
        },
    };
};
