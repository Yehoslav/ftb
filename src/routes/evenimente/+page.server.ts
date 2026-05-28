import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { EventsQueryResult } from '$lib/types/wp';
import { evenimente } from '$lib/data/evenimente';

export const load: PageServerLoad = async () => {
	let wpEvents: Array<{ title: string; slug: string; date?: string }> = [];

	try {
		const result = await queryWP<EventsQueryResult>(
			`query Events {
				events(first: 20) {
					nodes {
						title
						slug
						date
					}
				}
			}`
		);
		wpEvents = result.events.nodes;
	} catch {
		// WP offline or no events CPT — use static data
	}

	return {
		wpEvents,
		evenimente,
		seo: {
			title: 'Evenimente',
			description: 'Evenimente organizate de FTB România — târguri, workshop-uri, activități pentru tinerii basarabeni.'
		}
	};
};
