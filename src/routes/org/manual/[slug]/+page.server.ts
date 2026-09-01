import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getManualItemBySlug } from '$lib/data/manual';

export const load: PageServerLoad = async ({ params }) => {
	const item = getManualItemBySlug(params.slug);
	if (!item) {
		error(404, 'Pagina din manual nu a fost găsită.');
	}

	return {
		item
	};
};
