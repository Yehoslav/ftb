import type { PageServerLoad } from './$types';
import { getInfo } from '$lib/server/grist';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';
import { membri } from '$lib/data/membre';

export const load: PageServerLoad = async () => {
	const info = await getInfo().catch(() => null);

	const orase = [...new Set(membri.map((m) => m.oras))];

	const postsData = await queryWP<PostsQueryResult>(
		`query RecentPosts($first: Int!) {
			posts(first: $first, where: { categoryName: "actualitati" }) {
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
			}
		}`,
		{ first: 3 }
	).catch(() => null);

	return {
		info,
		posts: postsData?.posts.nodes ?? [],
		membreStats: {
			total: membri.length,
			orase: orase.length,
			oraseList: orase.sort()
		},
		seo: { title: 'Acasă', description: 'Federația Tinerilor Basarabeni — reunește asociațiile de studenți și tineri basarabeni din România.' }
	};
};
