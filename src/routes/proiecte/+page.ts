import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => {
    return {
        hubs: data.hubs,
        seo: data.seo,
    };
};
