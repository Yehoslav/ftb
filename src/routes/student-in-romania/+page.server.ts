import type { PageServerLoad } from './$types';
import { getMembri } from '$lib/server/googleSheets';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

export const load: PageServerLoad = async () => {
	const membri = await getMembri();

	const postsData = await queryWP<PostsQueryResult>(
		`query RecentPosts($first: Int!) {
			posts(first: $first, where: { categoryName: "actualitati" }) {
				nodes {
					title
					slug
					excerpt
					date
					featuredImage {
						node { sourceUrl srcSet sizes mediaDetails { width height } }
					}
				}
			}
		}`,
		{ first: 3 }
	).catch(() => null);

	return {
		membri,
		posts: postsData?.posts.nodes ?? [],
		seo: {
			title: 'Student în România',
			description:
				'Te-ai înscris deja? Ghiduri practice, comunități pe orașe și oportunități de implicare pentru studenții basarabeni în România.'
		}
	};
};
