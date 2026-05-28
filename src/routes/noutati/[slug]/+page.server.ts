import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { WPPost, PostQueryResult } from '$lib/types/wp';
import { evenimente } from '$lib/data/evenimente';

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
							srcSet
							sizes
							mediaDetails {
								width
								height
							}
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

	const description = postData.post.excerpt
		? postData.post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160)
		: undefined;

	const azi = new Date();
	const evenimenteVitoare = evenimente
		.filter((e) => new Date(e.date) >= azi)
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.slice(0, 3);

	return {
		post: postData.post,
		featuredPost: featuredData.post,
		evenimente: evenimenteVitoare,
		seo: {
			title: postData.post.title,
			description,
			image: postData.post.featuredImage?.node?.sourceUrl
		}
	};
};
