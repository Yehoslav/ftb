import { browser } from '$app/environment';

const STORAGE_KEY = 'ftb:placeholders';

function readInitial(): boolean {
	if (!browser) return false;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === null) return false;
	return stored === '1';
}

let enabled = $state(readInitial());

function persist() {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
	} catch {
		// storage unavailable
	}
}

export function isPlaceholdersEnabled(): boolean {
	return enabled;
}

export function setPlaceholdersEnabled(value: boolean) {
	enabled = value;
	persist();
}

export function togglePlaceholders(): boolean {
	enabled = !enabled;
	persist();
	return enabled;
}
