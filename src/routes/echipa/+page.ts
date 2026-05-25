import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: { title: 'Echipă', description: 'Biroul de conducere și echipa extinsă a Federației Tinerilor Basarabeni.' }
	};
};
