import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'Transparență',
			description:
				'Identitate legală, finanțe, rapoarte anuale și politici ale Federației Tinerilor Basarabeni.'
		}
	};
};
