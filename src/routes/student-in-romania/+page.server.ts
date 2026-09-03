import type { PageServerLoad } from "./$types";
import { getMembri } from "$lib/server/googleSheets";
import { getRecentPosts } from "$lib/server/queries/posts";

export const load: PageServerLoad = async () => {
    const membri = await getMembri();

    const posts = await getRecentPosts(3).catch(() => []);

    return {
        membri,
        posts,
        seo: {
            title: "Student în România",
            description:
                "Te-ai înscris deja? Ghiduri practice, comunități pe orașe și oportunități de implicare pentru studenții basarabeni în România.",
        },
    };
};
