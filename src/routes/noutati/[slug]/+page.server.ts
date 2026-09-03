import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getPostBySlug, getRecentPosts } from "$lib/server/queries/posts";
import { getPublishedEvents } from "$lib/server/queries/events";
import { esteTrecut, sorteazaEvenimente } from "$lib/data/evenimente";

export const load: PageServerLoad = async ({ params }) => {
    const [post, featuredPost, latest, toateEvenimentele] = await Promise.all([
        getPostBySlug(params.slug),
        getPostBySlug(
            "federatia-tinerilor-basarabeni-din-romania-aniverseaza-trei-ani-de",
        ),
        getRecentPosts(4),
        getPublishedEvents(),
    ]);

    if (!post) error(404, "Articolul nu a fost găsit");

    const description = post.excerpt
        ? post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160)
        : undefined;

    const azi = new Date();
    const evenimenteVitoare = sorteazaEvenimente(
        toateEvenimentele.filter((e) => !esteTrecut(e, azi)),
    ).slice(0, 3);

    const related = latest.filter((p) => p.slug !== params.slug).slice(0, 2);

    return {
        post,
        featuredPost,
        evenimente: evenimenteVitoare,
        related,
        seo: {
            title: post.title,
            description,
            image: post.featuredImage?.node?.sourceUrl,
        },
    };
};
