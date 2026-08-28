import { GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_ID } from '$env/static/private';
import { membriFallback, type Membru } from '$lib/data/membre';
import { echipaFallback, type MembruEchipa } from '$lib/data/echipa';

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function clearSheetsCache() {
	cache.clear();
}

function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return Promise.resolve(cached.data as T);
	}
	return fetcher().then((data) => {
		cache.set(key, { data, timestamp: Date.now() });
		return data;
	});
}

function valuesUrl(range: string): string {
	return `${SHEETS_API}/${GOOGLE_SHEETS_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`;
}

async function fetchValues(range: string): Promise<string[][]> {
	const resp = await fetch(valuesUrl(range));
	if (!resp.ok) {
		throw new Error(`Google Sheets API responded with ${resp.status} for range ${range}`);
	}
	const json = await resp.json() as { values?: string[][] };
	if (!json.values) {
		throw new Error(`Google Sheets API returned no values for range ${range}`);
	}
	return json.values;
}

const CATEGORII: Membru['categorii'][number][] = ['fondator', 'activ', 'candidat', 'potential'];

function rowToMembru(header: string[], row: string[]): Membru | null {
	const cell = (col: string) => row[header.indexOf(col)]?.trim() ?? '';
	const abreviere = cell('abreviere');
	const nume = cell('nume');
	if (!abreviere && !nume) return null;

	const categorii = cell('categorii')
		.split('|')
		.map((c) => c.trim() as Membru['categorii'][number])
		.filter((c): c is Membru['categorii'][number] => (CATEGORII as string[]).includes(c));

	const socialRaw = cell('social');
	let socialLinks: Record<string, string> | undefined;
	if (socialRaw) {
		try {
			socialLinks = JSON.parse(socialRaw) as Record<string, string>;
		} catch {
			// ignore malformed JSON in the social column
		}
	}

	return {
		abreviere,
		nume,
		numeJuridic: cell('numeJuridic'),
		oras: cell('oras'),
		judet: cell('judet'),
		adresa: cell('adresa') || undefined,
		dataInfiintarii: cell('dataInfiintarii') || undefined,
		presedinte: cell('presedinte') || undefined,
		telefon: cell('telefon') || undefined,
		email: cell('email') || undefined,
		logo: cell('logo') || undefined,
		socialLinks,
		categorii
	};
}

async function fetchMembri(): Promise<Membru[]> {
	const values = await fetchValues('Membri!A1:M');
	const [header, ...rows] = values;
	if (!header) {
		throw new Error('Google Sheets: empty header row in Membri tab');
	}
	return rows
		.map((row) => rowToMembru(header, row))
		.filter((m): m is Membru => m !== null);
}

export function getMembri(): Promise<Membru[]> {
	return cachedFetch('membri', fetchMembri).catch((err) => {
		console.error('[googleSheets] Membri fetch failed, using fallback data:', err);
		return membriFallback;
	});
}

async function fetchEchipa(): Promise<MembruEchipa[]> {
	const values = await fetchValues('Echipa!A1:AJ');
	const [header, ...rows] = values;
	if (!header) {
		throw new Error('Google Sheets: empty header row in Echipa tab');
	}
		return rows
			.map((row): MembruEchipa | null => {
				const cell = (col: string) => row[header.indexOf(col)]?.trim() ?? '';
				const nume = cell('nume');
				const rol = cell('rol');
				const categorie = cell('categorie');
				if (!nume) return null;
				if (categorie !== 'birou' && categorie !== 'extinsa') return null;
				const socials = cell('socials')
					? cell('socials')
							.split(';')
							.filter(Boolean)
							.map((item) => {
								const [label, url] = item.split('|');
								return label && url
									? { label: label.trim(), url: url.trim() }
									: null;
							})
							.filter((s): s is { label: string; url: string } => s !== null)
					: undefined;
				return {
					nume,
					rol,
					categorie,
					foto: cell('foto') || undefined,
					descriere: cell('descriere') || undefined,
					oras: cell('oras') || undefined,
					email: cell('email') || undefined,
					socials: socials && socials.length ? socials : undefined
				};
			})
			.filter((m): m is MembruEchipa => m !== null);
}

export function getEchipa(): Promise<MembruEchipa[]> {
	return cachedFetch('echipa', fetchEchipa).catch((err) => {
		console.error('[googleSheets] Echipa fetch failed, using fallback data:', err);
		return echipaFallback;
	});
}

export interface InfoFields {
	Nr_Org_Membre: string;
	Nr_Voluntari: string;
	Nr_Parteneri: string;
	Nr_Evenimente: string;
}

const INFO_FALLBACK: InfoFields = {
	Nr_Org_Membre: '4',
	Nr_Voluntari: '700',
	Nr_Parteneri: '16',
	Nr_Evenimente: '15'
};

async function fetchInfo(): Promise<InfoFields> {
	const values = await fetchValues('Info!A1:B');
	const [, ...rows] = values;
	const out: Record<string, string> = {};
	for (const [field, value] of rows) {
		if (field) out[field.trim()] = (value ?? '').trim();
	}
	return {
		Nr_Org_Membre: out.Nr_Org_Membre ?? '',
		Nr_Voluntari: out.Nr_Voluntari ?? '',
		Nr_Parteneri: out.Nr_Parteneri ?? '',
		Nr_Evenimente: out.Nr_Evenimente ?? ''
	};
}

export function getInfo(): Promise<InfoFields> {
	return cachedFetch('info', fetchInfo).catch((err) => {
		console.error('[googleSheets] Info fetch failed, using fallback data:', err);
		return INFO_FALLBACK;
	});
}
