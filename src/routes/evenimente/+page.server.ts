import type { PageServerLoad } from "./$types";
import { getPublishedEvents } from "$lib/server/queries/events";

export const load: PageServerLoad = async () => {
    const evenimente = await getPublishedEvents();

    return {
        evenimente,
        seo: {
            title: "Evenimente",
            description:
                "Evenimente organizate de FTB România — târguri, workshop-uri, activități pentru tinerii basarabeni.",
        },
    };
};
