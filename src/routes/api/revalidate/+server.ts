import { json } from '@sveltejs/kit';
import { clearCache } from '$lib/server/wp';
import { clearGristCache } from '$lib/server/grist';

export async function POST() {
	clearCache();
	clearGristCache();
	return json({ ok: true });
}
