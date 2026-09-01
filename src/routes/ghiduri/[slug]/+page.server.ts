import type { PageServerLoad } from './$types';
import { queryWP } from '$lib/server/wp';
import type { PageQueryResult } from '$lib/types/wp';
import { getResursaBySlug } from '$lib/data/resurse';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const meta = getResursaBySlug(params.slug);
	if (!meta) error(404, 'Resursa nu a fost găsită');

	const { page: wpPage } = await queryWP<PageQueryResult>(
		`query Page($uri: ID!) {
			page(id: $uri, idType: URI) {
				title
				content
				slug
				uri
				date
				modified
				featuredImage {
					node {
						sourceUrl
					}
				}
			}
		}`,
		{ uri: params.slug }
	).catch(() => {
		throw error(404, 'Resursa nu a fost găsită pe server');
	});

	const description = wpPage.content
		? wpPage.content.replace(/<[^>]+>/g, '').slice(0, 160)
		: undefined;

	return {
		page: wpPage,
		seo: {
			title: wpPage.title,
			description,
			image: wpPage.featuredImage?.node?.sourceUrl
		}
	};
};
