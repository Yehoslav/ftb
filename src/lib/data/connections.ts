export interface Connection {
	nextStep?: { href: string; label: string };
	relatedGuides?: string[];
	relatedProject?: { slug: string; label: string };
	relatedEvents?: { slug: string; label: string };
	external?: Array<{ label: string; url: string }>;
}

export const connections: Record<string, Connection> = {
	'aplica-pentru-viza-de-studii': {
		nextStep: {
			href: '/student-in-romania',
			label: 'După viză: viața de student în România'
		},
		external: [
			{
				label: 'Ambasada Republicii Moldova',
				url: 'https://ambasada.md/'
			}
		]
	},
	'aplica-pentru-acte-de-sedere-temporara': {
		nextStep: {
			href: '/student-in-romania',
			label: 'După ședere: viața de student în România'
		},
		external: [
			{
				label: 'Direcția Generală de Imigrări — Permise de ședere',
				url: 'https://igi.mai.gov.ro/'
			}
		]
	},
	'rute-transport': {
		external: [
			{
				label: 'Autogari.md — Autobuze Republica Moldova ↔ România',
				url: 'https://autogari.md/'
			}
		],
		relatedGuides: ['viziteaza-romania']
	}
};
