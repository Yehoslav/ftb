import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const intent = url.searchParams.get('intent');
	const rawGhid = url.searchParams.get('ghid') ?? '';
	const ghid = /^[a-z0-9-]{1,120}$/.test(rawGhid) ? rawGhid : '';

	return {
		seo: { title: 'Contact', description: 'Contactează Federația Tinerilor Basarabeni.' },
		contactContext: intent === 'informatii-invechite' ? { intent, ghid } : null
	};
};
