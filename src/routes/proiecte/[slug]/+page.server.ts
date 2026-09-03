import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
    getEditieCurenta,
    getEditiiAle,
    getHubBySlug,
    getPosturiAle,
    getProiectParinte,
    getSubproiecteAle,
} from "$lib/data/proiecte";
import { getEvenimenteAle } from "$lib/data/evenimente";
import { getPostsBySlugs } from "$lib/server/queries/posts";
import type { WPPost } from "$lib/types/wp";

export const load: PageServerLoad = async ({ params }) => {
    const hub = getHubBySlug(params.slug);
    if (!hub) error(404, "Proiectul nu a fost găsit");

    const editii = getEditiiAle(hub.slug);
    const editieCurenta = getEditieCurenta(hub.slug);
    const evenimente = getEvenimenteAle(hub.slug);
    const subproiecte = getSubproiecteAle(hub.slug);
    const proiectParinte = getProiectParinte(hub);

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
