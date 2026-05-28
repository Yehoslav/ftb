import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { EventQueryResult } from '$lib/types/wp';
import { evenimente } from '$lib/data/evenimente';
import type { Eveniment } from '$lib/data/evenimente';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	let fromWp = false;
	let ev: Eveniment | null = null;

	try {
		const result = await queryWP<EventQueryResult>(
			`query Event($slug: ID!) {
				event(id: $slug, idType: SLUG) {
					title
					content
					date
				}
			}`,
			{ slug }
		);
		if (result.event) {
			fromWp = true;
			ev = {
				slug,
				title: result.event.title,
				date: result.event.date || '',
				description: result.event.content || '',
				activities: [],
				stats: [],
				gallery: [],
				email: '',
				phone: '',
				location: ''
			};
		}
	} catch {
		// fall through to static
	}

	if (!fromWp) {
		const found = evenimente.find((e) => e.slug === slug);
		if (!found) error(404, 'Evenimentul nu a fost găsit');
		ev = found;
	}

	return {
		event: ev!,
		seo: { title: ev!.title, description: ev!.description }
	};
};
