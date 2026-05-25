import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { WPPost, PostQueryResult } from '$lib/types/wp';

export const load: PageServerLoad = async ({ params }) => {
	const [postData, featuredData] = await Promise.all([
		queryWP<PostQueryResult>(
			`query Post($slug: ID!) {
				post(id: $slug, idType: SLUG) {
					title
					content
					date
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
			}`,
			{ slug: params.slug }
		),
		queryWP<PostQueryResult>(
			`query Featured {
				post(id: "federatia-tinerilor-basarabeni-din-romania-aniverseaza-trei-ani-de", idType: SLUG) {
					title
					excerpt
					date
				}
			}`
		).catch(() => ({ post: null }))
	]);

	return {
		post: postData.post,
		featuredPost: featuredData.post
	};
};
