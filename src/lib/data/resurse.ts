export type Volatility = 'timeless' | 'volatile' | 'critical';

export interface ResurseItem {
	title: string;
	slug: string;
	description: string;
	volatility: Volatility;
}

export interface ResurseCategory {
	id: string;
	label: string;
	items: ResurseItem[];
}

export const resurseCategorii: ResurseCategory[] = [
	{
		id: 'ghiduri',
		label: 'Ghiduri',
		items: [
		{
			title: 'Implicare Civică Tineri',
			slug: 'ghid-de-implicare-civica-pentru-tineri',
			description: 'Cum să te implici activ în comunitatea ta și să îți faci vocea auzită.',
			volatility: 'timeless'
		},
		{
			title: 'Scriere a Proiectelor',
			slug: 'ghid-de-scriere-a-proiectelor',
			description: 'Învață cum să scrii și să depui proiecte cu finanțare, de la idee la buget.',
			volatility: 'volatile'
		},
		{
			title: 'Secretariat Organizațional',
			slug: 'ghid-secretariat-organizational',
			description: 'Gestionarea documentelor, ședințelor și comunicării interne într-o organizație de tineret.',
			volatility: 'volatile'
		},
		{
			title: 'Oportunități de finanțare',
			slug: 'oportunitati-de-finantare',
			description: 'Finanțări disponibile pentru tineri, organizații studențești și proiecte educaționale.',
			volatility: 'volatile'
		}
		]
	},
    {
		id: 'admitere',
		label: 'Admitere',
		items: [
		{
			title: 'Înscriere la colegiu, liceu sau școală profesională',
			slug: 'inscrie-te-la-colegiu-liceu-scoala-profesionala',
			description: 'Procedura de înscriere în învățământul preuniversitar din România.',
			volatility: 'critical'
		},
		{
			title: 'Înscriere la universitate',
			slug: 'inscrie-te-la-universitate',
			description: 'Etapele înscrierii la facultate în România pentru cetățenii moldoveni.',
			volatility: 'critical'
		},
		{
			title: 'Acte de ședere temporară',
			slug: 'aplica-pentru-acte-de-sedere-temporara',
			description: 'Ghid pas-cu-pas pentru obținerea actelor de ședere temporară în România.',
			volatility: 'critical'
		},
		{
			title: 'Viză de studii',
			slug: 'aplica-pentru-viza-de-studii',
			description: 'Cum să aplici pentru viza de studii în România — documente, termene, procedură.',
			volatility: 'critical'
		},
        ]
    },
	{
		id: 'resurse-generale',
		label: 'Resurse generale',
		items: [
		{
			title: 'Platforme digitale',
			slug: 'platforme-digitale',
			description: 'Instrumente și platforme utile pentru activitatea organizațiilor de tineret.',
			volatility: 'volatile'
		},
		{
			title: 'Cursuri de limba română',
			slug: 'romanian-courses',
			description: 'Resurse și programe pentru învățarea limbii române — disponibil în mai multe limbi.',
			volatility: 'timeless'
		},
		{
			title: 'Rute de transport',
			slug: 'rute-transport',
			description: 'Cum ajungi din Republica Moldova în România — autobuze, trenuri, microbuze.',
			volatility: 'critical'
		},
		{
			title: 'Vizitează România',
			slug: 'viziteaza-romania',
			description: 'Ghid turistic și practic pentru vizitarea României — obiective, cazare, transport.',
			volatility: 'timeless'
		},
		]
	}
];

export function getResursaBySlug(slug: string): ResurseItem | undefined {
	for (const cat of resurseCategorii) {
		const item = cat.items.find((i) => i.slug === slug);
		if (item) return item;
	}
	return undefined;
}

export function getCategorieBySlug(slug: string): ResurseCategory | undefined {
	return resurseCategorii.find((c) => c.id === slug);
}
