import type { PageServerLoad } from "./$types";
import {
    getCurrentEdition,
    getPublishedHubBySlug,
} from "$lib/server/queries/projects";

export const load: PageServerLoad = async () => {
    const hub = await getPublishedHubBySlug("admiteri").catch(() => null);
    const editie = hub
        ? await getCurrentEdition(hub.slug).catch(() => null)
        : null;

    return {
        hub,
        editie,
        seo: {
            title: "Admitere în România",
            description:
                "Ghid pas-cu-pas pentru elevii și studenții din Republica Moldova care vor să-și continue studiile în România: înscriere, viză, acte de ședere.",
        },
    };
};
