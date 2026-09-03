import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
    getPublishedEditionsForHub,
    getPublishedHubBySlug,
} from "$lib/server/queries/projects";

export const load: PageServerLoad = async ({ params }) => {
    const hub = await getPublishedHubBySlug(params.slug);
    if (!hub) error(404, "Proiectul nu a fost găsit");

    const editii = await getPublishedEditionsForHub(hub.slug);
    const peAni = editii.reduce<Record<number, typeof editii>>(
        (acc, editie) => {
            (acc[editie.an] ??= []).push(editie);
            return acc;
        },
        {},
    );

    return {
        hub,
        editii,
        peAni,
        seo: {
            title: `Arhiva — ${hub.titlu}`,
            description:
                `Toate edițiile proiectului ${hub.titlu} organizate de Federația Tinerilor Basarabeni.`,
        },
    };
};
