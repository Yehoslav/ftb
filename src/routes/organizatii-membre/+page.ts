import type { PageLoad } from './$types';
import { membri } from '$lib/data/membre';

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'Organizații Membre',
			description: `Cele ${membri.length} de asociații membre ale Federației Tinerilor Basarabeni din România.`
		}
	};
};
