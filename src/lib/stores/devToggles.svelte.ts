import { browser } from '$app/environment';

function readStored(key: string, defaultValue: boolean): boolean {
	if (!browser) return defaultValue;
	const raw = localStorage.getItem(key);
	return raw === null ? defaultValue : raw === '1';
}

let placeholders = $state(readStored('ftb:placeholders', false));
let sectionLabels = $state(readStored('ftb:sectionLabels', false));

function persist(key: string, value: boolean) {
	if (browser) {
		try {
			localStorage.setItem(key, value ? '1' : '0');
		} catch {
			// storage unavailable
		}
	}
}

export function isPlaceholdersEnabled(): boolean {
	return placeholders;
}

export function setPlaceholdersEnabled(v: boolean) {
	placeholders = v;
	persist('ftb:placeholders', v);
}

export function togglePlaceholders(): boolean {
	setPlaceholdersEnabled(!placeholders);
	return placeholders;
}

export function isSectionLabelsEnabled(): boolean {
	return sectionLabels;
}

export function setSectionLabelsEnabled(v: boolean) {
	sectionLabels = v;
	persist('ftb:sectionLabels', v);
}

export function toggleSectionLabels(): boolean {
	setSectionLabelsEnabled(!sectionLabels);
	return sectionLabels;
}
