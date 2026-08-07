import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getHubBySlug, getEditiiAle, getEditieCurenta, getPosturiAle } from '$lib/data/proiecte';
import { getEvenimenteAle } from '$lib/data/evenimente';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

export const load: PageServerLoad = async ({ params }) => {
	const hub = getHubBySlug(params.slug);
	if (!hub) error(404, 'Proiectul nu a fost găsit');

	const editii = getEditiiAle(hub.slug);
	const editieCurenta = getEditieCurenta(hub.slug);
	const evenimente = getEvenimenteAle(hub.slug);

	let posturi: PostsQueryResult['posts']['nodes'] = [];
	const postSlugs = getPosturiAle(hub.slug);
	if (postSlugs.length > 0) {
		try {
			const result = await queryWP<PostsQueryResult>(
				`query Posts($slugs: [String!]) {
					posts(where: { nameIn: $slugs }) {
						nodes {
							title
							slug
							excerpt
							date
							featuredImage {
								node {
									sourceUrl
									srcSet
									sizes
									mediaDetails {
										width
										height
									}
								}
							}
						}
					}
				}`,
				{ slugs: postSlugs }
			);
			posturi = result.posts.nodes;
		} catch {
			// WP offline — hub page still renders with static data
		}
	}

	return {
		hub,
		editii,
		editieCurenta,
		posturi,
		evenimente,
		seo: {
			title: hub.titlu,
			description: hub.descriere.slice(0, 160),
			image: hub.imagine
		}
	};
};
