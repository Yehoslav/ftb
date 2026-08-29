export interface Spotlight {
	id: string;
	titlu: string;
	descriere: string;
	href: string;
	cta: string;
}

interface SpotlightLuna {
	months: number[];
	spotlight: Spotlight;
}

const rotatieHardcodata: SpotlightLuna[] = [
	{
		months: [5, 6, 7, 8],
		spotlight: {
			id: 'admitere',
			titlu: 'Admitere în România',
			descriere:
				'Înscrierile la universitate sunt deschise — ghid pas-cu-pas: documente, viză, acte de ședere.',
			href: '/admitere',
			cta: 'Începe admiterea'
		}
	},
	{
		months: [9, 10],
		spotlight: {
			id: 'inceput-de-an',
			titlu: 'Prima lună de facultate',
			descriere:
				'Înmatriculare, cămin, buletin provizoriu — pașii de start pentru studenții proaspăt admiși.',
			href: '/ghiduri#admitere',
			cta: 'Pașii de la început'
		}
	},
	{
		months: [11, 12, 1, 2],
		spotlight: {
			id: 'sedere',
			titlu: 'Acte & ședere',
			descriere:
				'Viză de studii, permis de ședere și documente — unde și cum le rezolvi.',
			href: '/ghiduri#admitere',
			cta: 'Vezi ghidul de acte'
		}
	},
	{
		months: [3, 4],
		spotlight: {
			id: 'limba-integrare',
			titlu: 'Limba & integrare',
			descriere:
				'Cursuri de limba română și resurse practice pentru integrarea în comunitate.',
			href: '/ghiduri#resurse-generale',
			cta: 'Resurse de integrare'
		}
	}
];

export function getSpotlight(azi: Date = new Date()): Spotlight {
	const luna = azi.getMonth() + 1;
	return (
		rotatieHardcodata.find((v) => v.months.includes(luna))?.spotlight ??
		rotatieHardcodata[0].spotlight
	);
}

export const homepageConfig = {
	showDonate: false,
	showPartners: false,
	showSectionLabels: true
} as const;