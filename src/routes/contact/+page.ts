import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: { title: 'Contact', description: 'Contactează Federația Tinerilor Basarabeni.' }
	};
};
