import type { PageServerLoad } from './$types';
import { getMembri } from '$lib/server/googleSheets';

export const load: PageServerLoad = async () => {
	const membri = await getMembri();

	return {
		membri,
		seo: {
			title: 'Organizații Membre',
			description: `Cele ${membri.length} de asociații membre ale Federației Tinerilor Basarabeni din România.`
		}
	};
};
