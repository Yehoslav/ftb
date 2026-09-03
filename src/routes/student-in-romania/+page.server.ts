import type { PageServerLoad } from "./$types";
import { getMembri } from "$lib/server/googleSheets";
import { getRecentPosts } from "$lib/server/queries/posts";
import { getPublishedEvents } from "$lib/server/queries/events";
import { esteTrecut, sorteazaEvenimente } from "$lib/data/evenimente";

export const load: PageServerLoad = async () => {
    const membri = await getMembri();

    const [posts, toateEvenimentele] = await Promise.all([
        getRecentPosts(3).catch(() => []),
        getPublishedEvents().catch(() => []),
    ]);

    const azi = new Date();
    const evenimenteVitoare = sorteazaEvenimente(
        toateEvenimentele.filter((e) => !esteTrecut(e, azi)),
    ).slice(0, 3);

    return {
        membri,
        posts,
        evenimenteVitoare,
        seo: {
            title: "Student în România",
            description:
                "Te-ai înscris deja? Ghiduri practice, comunități pe orașe și oportunități de implicare pentru studenții basarabeni în România.",
        },
    };
};
