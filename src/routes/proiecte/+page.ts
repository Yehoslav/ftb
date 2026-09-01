import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'Proiecte',
			description: 'Proiectele anuale și singulare ale Federației Tinerilor Basarabeni — AdmiteRO, Târgul Universităților, Summitul Tinerilor și altele.'
		}
	};
};
