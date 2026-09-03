import type { PageServerLoad } from "./$types";
import { getPageBySlug } from "$lib/server/queries/pages";
import { getResursaBySlug } from "$lib/data/resurse";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const meta = getResursaBySlug(params.slug);
    if (!meta) error(404, "Resursa nu a fost găsită");

    const page = await getPageBySlug(params.slug).catch(() => null);
    if (!page) error(404, "Resursa nu a fost găsită pe server");

    const description = page.content
        ? page.content.replace(/<[^>]+>/g, "").slice(0, 160)
        : undefined;

    return {
        page,
        seo: {
            title: page.title,
            description,
            image: page.featuredImage?.node?.sourceUrl,
        },
    };
};
