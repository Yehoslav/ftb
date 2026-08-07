import { getSubproiecteSlugs } from './proiecte';

export interface Eveniment {
	slug: string;
	title: string;
	date: string;
	dateEnd?: string;
	location: string;
	description: string;
	image?: string;
	proiectSlug?: string;
	proiectEditieSlug?: string;
	duration?: string;
	financedBy?: { label: string; url: string };
	activities: string[];
	stats: Array<{ label: string; value: string }>;
	gallery: string[];
	email: string;
	phone: string;
	registrationUrl?: string;
}

export const evenimente: Eveniment[] = [
	{
		title: 'Ziua Națională a României',
		slug: 'ziua-nationala-a-romaniei',
		date: '2026-12-01',
		location: 'Alba Iulia',
		proiectSlug: 'ziua-nationala',
		proiectEditieSlug: 'ziua-nationala-2026',
		description: 'Evenimentul are loc în fiecare an la Alba Iulia, de 1 decembrie, unde cele 16 asociații de basarabeni din România, membre ale Federației Tinerilor Basarabeni, se adună la evenimentul de sărbătorire a Zilei Naționale a României.',
		duration: 'anual pe 1 decembrie',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-1170x658.jpg',
		activities: [
			'turul orașului și a cetății Alba Iulia',
			'hora unirii',
			'flash-mob-uri de promovare a identității culturale românești din Republica Moldova',
			'participarea la activitățile organizate de autorități în cadrul cetății Alba Carolina din Alba Iulia'
		],
		stats: [
			{ label: 'Voluntari implicați în organizare', value: 'peste 20 de persoane' },
			{ label: 'Beneficiari', value: 'peste 300 de persoane' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-2-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Resurse pentru Organizații de Tineret din Republica Moldova',
		slug: 'resurse-pentru-organizatii-de-tineret-din-republica-moldova',
		date: '2022-05-01',
		dateEnd: '2022-09-30',
		location: 'Republica Moldova',
		proiectSlug: 'resurse',
		description: 'Proiectul „Resurse pentru organizații de tineret din Republica Moldova” urmărește dezvoltarea capacității organizațiilor de tineret și formarea comunităților de tineri din Republica Moldova prin intermediul organizațiilor de tineret de basarabeni din România.',
		duration: 'mai – septembrie 2022',
		financedBy: {
			label: 'Departamentul pentru Relația cu Republica Moldova',
			url: 'http://drrm.gov.ro/'
		},
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Resurse-pentru-tineri-1170x658.jpg',
		activities: [
			'Evenimentul de lansare a proiectului — activități de cunoaștere, prezentarea invitațiilor, formatorilor și platformei cu resurse pentru tineri',
			'Organizarea a 4 sesiuni de formare: Reziliența ONGT-urilor în perioade de criză, Managementul proiectelor și scrierea cererilor de finanțare, Lobby și Advocacy, Instituții europene și cetățenie europeană',
			'Oferirea de resurse materiale tinerilor din organizațiile implicate (roll-up-uri, tricouri, hanorace etc.)',
			'Crearea platformei cu resurse pentru organizațiile de tineret din Republica Moldova'
		],
		stats: [
			{ label: 'Angajați în proiect', value: '2 persoane' },
			{ label: 'Voluntari coordonatori', value: '4 persoane' },
			{ label: 'Organizații de tineret beneficiare', value: '15' },
			{ label: 'Tineri beneficiari', value: '60' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' },
			{ label: 'Voluntari din ONG-uri implicate', value: '20' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-1-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Târgul Universităților din România — Chișinău',
		slug: 'targul-universitatilor-chisinau',
		date: '2026-07-02',
		location: 'Chișinău — Aleea Clasicilor, Grădina Publică „Ștefan cel Mare și Sfânt”',
		description:
			'Ești absolvent de liceu și vrei să devii student în România? Federația Tinerilor Basarabeni din România organizează, în perioada 2–5 iulie, cea de-a XV-a ediție a Târgului Universităților din România. La Chișinău, ne găsești între 10:00–14:00 la Aleea Clasicilor, în Grădina Publică „Ștefan cel Mare și Sfânt”, unde vei afla informații utile despre admiterea la studii, universități, procesul de înscriere și pașii necesari.',
		duration: '2 iulie 2026, 10:00–14:00',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		proiectSlug: 'targul-universitatilor',
		proiectEditieSlug: 'targul-universitatilor-2026',
		activities: [
			'oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului',
			'consiliere cu privire la alegerea unei facultăți/specializări',
			'oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel)',
			'oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc.)'
		],
		stats: [
			{ label: 'Beneficiari', value: 'peste 2000 de absolvenți din Republica Moldova' },
			{ label: 'Voluntari implicați în organizare', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Târgul Universităților din România — Bălți',
		slug: 'targul-universitatilor-balti',
		date: '2026-07-03',
		location: 'Bălți — Liceul Teoretic „Mihai Eminescu”',
		description:
			'Ești absolvent de liceu și vrei să devii student în România? Federația Tinerilor Basarabeni din România organizează, în perioada 2–5 iulie, cea de-a XV-a ediție a Târgului Universităților din România. La Bălți, ne găsești între 10:00–14:00 la Liceul Teoretic „Mihai Eminescu”, unde vei afla informații utile despre admiterea la studii, universități, procesul de înscriere și pașii necesari.',
		duration: '3 iulie 2026, 10:00–14:00',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		proiectSlug: 'targul-universitatilor',
		proiectEditieSlug: 'targul-universitatilor-2026',
		activities: [
			'oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului',
			'consiliere cu privire la alegerea unei facultăți/specializări',
			'oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel)',
			'oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc.)'
		],
		stats: [
			{ label: 'Beneficiari', value: 'peste 2000 de absolvenți din Republica Moldova' },
			{ label: 'Voluntari implicați în organizare', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Târgul Universităților din România — Ungheni',
		slug: 'targul-universitatilor-ungheni',
		date: '2026-07-04',
		location: 'Ungheni — Parcul Central „Micul Cluj”',
		description:
			'Ești absolvent de liceu și vrei să devii student în România? Federația Tinerilor Basarabeni din România organizează, în perioada 2–5 iulie, cea de-a XV-a ediție a Târgului Universităților din România. La Ungheni, ne găsești între 10:00–14:00 în Parcul Central „Micul Cluj”, unde vei afla informații utile despre admiterea la studii, universități, procesul de înscriere și pașii necesari.',
		duration: '4 iulie 2026, 10:00–14:00',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		proiectSlug: 'targul-universitatilor',
		proiectEditieSlug: 'targul-universitatilor-2026',
		activities: [
			'oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului',
			'consiliere cu privire la alegerea unei facultăți/specializări',
			'oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel)',
			'oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc.)'
		],
		stats: [
			{ label: 'Beneficiari', value: 'peste 2000 de absolvenți din Republica Moldova' },
			{ label: 'Voluntari implicați în organizare', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Târgul Universităților din România — Comrat',
		slug: 'targul-universitatilor-comrat',
		date: '2026-07-05',
		location: 'Comrat — Aleea Casei de Cultură',
		description:
			'Ești absolvent de liceu și vrei să devii student în România? Federația Tinerilor Basarabeni din România organizează, în perioada 2–5 iulie, cea de-a XV-a ediție a Târgului Universităților din România. La Comrat, ne găsești între 10:00–14:00 pe Aleea Casei de Cultură, unde vei afla informații utile despre admiterea la studii, universități, procesul de înscriere și pașii necesari.',
		duration: '5 iulie 2026, 10:00–14:00',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		proiectSlug: 'targul-universitatilor',
		proiectEditieSlug: 'targul-universitatilor-2026',
		activities: [
			'oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului',
			'consiliere cu privire la alegerea unei facultăți/specializări',
			'oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel)',
			'oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc.)'
		],
		stats: [
			{ label: 'Beneficiari', value: 'peste 2000 de absolvenți din Republica Moldova' },
			{ label: 'Voluntari implicați în organizare', value: 'peste 80 de persoane' },
			{ label: 'Centre universitare promovate', value: '18' },
			{ label: 'Organizații neguvernamentale implicate', value: '19' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/1-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/2-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/3-300x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2022/08/4-300x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Conferința de presă — Târgul Universităților din România',
		slug: 'conferinta-de-presa-targul-universitatilor',
		date: '2026-07-02',
		location: 'Chișinău — Biblioteca „Onisifor Ghibu”',
		description:
			'Începând cu ora 09:00, va avea loc conferința de presă dedicată celei de-a XV-a ediții a Târgului Universităților din România, în incinta Bibliotecii „Onisifor Ghibu” din Chișinău. Reprezentanții Federației Tinerilor Basarabeni din România vor prezenta programul ediției din acest an și detaliile de participare.',
		duration: '2 iulie 2026, 09:00',
		image: 'https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg',
		proiectSlug: 'targul-universitatilor',
		proiectEditieSlug: 'targul-universitatilor-2026',
		activities: [],
		stats: [],
		gallery: [],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	},
	{
		title: 'Save Ukraine — response plan for the Ukrainian crisis in Romania',
		slug: 'save-ukraine-response-plan',
		date: '2022-03-01',
		dateEnd: '2022-10-31',
		location: 'România',
		proiectSlug: 'save-ukraine',
		description: 'Începând cu luna februarie 2022 Federația Tinerilor Basarabeni s-a implicat activ în sprijinul refugiaților din Ucraina odată cu începerea războiului. Cele mai mari fluxuri de refugiați au fost înregistrate în București, Iași, Cluj-Napoca, Timișoara, Suceava, Constanța, Sibiu, Brașov și Galați.',
		duration: 'martie – octombrie 2022',
		financedBy: {
			label: 'Asociația pentru Relații Comunitare (ARC) și ActionAid',
			url: 'https://arcromania.ro/arc/'
		},
		image: 'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-11-1024x658.jpg',
		activities: [
			'delegarea de resursă umană în calitate de traducători la punctele de trecere a frontierelor, centrele de refugiați și de tranzit',
			'medierea situațiilor de conflict cauzate de bariera lingvistică',
			'informarea și consilierea refugiaților cu privire la obținerea actelor pentru șederea temporară sau permanentă',
			'informarea și asistarea refugiaților cu privire la găsirea opțiunilor de cazare temporară sau permanentă',
			'informarea și consilierea refugiaților cu privire la oportunitățile de job pe termen scurt, mediu și lung',
			'informarea și consilierea refugiaților cu privire la opțiunile de aplicare pentru studierea limbii române',
			'informarea și consilierea tinerilor ucraineni cu privire la continuarea studiilor în România',
			'ghidarea refugiaților cu privire la serviciile medicale din România',
			'informarea refugiaților cu privire la activitățile socio-culturale',
			'participarea și organizarea de activități special pentru refugiații din Ucraina'
		],
		stats: [
			{ label: 'Angajați în proiect', value: '12 persoane' },
			{ label: 'Voluntari implicați', value: 'peste 700 de persoane' },
			{ label: 'Beneficiari', value: 'peste 80.000 de ucraineni' },
			{ label: 'Organizații neguvernamentale implicate', value: '16' }
		],
		gallery: [
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-3-225x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Bucuresti-1-300x225.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-6-225x300.jpg',
			'https://www.ftbromania.ro/wp-content/uploads/2021/08/Constanta-8-225x300.jpg'
		],
		email: 'contact@ftbromania.ro',
		phone: '0757 640 003'
	}
];

export function esteTrecut(e: Eveniment, azi: Date = new Date()): boolean {
	return new Date(e.dateEnd ?? e.date).getTime() < azi.getTime();
}

export function sorteazaEvenimente(lista: Eveniment[]): Eveniment[] {
	return [...lista].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEvenimenteVitoare(): Eveniment[] {
	return sorteazaEvenimente(evenimente.filter((e) => !esteTrecut(e)));
}

export function getEvenimenteRecente(): Eveniment[] {
	return evenimente
		.filter((e) => esteTrecut(e))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEvenimenteAle(proiectSlug: string): Eveniment[] {
	const slugs = getSubproiecteSlugs(proiectSlug);
	return evenimente.filter((e) => e.proiectSlug && slugs.includes(e.proiectSlug));
}
