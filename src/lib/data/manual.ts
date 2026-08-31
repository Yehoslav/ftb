/*
 * Prototype "manual" knowledge base pentru membri și voluntari.
 * NOTĂ: aceste pagini sunt PROTOTIP demonstrativ — conținutul operațional
 * se completează și se validează cu colegii înainte de a deveni autoritativ.
 * (Sursa §4.5 din plan; fallback pe module TS dacă mdsvex nu e compatibil.)
 */

export interface ManualItem {
	slug: string;
	title: string;
	categorie: string;
	responsabil: string;
	/** Data ultimei actualizări a documentului — editorial, NU o verificare de fapte. */
	ultimaActualizare: string;
	roluri: string[];
	poveste: string[];
	/** Conținut demonstrativ — de înlocuit cu procedura reală. */
	continut: string[];
}

export const manualCategorii: { id: string; label: string }[] = [
	{ id: 'inceput', label: 'La început' },
	{ id: 'operare', label: 'Operare' },
	{ id: 'sabloane', label: 'Șabloane' }
];

export const manualItems: ManualItem[] = [
	{
		slug: 'nou-in-bc',
		title: 'Nou în Biroul de Conducere',
		categorie: 'inceput',
		responsabil: 'Secretariat',
		ultimaActualizare: 'august 2026 (prototip)',
		roluri: ['Membru BC', 'Coordonator'],
		poveste: [
			'Primii 100 de zile în noul mandat — unde găsești informațiile, cine este cine și cum începi.',
			'Referință pentru candidați și pentru cei care vor să înțeleagă cum funcționează federația.'
		],
		continut: [
			'Prezentarea structurii: roluri, comisii și responsabilități.',
			'Acces la documente: unde se păstrează PV-urile, rapoartele și materialele de lucru.',
			'Calendar electoral și de mandate, cu etapele cheie ale unui mandat.',
			'Cine poate ajuta: persoane de contact pe fiecare arie de activitate.'
		]
	},
	{
		slug: 'organizare-evenimente',
		title: 'Organizarea unui Eveniment',
		categorie: 'operare',
		responsabil: 'Coordonator evenimente',
		ultimaActualizare: 'august 2026 (prototip)',
		roluri: ['Organizator', 'Voluntar'],
		poveste: [
			'Checklist-ul și timeline-ul complet pentru a organiza un eveniment, de la idee la raport.',
			'Acoperă buget, locație, comunicare, logistică și raportare.'
		],
		continut: [
			'Definirea obiectivului și a publicului țintă.',
			'Buget și finanțare: deviz, aprobare, deconturi.',
			'Locație, logistică și voluntari necesari.',
			'Comunicare înainte, în timpul și după eveniment.',
			'Raport de activitate și evidență a participanților.'
		]
	},
	{
		slug: 'sabloane',
		title: 'Șabloane — modele de lucru',
		categorie: 'sabloane',
		responsabil: 'Secretariat',
		ultimaActualizare: 'august 2026 (prototip)',
		roluri: ['Toți membrii'],
		poveste: [
			'Modele reutilizabile pregătite de colegi: propunere de eveniment, proces-verbal, acord de voluntariat, buget, antet.',
			'Acces prin Google Drive.'
		],
		continut: [
			'Propunere de eveniment (template).',
			'Proces-verbal de ședință (template).',
			'Acord de voluntariat (template).',
			'Model de buget (template).',
			'Antet și elemente de identitate vizuală.'
		]
	}
];

export function getManualItemBySlug(slug: string): ManualItem | undefined {
	return manualItems.find((i) => i.slug === slug);
}
