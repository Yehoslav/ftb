import { json } from '@sveltejs/kit';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

const POSTS_PER_PAGE = 10;

export async function GET({ url }) {
	const after = url.searchParams.get('after');

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
		{ first: POSTS_PER_PAGE, after }
	);

	return json({
		posts: data.posts.nodes,
		pageInfo: data.posts.pageInfo
	});
}
