import type { PageServerLoad } from './$types';
import { getMembri, getEchipa } from '$lib/server/googleSheets';

export const load: PageServerLoad = async () => {
	const [membri, echipa] = await Promise.all([getMembri(), getEchipa()]);

	return {
		membri,
		echipa,
		seo: {
			title: 'Structura organizației',
			description:
				'Conducerea, membrii și rețeaua de asociații ale Federației Tinerilor Basarabeni, după statut.'
		}
	};
};
