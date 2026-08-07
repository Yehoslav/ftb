export interface ProiectHub {
	slug: string;
	titlu: string;
	categorie: 'anuale' | 'singulare';
	descriere: string;
	imagine?: string;
	culoare: string;
	domenii: string[];
	website?: string;
}

export interface ProiectStatistic {
	label: string;
	value: string;
}

export interface ProiectMaterial {
	label: string;
	url: string;
}

export interface ProiectEditie {
	slug: string;
	titlu: string;
	an: number;
	proiectSlug: string;
	perioada: string;
	descriere: string;
	finantator?: string;
	activitati: string[];
	beneficiari?: string;
	voluntari?: string;
	parteneri?: string;
	imagine?: string;
	galerie: string[];
	statistici: ProiectStatistic[];
	materiale: ProiectMaterial[];
	stare: 'planificat' | 'in-desfasurare' | 'finalizat';
	registrationUrl?: string;
}

export const huburi: ProiectHub[] = [
	{
		slug: 'admiteri',
		titlu: 'AdmiteRO',
		categorie: 'anuale',
		descriere:
			'Campania AdmiteRO este o campanie de promovare a studiilor în România, desfășurată anual de Federația Tinerilor Basarabeni, cu ajutorul celor 16 asociații de basarabeni, atât în mediul offline cât și online, care presupune mai multe activități.',
		culoare: '#1071B8',
		domenii: ['educație', 'tineret']
	},
	{
		slug: 'targul-universitatilor',
		titlu: 'Târgul Universităților din România',
		categorie: 'anuale',
		descriere:
			'Târgul Universităților din România este un eveniment din cadrul campaniei AdmiteRO, prin intermediul căruia tinerii și cadrele didactice din România prezintă oferta educațională a celor mai mari centre universitare din România.',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		culoare: '#1071B8',
		domenii: ['educație']
	},
	{
		slug: 'summitul-tinerilor',
		titlu: 'Summitul Tinerilor din Republica Moldova „Aripi spre Viitor”',
		categorie: 'anuale',
		descriere:
			'Proiectul își propune să conecteze tinerii basarabeni care-și fac studiile sau trăiesc în România cu tinerii din Republica Moldova, motivându-i să se întoarcă în țară și să contribuie împreună la dezvoltarea Republicii Moldova.',
		culoare: '#2F378D',
		domenii: ['tineret', 'dezvoltare', 'civic']
	},
	{
		slug: 'ziua-nationala',
		titlu: 'Ziua Națională a României',
		categorie: 'anuale',
		descriere:
			'Evenimentul are loc în fiecare an la Alba Iulia, de 1 decembrie, unde cele 16 asociații de basarabeni din România, membre ale Federației Tinerilor Basarabeni, se adună la evenimentul de sărbătorire a Zilei Naționale a României.',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-1170x658.jpg',
		culoare: '#BA1818',
		domenii: ['cultură', 'identitate']
	},
	{
		slug: 'save-ukraine',
		titlu: 'Save Ukraine — response plan for the Ukrainian crisis in Romania',
		categorie: 'singulare',
		descriere:
			'Începând cu luna februarie 2022, Federația Tinerilor Basarabeni s-a implicat activ în sprijinul refugiaților din Ucraina. Cele mai mari fluxuri de refugiați au fost înregistrate în București, Iași, Cluj-Napoca, Timișoara, Suceava, Constanța, Sibiu, Brașov și Galați.',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-11-1024x658.jpg',
		culoare: '#E63429',
		domenii: ['umanitar', 'civic']
	},
	{
		slug: 'resurse',
		titlu: 'Resurse pentru Organizații de Tineret din Republica Moldova',
		categorie: 'singulare',
		descriere:
			'Proiectul urmărește dezvoltarea capacității organizațiilor de tineret și formarea comunităților de tineri din Republica Moldova prin intermediul organizațiilor de tineret de basarabeni din România, cu scopul de a produce un impact pozitiv pe termen mediu și lung în comunitatea din Republica Moldova.',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Resurse-pentru-tineri-1170x658.jpg',
		culoare: '#F39222',
		domenii: ['tineret', 'dezvoltare']
	}
];

