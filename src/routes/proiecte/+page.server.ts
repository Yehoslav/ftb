import type { PageServerLoad } from "./$types";
import { getPublishedHubs } from "$lib/server/queries/projects";

export const load: PageServerLoad = async () => {
    const hubs = await getPublishedHubs();

    return {
        hubs,
        seo: {
            title: "Proiecte",
            description:
                "Proiectele anuale și singulare ale Federației Tinerilor Basarabeni — AdmiteRO, Târgul Universităților, Summitul Tinerilor și altele.",
        },
    };
};
