import type { PageServerLoad } from './$types';
import { getInfo, getMembri } from '$lib/server/googleSheets';
import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';

export const load: PageServerLoad = async () => {
	const info = await getInfo().catch(() => null);
	const membri = await getMembri();

	const orase = [...new Set(membri.map((m) => m.oras))];

	const postsData = await 	queryWP<PostsQueryResult>(
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
