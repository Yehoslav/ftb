export interface Eveniment {
	title: string;
	date: string;
	dateEnd?: string;
	location: string;
	description: string;
	registrationUrl?: string;
}

export const evenimente: Eveniment[] = [
	{
		title: 'Ziua Națională a României',
		date: '2026-12-01',
		location: 'Alba Iulia',
		description: 'Ziua Națională a României — eveniment anual pe 1 decembrie, organizat în colaborare cu partenerii locali.'
	},
	{
		title: 'Resurse pentru Organizații de Tineret din Republica Moldova',
		date: '2026-05-01',
		dateEnd: '2026-09-30',
		location: 'Republica Moldova',
		description: 'Proiect finanțat de Departamentul pentru Relația cu Republica Moldova, dedicat resurselor pentru organizațiile de tineret.'
	},
	{
		title: 'Târgul Universităților din România',
		date: '2026-07-07',
		location: 'Chișinău, Bălți, Cahul',
		description: 'Târgul Universităților din România — eveniment anual în luna iulie, cu informații despre admitere și oferta educațională.'
	},
	{
		title: 'Save Ukraine — response plan for the Ukrainian crisis in Romania',
		date: '2026-03-01',
		dateEnd: '2026-10-31',
		location: 'România',
		description: 'Plan de răspuns pentru criza ucraineană în România, finanțat de Fondul de Ajutor Umanitar al Republicii Federale Germania.'
	}
];

export function getEvenimenteVitoare(): Eveniment[] {
	const azi = new Date();
	return evenimente
		.filter((e) => new Date(e.date) >= azi)
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEvenimenteRecente(): Eveniment[] {
	const azi = new Date();
	return evenimente
		.filter((e) => new Date(e.date) < azi)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