export const editii: ProiectEditie[] = [
	{
		slug: 'admitere-2026',
		titlu: 'Admitere 2026',
		an: 2026,
		proiectSlug: 'admiteri',
		perioada: 'Mai — Octombrie 2026',
		descriere:
			'Ediția 2026 a campaniei AdmiteRO reunește cele 16 asociații de basarabeni pentru a-i ajuta pe absolvenții de liceu din Republica Moldova să-și continue studiile în România. Echipa acestei ediții aduce o viziune nouă, centrată pe digitalizarea procesului de colectare a dosarelor și pe extinderea programului de mentorat pentru studenții proaspăt admiși.',
		activitati: [
			'Promovarea ofertelor universităților din România în Republica Moldova prin intermediul evenimentului Târgul Universităților din România, în cadrul căreia oferim informații și consultanță pentru tinerii absolvenți de liceu care vor să-și continue studiile în România.',
			'Colectarea dosarelor cu documente ale tinerilor care au fost acceptați la studii în România și transmiterea actelor colectate către secretariatele facultăților din orașele din România pentru înmatricularea acestora la studii.',
			'Oferirea suportului informațional constant despre etapele admiterii în România, obținerea actelor de studiu și obținerea actelor de ședere legală prin intermediul canalelor de social media ale federației.'
		],
		beneficiari: 'peste 10.000 informați și consiliați despre studiile în România anual',
		voluntari: 'peste 300 de persoane',
		parteneri: '19',
		galerie: [],
		statistici: [
			{ label: 'Tineri informați și consiliați', value: 'peste 10.000' },
			{ label: 'Voluntari implicați', value: 'peste 300 de persoane' },
			{ label: 'Asociații partenere', value: '16' },
			{ label: 'Universități promovate', value: '18' }
		],
		materiale: [],
		stare: 'in-desfasurare'
	},
	{
		slug: 'admitere-2025',
		titlu: 'Admitere 2025',
		an: 2025,
		proiectSlug: 'admiteri',
		perioada: 'Mai — Octombrie 2025',
		descriere:
			'În 2025 campania AdmiteRO a ajuns la un număr record de beneficiari, consolidând parteneriatele cu centrele universitare din România și extinzând echipa de voluntari care a susținut activitățile de informare și colectare a dosarelor.',
		activitati: [
			'Organizarea Târgului Universităților din România la Chișinău, Bălți și Cahul.',
			'Colectarea și transmiterea dosarelor către secretariatele facultăților din România.',
			'Consilierea online a candidaților prin canalele de social media ale federației.'
		],
		beneficiari: 'peste 9.000 informați și consiliați despre studiile în România',
		voluntari: 'peste 280 de persoane',
		parteneri: '19',
		galerie: [],
		statistici: [
			{ label: 'Tineri informați și consiliați', value: 'peste 9.000' },
			{ label: 'Voluntari implicați', value: 'peste 280 de persoane' },
			{ label: 'Asociații partenere', value: '16' }
		],
		materiale: [],
		stare: 'finalizat'
	},
	{
		slug: 'targul-universitatilor-2026',
		titlu: 'Târgul Universităților 2026',
		an: 2026,
		proiectSlug: 'targul-universitatilor',
		perioada: 'Iulie 2026',
		descriere:
			'Ediția din 2026 a Târgului Universităților din România aduce în fața absolvenților de liceu ofertele celor mai mari centre universitare din România, cu sesiuni de consiliere dedicate și prezentări ale programelor de burse.',
		activitati: [
			'Oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului.',
			'Consiliere cu privire la alegerea unei facultăți / specializări.',
			'Oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel).',
			'Oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc).'
		],
		beneficiari: 'peste 2.000 de absolvenți din Republica Moldova',
		voluntari: 'peste 80 de persoane',
		parteneri: '19',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		galerie: [],
		statistici: [
			{ label: 'Absolvenți participanți', value: 'peste 2.000' },
			{ label: 'Voluntari implicați', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' },
			{ label: 'Asociații partenere', value: '19' }
		],
		materiale: [],
		stare: 'in-desfasurare'
	},
	{
		slug: 'targul-universitatilor-2025',
		titlu: 'Târgul Universităților 2025',
		an: 2025,
		proiectSlug: 'targul-universitatilor',
		perioada: '3 — 6 Iulie 2025',
		descriere:
			'Ediția din 2025 s-a desfășurat în perioada 3-6 iulie și a reunit zeci de universități din România, cu o participare record a absolvenților de liceu din Republica Moldova.',
		activitati: [
			'Prezentarea ofertelor educaționale ale universităților din România.',
			'Consilierea absolvenților cu privire la alegerea facultății.',
			'Sesiuni de informare despre burse și programe de studiu.'
		],
		beneficiari: 'peste 2.000 de absolvenți din Republica Moldova',
		voluntari: 'peste 80 de persoane',
		parteneri: '19',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		galerie: [],
		statistici: [
			{ label: 'Absolvenți participanți', value: 'peste 2.000' },
			{ label: 'Voluntari implicați', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' }
		],
		materiale: [],
		stare: 'finalizat'
	},
	{
		slug: 'summitul-tinerilor-2026',
		titlu: 'Summitul Tinerilor 2026',
		an: 2026,
		proiectSlug: 'summitul-tinerilor',
		perioada: 'Toamna 2026',
		descriere:
			'Ediția 2026 a Summitului Tinerilor din Republica Moldova reunește tineri din ambele maluri ale Prutului pentru dezbateri și ateliere despre viitorul Republicii Moldova în contextul aderării la Uniunea Europeană.',
		activitati: [
			'Paneluri de discuții și ateliere de lucru pe teme precum „Rolul tinerilor în procesul de aderare al Republicii Moldova la UE” și „Viitorul muncii în Republica Moldova”.',
			'Sesiuni de formare susținute de formatori și experți din domeniu.',
			'Activități de networking și schimb de experiență între participanți.'
		],
		beneficiari: '100 de tineri din Republica Moldova și România',
		voluntari: 'peste 25 de persoane',
		galerie: [],
		statistici: [
			{ label: 'Tineri participanți', value: '100' },
			{ label: 'Voluntari implicați', value: 'peste 25 de persoane' }
		],
		materiale: [],
		stare: 'planificat'
	},
	{
		slug: 'summitul-tinerilor-2025',
		titlu: 'Summitul Tinerilor 2025',
		an: 2025,
		proiectSlug: 'summitul-tinerilor',
		perioada: 'Septembrie 2025',
		descriere:
			'Ediția 2025 a Summitului a adunat tineri din Republica Moldova și România pentru dezbateri despre dezvoltarea Republicii Moldova și rolul diasporei în acest proces.',
		activitati: [
			'Paneluri de discuții despre rolul tinerilor în dezvoltarea Republicii Moldova.',
			'Sesiuni de formare cu experți.',
			'Activități de networking între participanți.'
		],
		beneficiari: '100 de tineri din Republica Moldova și România',
		voluntari: 'peste 25 de persoane',
		galerie: [],
		statistici: [
			{ label: 'Tineri participanți', value: '100' },
			{ label: 'Voluntari implicați', value: 'peste 25 de persoane' }
		],
		materiale: [],
		stare: 'finalizat'
	},
	{
		slug: 'ziua-nationala-2026',
		titlu: 'Ziua Națională 2026',
		an: 2026,
		proiectSlug: 'ziua-nationala',
		perioada: '1 Decembrie 2026',
		descriere:
			'Și în 2026, cele 16 asociații de basarabeni din România se reunesc la Alba Iulia pentru a sărbători Ziua Națională a României, promovând identitatea culturală românească din Republica Moldova.',
		activitati: [
			'Turul orașului și a cetății Alba Iulia.',
			'Hora unirii.',
			'Flash-mob-uri de promovare a identității culturale românești din Republica Moldova.',
			'Participarea la activitățile organizate de autorități în cadrul cetății Alba Carolina din Alba Iulia.'
		],
		beneficiari: 'peste 300 de persoane',
		voluntari: 'peste 20 de persoane',
		parteneri: '19',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-1170x658.jpg',
		galerie: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-2-300x300.jpg'
		],
		statistici: [
			{ label: 'Participanți', value: 'peste 300 de persoane' },
			{ label: 'Voluntari implicați', value: 'peste 20 de persoane' },
			{ label: 'Asociații participante', value: '16' }
		],
		materiale: [],
		stare: 'planificat'
	},
	{
		slug: 'ziua-nationala-2025',
		titlu: 'Ziua Națională 2025',
		an: 2025,
		proiectSlug: 'ziua-nationala',
		perioada: '1 Decembrie 2025',
		descriere:
			'Ediția 2025 a evenimentului de la Alba Iulia a reunit sute de basarabeni și români de pe ambele maluri ale Prutului, în jurul Horei Unirii.',
		activitati: [
			'Turul orașului și a cetății Alba Iulia.',
			'Hora unirii.',
			'Flash-mob-uri de promovare a identității culturale românești din Republica Moldova.'
		],
		beneficiari: 'peste 300 de persoane',
		voluntari: 'peste 20 de persoane',
		parteneri: '19',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-1170x658.jpg',
		galerie: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-2-300x300.jpg'
		],
		statistici: [
			{ label: 'Participanți', value: 'peste 300 de persoane' },
			{ label: 'Voluntari implicați', value: 'peste 20 de persoane' },
			{ label: 'Asociații participante', value: '16' }
		],
		materiale: [],
		stare: 'finalizat'
	},
	{
		slug: 'save-ukraine-2022',
		titlu: 'Save Ukraine 2022',
		an: 2022,
		proiectSlug: 'save-ukraine',
		perioada: 'Martie — Octombrie 2022',
		finantator: 'Asociația pentru Relații Comunitare (ARC) și ActionAid',
		descriere:
			'Planul de răspuns la criza ucraineană în România: din februarie 2022, FTB România a mobilizat sute de voluntari pentru a sprijini refugiații din Ucraina la punctele de frontieră și în centrele de tranzit.',
		activitati: [
			'Delegarea de resursă umană în calitate de traducători la punctele de trecere a frontierelor, centrele de refugiați și centrele de tranzit.',
			'Medierea situațiilor de conflict cauzate de bariera lingvistică.',
			'Informarea și consilierea refugiaților cu privire la obținerea actelor pentru șederea temporară sau permanentă.',
			'Informarea și asistarea refugiaților cu privire la găsirea opțiunilor de cazare temporară sau permanentă.',
			'Ghidarea refugiaților cu privire la serviciile medicale din România și oportunitățile de angajare.'
		],
		beneficiari: 'peste 80.000 de ucraineni',
		voluntari: 'peste 700 de persoane',
		parteneri: '16',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-11-1024x658.jpg',
		galerie: [
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-3-225x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Bucuresti-1-300x225.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-6-225x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-8-225x300.jpg'
		],
		statistici: [
			{ label: 'Beneficiari', value: 'peste 80.000 de ucraineni' },
			{ label: 'Voluntari implicați', value: 'peste 700 de persoane' },
			{ label: 'Orașe acoperite', value: '9' },
			{ label: 'Organizații implicate', value: '16' }
		],
		materiale: [],
		stare: 'finalizat'
	},
	{
		slug: 'resurse-2022',
		titlu: 'Resurse pentru Organizații de Tineret 2022',
		an: 2022,
		proiectSlug: 'resurse',
		perioada: 'Mai — Septembrie 2022',
		finantator: 'Departamentul pentru Relația cu Republica Moldova',
		descriere:
			'Proiectul a vizat dezvoltarea capacității organizațiilor de tineret din Republica Moldova prin sesiuni de formare și crearea unei platforme cu resurse.',
		activitati: [
			'Organizarea a 4 sesiuni de formare: Reziliența ONGT-urilor în perioade de criză, Managementul proiectelor și scrierea cererilor de finanțare, Lobby și Advocacy, Instituții europene și cetățenie europeană.',
			'Crearea platformei cu resurse pentru organizațiile de tineret din Republica Moldova.',
			'Oferirea de resurse materiale tinerilor din organizațiile implicate.'
		],
		beneficiari: '15 organizații de tineret și 60 de tineri din Republica Moldova',
		voluntari: '20 de persoane',
		imagine: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Resurse-pentru-tineri-1170x658.jpg',
		galerie: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-1-300x300.jpg'
		],
		statistici: [
			{ label: 'Organizații de tineret beneficiare', value: '15' },
			{ label: 'Tineri beneficiari', value: '60' },
			{ label: 'Sesiuni de formare', value: '4' },
			{ label: 'Voluntari coordonatori', value: '4 persoane' }
		],
		materiale: [],
		stare: 'finalizat'
	}
];

