import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { WPPost, PostQueryResult, PostsQueryResult } from '$lib/types/wp';
import { evenimente, sorteazaEvenimente, esteTrecut } from '$lib/data/evenimente';

export const load: PageServerLoad = async ({ params }) => {
	const [postData, featuredData, latestData] = await Promise.all([
		queryWP<PostQueryResult>(
			`query Post($slug: ID!) {
				post(id: $slug, idType: SLUG) {
					title
					content
					date
					modified
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
					slug
					featuredImage {
						node {
							sourceUrl
							mediaDetails {
								width
								height
							}
						}
					}
				}
			}`
		).catch(() => ({ post: null })),
		queryWP<PostsQueryResult>(
			`query Latest {
				posts(first: 4, where: { categoryName: "actualitati" }) {
					nodes {
						title
						slug
						date
						featuredImage {
							node {
								sourceUrl
								mediaDetails {
									width
									height
								}
							}
						}
					}
				}
			}`
		).catch(() => ({ posts: { nodes: [] } }))
	]);

	const description = postData.post.excerpt
		? postData.post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160)
		: undefined;

	const azi = new Date();
	const evenimenteVitoare = sorteazaEvenimente(evenimente.filter((e) => !esteTrecut(e, azi))).slice(0, 3);

	const related = latestData.posts.nodes.filter((p) => p.slug !== params.slug).slice(0, 2);

	return {
		post: postData.post,
		featuredPost: featuredData.post,
		evenimente: evenimenteVitoare,
		related,
		seo: {
			title: postData.post.title,
			description,
			image: postData.post.featuredImage?.node?.sourceUrl
		}
	};
};