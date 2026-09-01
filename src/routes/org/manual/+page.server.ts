import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: 'Manual — pentru membri & voluntari',
			description:
				'Proceduri, roluri și șabloane pentru membrii și voluntarii Federației Tinerilor Basarabeni.'
		}
	};
};
