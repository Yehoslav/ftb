import type { PageServerLoad } from './$types';
import { getInfo } from '$lib/server/grist';
import { membri } from '$lib/data/membre';

export const load: PageServerLoad = async () => {
	const info = await getInfo().catch(() => null);

	const orase = [...new Set(membri.map((m) => m.oras))];

	return {
		info,
		membreStats: {
			total: membri.length,
			orase: orase.length,
			oraseList: orase.sort()
		},
		seo: { title: 'Acasă', description: 'Federația Tinerilor Basarabeni — reunește asociațiile de studenți și tineri basarabeni din România.' }
	};
};
