export interface ResurseItem {
	title: string;
	slug: string;
	description: string;
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
				title: 'Ghid de implicare civică pentru tineri',
				slug: 'ghid-de-implicare-civica-pentru-tineri',
				description: 'Cum să te implici activ în comunitatea ta și să îți faci vocea auzită.'
			},
			{
				title: 'Ghid de scriere a proiectelor',
				slug: 'ghid-de-scriere-a-proiectelor',
				description: 'Învață cum să scrii și să depui proiecte cu finanțare, de la idee la buget.'
			},
			{
				title: 'Ghid secretariat organizațional',
				slug: 'ghid-secretariat-organizational',
				description: 'Gestionarea documentelor, ședințelor și comunicării interne într-o organizație de tineret.'
			},
			{
				title: 'Platforme digitale',
				slug: 'platforme-digitale',
				description: 'Instrumente și platforme utile pentru activitatea organizațiilor de tineret.'
			}
		]
	},
	{
		id: 'pentru-studenti',
		label: 'Pentru studenți',
		items: [
			{
				title: 'Admitere în România',
				slug: 'admitere-in-romania',
				description: 'Informații complete despre procesul de admitere la universități, licee și școli profesionale.'
			},
			{
				title: 'Acte de ședere temporară',
				slug: 'aplica-pentru-acte-de-sedere-temporara',
				description: 'Ghid pas-cu-pas pentru obținerea actelor de ședere temporară în România.'
			},
			{
				title: 'Viză de studii',
				slug: 'aplica-pentru-viza-de-studii',
				description: 'Cum să aplici pentru viza de studii în România — documente, termene, procedură.'
			},
			{
				title: 'Înscriere la colegiu, liceu sau școală profesională',
				slug: 'inscrie-te-la-colegiu-liceu-scoala-profesionala',
				description: 'Procedura de înscriere în învățământul preuniversitar din România.'
			},
			{
				title: 'Înscriere la universitate',
				slug: 'inscrie-te-la-universitate',
				description: 'Etapele înscrierii la facultate în România pentru cetățenii moldoveni.'
			},
			{
				title: 'Cursuri de limba română',
				slug: 'romanian-courses',
				description: 'Resurse și programe pentru învățarea limbii române — disponibil în mai multe limbi.'
			},
			{
				title: 'Rute de transport',
				slug: 'rute-transport',
				description: 'Cum ajungi din Republica Moldova în România — autobuze, trenuri, microbuze.'
			},
			{
				title: 'Vizitează România',
				slug: 'viziteaza-romania',
				description: 'Ghid turistic și practic pentru vizitarea României — obiective, cazare, transport.'
			},
			{
				title: 'Oportunități educaționale',
				slug: 'oportunitati-educationale',
				description: 'Burse, stagii, programe de schimb și alte oportunități pentru studenți.'
			},
			{
				title: 'Oportunități de finanțare',
				slug: 'oportunitati-de-finantare',
				description: 'Finanțări disponibile pentru tineri, organizații studențești și proiecte educaționale.'
			}
		]
	},
	{
		id: 'resurse-generale',
		label: 'Resurse generale',
		items: [
			{
				title: 'Resurse',
				slug: 'resurse',
				description: 'Colecție de resurse utile pentru tinerii basarabeni din România.'
			},
			{
				title: 'Resurse pentru organizațiile de tineret din Republica Moldova',
				slug: 'resurse-pentru-organizatii-de-tineret-din-republica-moldova',
				description: 'Materiale și ghiduri pentru dezvoltarea organizațiilor de tineret.'
			}
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
