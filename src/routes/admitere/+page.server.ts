import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		seo: {
			title: 'Admitere în România',
			description:
				'Ghid pas-cu-pas pentru elevii și studenții din Republica Moldova care vor să-și continue studiile în România: înscriere, viză, acte de ședere.'
		}
	};
};