export function getHuburi(): ProiectHub[] {
	return huburi;
}

export function getHubBySlug(slug: string): ProiectHub | undefined {
	return huburi.find((h) => h.slug === slug);
}

export function getEditiiAle(proiectSlug: string): ProiectEditie[] {
	return editii
		.filter((e) => e.proiectSlug === proiectSlug)
		.sort((a, b) => b.an - a.an);
}

export function getEditieCurenta(proiectSlug: string): ProiectEditie | undefined {
	const editiiProiect = getEditiiAle(proiectSlug);
	return (
		editiiProiect.find((e) => e.stare === 'in-desfasurare') ??
		editiiProiect.find((e) => e.stare === 'planificat') ??
		editiiProiect[0]
	);
}

export function getEditieBySlug(proiectSlug: string, editieSlug: string): ProiectEditie | undefined {
	return editii.find((e) => e.proiectSlug === proiectSlug && e.slug === editieSlug);
}

export const proiectPosturi: Record<string, string[]> = {
	admiteri: [
		'o-noua-editie-de-succes-a-targului-universitatilor-din-romania',
		'ftb-romania-a-organizat-in-perioada-4-7-iulie-targul-universitatilor-din-romania-2',
		'federatia-tinerilor-basarabeni-s-a-intalnit-la-bucuresti-cu-doamna-ligia-deca'
	],
	'targul-universitatilor': [
		'o-noua-editie-de-succes-a-targului-universitatilor-din-romania',
		'ftb-romania-a-organizat-in-perioada-4-7-iulie-targul-universitatilor-din-romania-2',
		'ftb-romania-a-organizat-in-perioada-3-6-iulie-targul-universitatilor-din-romania'
	],
	'summitul-tinerilor': [
		'summitul-tinerilor-din-republica-moldova-aripi-spre-viitor-2',
		'175-tiner',
		'summitul-tinerilor-din-republica-moldova-aripi-spre-viitor',
		'summitul-tinerilor-din-republica-moldova-dor-de-radacini-un-succes-remarcabil-al-dezbaterii-si-inovatiei-tinerilor'
	],
	'ziua-nationala': [
		'ziua-de-27-martie-marcata-de-catre-studentii-basarabeni-in-mai-multe-orase-din-romania',
		'mesajul-federatiei-tinerilor-basarabeni-din-romania-cu-ocazia-implinirii-de-31-de-ani-de-la-independenta-republicii-moldova'
	],
	'save-ukraine': [],
	resurse: [
		'am-lansat-proiectul-resurse-pentru-organizatii-de-tineret-din-republica-moldova-2',
		'am-lansat-proiectul-resurse-pentru-organizatii-de-tineret-din-republica-moldova'
	]
};

export function getPosturiAle(proiectSlug: string): string[] {
	return proiectPosturi[proiectSlug] ?? [];
}

const stareEticheta: Record<ProiectEditie['stare'], string> = {
	planificat: 'Planificat',
	'in-desfasurare': 'În desfășurare',
	finalizat: 'Finalizat'
};

export function etichetaStare(stare: ProiectEditie['stare']): string {
	return stareEticheta[stare];
}
