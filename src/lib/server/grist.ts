import { GRIST_AUTH_TOKEN } from '$env/static/private';

const GRIST_DOC_ID = 's854V9KHkfoAY2ZE7BuSPd';
const GRIST_API = 'https://docs.getgrist.com/api';
const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function clearGristCache() {
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

export interface InfoFields {
	Nr_Org_Membre: string;
	Nr_Voluntari: string;
	Nr_Parteneri: string;
	Nr_Evenimente: string;
}

export interface AsociatieFields {
	Nume: string;
	Abreviere: string;
	Judet: string;
}

async function fetchInfo(): Promise<InfoFields> {
	const resp = await fetch(`${GRIST_API}/docs/${GRIST_DOC_ID}/tables/Informatii/records`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${GRIST_AUTH_TOKEN}`
		}
	});
	const json = await resp.json() as { records: Array<{ fields: InfoFields }> };
	return json.records[0].fields;
}

export function getInfo(): Promise<InfoFields> {
	return cachedFetch('Informatii', fetchInfo);
}

async function fetchAsociatii(): Promise<AsociatieFields[]> {
	const resp = await fetch(`${GRIST_API}/docs/${GRIST_DOC_ID}/tables/Table1/records`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${GRIST_AUTH_TOKEN}`
		}
	});
	const json = await resp.json() as { records: Array<{ fields: AsociatieFields }> };
	return json.records.map((r) => r.fields);
}

export function getAsociatii(): Promise<AsociatieFields[]> {
	return cachedFetch('Table1', fetchAsociatii);
}
