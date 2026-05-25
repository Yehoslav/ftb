import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

const POSTS_PER_PAGE = 10;

export const load: PageServerLoad = async ({ url }) => {
	const cursor = url.searchParams.get('after') || null;

	const data = await queryWP<PostsQueryResult>(
		`query Posts($first: Int!, $after: String) {
			posts(first: $first, after: $after, where: { categoryName: "actualitati" }) {
				nodes {
					title
					slug
					excerpt
					date
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}`,
		{ first: POSTS_PER_PAGE, after: cursor }
	);

	return {
		posts: data.posts.nodes,
		pageInfo: data.posts.pageInfo,
		seo: { title: 'Noutăți', description: 'Ultimele articole și anunțuri de la Federația Tinerilor Basarabeni.' }
	};
};
