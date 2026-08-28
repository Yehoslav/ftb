import type { PageServerLoad } from './$types';
import { getEchipa } from '$lib/server/googleSheets';

export const load: PageServerLoad = async () => {
	const echipa = await getEchipa();

	return {
		echipa,
		seo: {
			title: 'Echipă',
			description: 'Biroul de conducere și echipa extinsă a Federației Tinerilor Basarabeni.'
		}
	};
};
