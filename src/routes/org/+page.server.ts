import type { PageServerLoad } from './$types';
import { getMembri, getEchipa, getInfo } from '$lib/server/googleSheets';

export const load: PageServerLoad = async () => {
	const membri = await getMembri();
	const echipa = await getEchipa();
	const info = await getInfo().catch(() => null);

	const orase = [...new Set(membri.map((m) => m.oras))];
	const birou = echipa.filter((m) => m.categorie === 'birou');

	return {
		membri,
		echipa,
		info,
		stats: {
			membre: membri.length,
			orase: orase.length,
			birou: birou.length
		},
		seo: {
			title: 'Organizație · Structură & Transparență',
			description:
				'Identitatea profesională a Federației Tinerilor Basarabeni: structura organizației, conducerea, parteneriatele și transparența.'
		}
	};
};
