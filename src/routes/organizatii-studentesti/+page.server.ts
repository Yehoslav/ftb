import type { PageServerLoad } from './$types';
import { getMembri } from '$lib/server/googleSheets';

export const load: PageServerLoad = async () => {
	const membri = await getMembri();

	return {
		membri,
		seo: {
			title: 'Organizații Studențești în România',
			description:
				'Descoperă asociațiile studențești basarabene din orașele tale universitare din România.'
		}
	};
};
