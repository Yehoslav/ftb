import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		seo: {
			title: 'Ghiduri și Resurse',
			description: 'Ghiduri practice, resurse pentru studenți și materiale utile pentru tinerii basarabeni din România.'
		}
	};
};
