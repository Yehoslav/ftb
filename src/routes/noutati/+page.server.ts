import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

const POSTS_PER_PAGE = 10;

export const load: PageServerLoad = async () => {
	const data = await queryWP<PostsQueryResult>(
		`query Posts($first: Int!) {
			posts(first: $first, where: { categoryName: "actualitati" }) {
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
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}`,
		{ first: POSTS_PER_PAGE }
	);

	return {
		posts: data.posts.nodes,
		pageInfo: data.posts.pageInfo,
		seo: { title: 'Noutăți', description: 'Ultimele articole și anunțuri de la Federația Tinerilor Basarabeni.' }
	};
};
