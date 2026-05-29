import type { PageServerLoad } from './$types';
import { evenimente } from '$lib/data/evenimente';

export const load: PageServerLoad = async () => {
	return {
		evenimente,
		seo: {
			title: 'Evenimente',
			description: 'Evenimente organizate de FTB România — târguri, workshop-uri, activități pentru tinerii basarabeni.'
		}
	};
};
