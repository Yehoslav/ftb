import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
    getPublishedEditionBySlug,
    getPublishedHubBySlug,
} from "$lib/server/queries/projects";

export const load: PageServerLoad = async ({ params }) => {
    const hub = await getPublishedHubBySlug(params.slug);
    if (!hub) error(404, "Proiectul nu a fost găsit");

    const editie = await getPublishedEditionBySlug(hub.slug, params.editieSlug);
    if (!editie) error(404, "Ediția nu a fost găsită");

    return {
        hub,
        editie,
        seo: {
            title: `${editie.titlu} — ${hub.titlu}`,
            description: editie.descriere.slice(0, 160),
            image: editie.imagine ?? hub.imagine,
        },
    };
};
