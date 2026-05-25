export interface Proiect {
	titlu: string;
	perioada: string;
	finantator?: string;
	descriere: string;
	activitati: string[];
	beneficiari?: string;
	voluntari?: string;
	parteneri?: string;
}

export interface CategorieProiecte {
	nume: string;
	proiecte: Proiect[];
}

/*
 * TODO: De migrat la ACF CPT (câmpuri: titlu, perioadă, finanțator,
 * descriere, activități, beneficiari, voluntari, parteneri, categorie,
 * foto) când ACF + WPGraphQL ACF sunt gata pe WP.
 */
export const categorii: CategorieProiecte[] = [
	{
		nume: 'Anuale',
		proiecte: [
			{
				titlu: 'AdmiteRO',
				perioada: 'Anual în perioada mai-octombrie',
				descriere:
					'Campania AdmiteRO este o campanie de promovare a studiilor în România, desfășurată anual de Federația Tinerilor Basarabeni, cu ajutorul celor 16 asociații de basarabeni, atât în mediul offline cât și online, care presupune mai multe activități.',
				activitati: [
					'Promovarea ofertelor universităților din România în Republica Moldova prin intermediul evenimentului Târgul Universităților din România, în cadrul căreia oferim informații și consultanță pentru tinerii absolvenți de liceu care vor să-și continue studiile în România.',
					'Colectarea dosarelor cu documente ale tinerilor care au fost acceptați la studii în România și transmiterea actelor colectate către secretariatele facultăților din orașele din România pentru înmatricularea acestora la studii.',
					'Oferirea suportului informațional constant despre etapele admiterii în România, obținerea actelor de studiu și obținerea actelor de ședere legală prin intermediul canalelor de social media ale federației.'
				],
				beneficiari: 'peste 10.000 informați și consiliați despre studiile în România anual',
				voluntari: 'peste 300 de persoane',
				parteneri: '19'
			},
			{
				titlu: 'Târgul Universităților din România',
				perioada: 'Anual în luna Iulie',
				descriere:
					'Târgul Universităților din România este un eveniment din cadrul campaniei AdmiteRO, prin intermediul căruia tinerii și cadrele didactice din România prezintă oferta educațională a celor mai mari centre universitare din România.',
				activitati: [
					'Oferirea de informații despre etapele admiterii în România, actele necesare și modalitatea de confirmare a locului.',
					'Consiliere cu privire la alegerea unei facultăți / specializări.',
					'Oferirea de informații despre oportunitățile pentru studenți (burse Erasmus, programe Work and Travel).',
					'Oferirea de informații despre acomodarea în România (cazare, transport, mâncare etc).'
				],
				beneficiari: 'peste 2000 de absolvenți din Republica Moldova',
				voluntari: 'peste 80 de persoane',
				parteneri: '19'
			},
			{
				titlu: 'Ziua Națională a României',
				perioada: 'Anual pe 1 decembrie',
				descriere:
					'Evenimentul are loc în fiecare an la Alba Iulia, de 1 decembrie, unde cele 16 asociații de basarabeni din România, membre ale Federației Tinerilor Basarabeni, se adună la evenimentul de sărbătorire a Zilei Naționale a României.',
				activitati: [
					'Turul orașului și a cetății Alba Iulia.',
					'Hora unirii.',
					'Flash-mob-uri de promovare a identității culturale românești din Republica Moldova.',
					'Participarea la activitățile organizate de autorități în cadrul cetății Alba Carolina din Alba Iulia.'
				],
				beneficiari: 'peste 300 de persoane',
				voluntari: 'peste 20 de persoane',
				parteneri: '19'
			},
			{
				titlu: 'Summitul Tinerilor din Republica Moldova „Aripi spre Viitor”',
				perioada: 'Ediții succesive (2023 — prezent)',
				finantator: 'Departamentul pentru Relația cu Republica Moldova',
				descriere:
					'Proiectul își propune să conecteze tinerii basarabeni care-și fac studiile sau trăiesc în România cu tinerii din Republica Moldova, motivându-i să se întoarcă în țară și să contribuie împreună la dezvoltarea Republicii Moldova.',
				activitati: [
					'Paneluri de discuții și ateliere de lucru pe teme precum „Rolul tinerilor în procesul de aderare al Republicii Moldova la UE” și „Viitorul muncii în Republica Moldova”.',
					'Sesiuni de formare susținute de formatori și experți din domeniu.',
					'Activități de networking și schimb de experiență între participanți.'
				],
				beneficiari: '100 de tineri din Republica Moldova și România per ediție',
				voluntari: 'peste 25 de persoane per ediție'
			}
		]
	},
	{
		nume: 'Singulare',
		proiecte: [
			{
				titlu: 'Save Ukraine — response plan for the Ukrainian crisis in Romania',
				perioada: 'Martie — Octombrie 2022',
				finantator: 'Asociația pentru Relații Comunitare (ARC) și ActionAid',
				descriere:
					'Începând cu luna februarie 2022, Federația Tinerilor Basarabeni s-a implicat activ în sprijinul refugiaților din Ucraina. Cele mai mari fluxuri de refugiați au fost înregistrate în București, Iași, Cluj-Napoca, Timișoara, Suceava, Constanța, Sibiu, Brașov și Galați.',
				activitati: [
					'Delegarea de resursă umană în calitate de traducători la punctele de trecere a frontierelor, centrele de refugiați și centrele de tranzit.',
					'Medierea situațiilor de conflict cauzate de bariera lingvistică.',
					'Informarea și consilierea refugiaților cu privire la obținerea actelor pentru șederea temporară sau permanentă.',
					'Informarea și asistarea refugiaților cu privire la găsirea opțiunilor de cazare temporară sau permanentă.',
					'Ghidarea refugiaților cu privire la serviciile medicale din România și oportunitățile de angajare.'
				],
				beneficiari: 'peste 80.000 de ucraineni',
				voluntari: 'peste 700 de persoane',
				parteneri: '16'
			},
			{
				titlu: 'Resurse pentru Organizații de Tineret din Republica Moldova',
				perioada: 'Mai — Septembrie 2022',
				finantator: 'Departamentul pentru Relația cu Republica Moldova',
				descriere:
					'Proiectul urmărește dezvoltarea capacității organizațiilor de tineret și formarea comunităților de tineri din Republica Moldova prin intermediul organizațiilor de tineret de basarabeni din România, cu scopul de a produce un impact pozitiv pe termen mediu și lung în comunitatea din Republica Moldova.',
				activitati: [
					'Organizarea a 4 sesiuni de formare: Reziliența ONGT-urilor în perioade de criză, Managementul proiectelor și scrierea cererilor de finanțare, Lobby și Advocacy, Instituții europene și cetățenie europeană.',
					'Crearea platformei cu resurse pentru organizațiile de tineret din Republica Moldova.',
					'Oferirea de resurse materiale tinerilor din organizațiile implicate.'
				],
				beneficiari: '15 organizații de tineret și 60 de tineri din Republica Moldova',
				voluntari: '20 de persoane'
			}
		]
	}
];
