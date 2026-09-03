import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getEventBySlug, getPublishedEvents } from "$lib/server/queries/events";
import type { Eveniment } from "$lib/data/evenimente";
import { getHubBySlug } from "$lib/data/proiecte";

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    const ev: Eveniment | null = await getEventBySlug(slug).catch(() => null);
    if (!ev) error(404, "Evenimentul nu a fost găsit");

    const proiect = ev.proiectSlug ? getHubBySlug(ev.proiectSlug) : undefined;

    let siblingEvents: Eveniment[] = [];
    if (proiect) {
        const all = await getPublishedEvents().catch(() => [] as Eveniment[]);
        siblingEvents = all
            .filter((e) => e.proiectSlug === proiect.slug && e.slug !== slug)
            .sort((a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );
    }

    return {
        event: ev,
        proiect,
        siblingEvents,
        seo: { title: ev.title, description: ev.description },
    };
};
