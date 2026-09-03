import { GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_ID } from "$env/static/private";
import { getEchipa, getMembri } from "./queries/members";

export { getEchipa, getMembri };

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
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
        throw new Error(
            `Google Sheets API responded with ${resp.status} for range ${range}`,
        );
    }
    const json = await resp.json() as { values?: string[][] };
    if (!json.values) {
        throw new Error(
            `Google Sheets API returned no values for range ${range}`,
        );
    }
    return json.values;
}

export interface InfoFields {
    Nr_Org_Membre: string;
    Nr_Voluntari: string;
    Nr_Parteneri: string;
    Nr_Evenimente: string;
}

const INFO_FALLBACK: InfoFields = {
    Nr_Org_Membre: "4",
    Nr_Voluntari: "700",
    Nr_Parteneri: "16",
    Nr_Evenimente: "15",
};

async function fetchInfo(): Promise<InfoFields> {
    const values = await fetchValues("Info!A1:B");
    const [, ...rows] = values;
    const out: Record<string, string> = {};
    for (const [field, value] of rows) {
        if (field) out[field.trim()] = (value ?? "").trim();
    }
    return {
        Nr_Org_Membre: out.Nr_Org_Membre ?? "",
        Nr_Voluntari: out.Nr_Voluntari ?? "",
        Nr_Parteneri: out.Nr_Parteneri ?? "",
        Nr_Evenimente: out.Nr_Evenimente ?? "",
    };
}

export function getInfo(): Promise<InfoFields> {
    return cachedFetch("info", fetchInfo).catch((err) => {
        console.error(
            "[googleSheets] Info fetch failed, using fallback data:",
            err,
        );
        return INFO_FALLBACK;
    });
}
