import { json } from '@sveltejs/kit';
import { clearCache } from '$lib/server/wp';

export async function POST() {
	clearCache();
	return json({ ok: true });
}
