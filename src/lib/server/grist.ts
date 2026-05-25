import { GRIST_AUTH_TOKEN } from '$env/static/private';

const GRIST_DOC_ID = 's854V9KHkfoAY2ZE7BuSPd';
const GRIST_API = 'https://docs.getgrist.com/api';

async function gristFetch<T>(tableId: string): Promise<T> {
	const resp = await fetch(`${GRIST_API}/docs/${GRIST_DOC_ID}/tables/${tableId}/records`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${GRIST_AUTH_TOKEN}`
		}
	});
	const json = await resp.json() as { records: Array<{ fields: T }> };
	return json.records.map((r) => r.fields) as T;
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

export async function getInfo(): Promise<InfoFields> {
	const resp = await fetch(`${GRIST_API}/docs/${GRIST_DOC_ID}/tables/Informatii/records`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${GRIST_AUTH_TOKEN}`
		}
	});
	const json = await resp.json() as { records: Array<{ fields: InfoFields }> };
	return json.records[0].fields;
}

export async function getAsociatii(): Promise<AsociatieFields[]> {
	const resp = await fetch(`${GRIST_API}/docs/${GRIST_DOC_ID}/tables/Table1/records`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${GRIST_AUTH_TOKEN}`
		}
	});
	const json = await resp.json() as { records: Array<{ fields: AsociatieFields }> };
	return json.records.map((r) => r.fields);
}
