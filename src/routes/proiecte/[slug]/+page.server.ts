import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
    getCurrentEdition,
    getPublishedEditionsForHub,
    getPublishedHubBySlug,
    getPublishedSubprojects,
} from "$lib/server/queries/projects";
import { getEventsForProject } from "$lib/server/queries/events";
import { getPostsBySlugs } from "$lib/server/queries/posts";
import type { WPPost } from "$lib/types/wp";
import { getPosturiAle } from "$lib/data/proiecte";

export const load: PageServerLoad = async ({ params }) => {
    const hub = await getPublishedHubBySlug(params.slug);
    if (!hub) error(404, "Proiectul nu a fost găsit");

    const [editii, editieCurenta, evenimente, subproiecte] = await Promise.all([
        getPublishedEditionsForHub(hub.slug),
        getCurrentEdition(hub.slug),
        getEventsForProject(hub.slug),
        getPublishedSubprojects(hub.slug),
    ]);

    const proiectParinte = hub.proiectParinteSlug
        ? await getPublishedHubBySlug(hub.proiectParinteSlug)
        : null;

    let posturi: WPPost[] = [];
    const postSlugs = getPosturiAle(hub.slug);
    if (postSlugs.length > 0) {
        try {
            posturi = await getPostsBySlugs(postSlugs);
        } catch {
            // DB indisponibil — pagina hub se randează cu datele statice
        }
    }

    return {
        hub,
        editii,
        editieCurenta,
        subproiecte,
        proiectParinte,
        posturi,
        evenimente,
        seo: {
            title: hub.titlu,
            description: hub.descriere.slice(0, 160),
            image: hub.imagine,
        },
    };
};
