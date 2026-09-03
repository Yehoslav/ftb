import type { PageServerLoad } from './$types';
import { getInfo, getMembri, getEchipa } from '$lib/server/googleSheets';
import { getRecentPosts } from '$lib/server/queries/posts';

export const load: PageServerLoad = async () => {
	const info = await getInfo().catch(() => null);
	const membri = await getMembri();
	const echipa = await getEchipa();

	const orase = [...new Set(membri.map((m) => m.oras))];

	const posts = await getRecentPosts(3).catch(() => []);

	return {
		info,
		posts,
		membri,
		echipa,
		membreStats: {
			total: membri.length,
			orase: orase.length,
			oraseList: orase.sort()
		},
		seo: { title: 'Acasă', description: 'Federația Tinerilor Basarabeni — reunește asociațiile de studenți și tineri basarabeni din România.' }
	};
};
