import { WP_GRAPHQL_ENDPOINT } from '$env/static/private';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000;

function cacheKey(query: string, variables?: Record<string, unknown>): string {
	return JSON.stringify({ query, variables });
}

export function clearCache(keyHint?: string) {
	if (keyHint) {
		for (const key of cache.keys()) {
			if (key.includes(keyHint)) cache.delete(key);
		}
	} else {
		cache.clear();
	}
}

export async function queryWP<T>(query: string, variables?: Record<string, unknown>, bypassCache?: boolean): Promise<T> {
	const key = cacheKey(query, variables);

	if (!bypassCache) {
		const cached = cache.get(key);
		if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
			return cached.data as T;
		}
	}

	const resp = await fetch(WP_GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables })
	});

	const json = await resp.json() as { data?: T; errors?: Array<{ message: string }> };

	if (json.errors) {
		throw new Error(json.errors.map((e) => e.message).join('\n'));
	}

	cache.set(key, { data: json.data, timestamp: Date.now() });

	return json.data as T;
}

export function warmNoutatiCache(): Promise<void> {
	const q = `query Posts {
		posts(first: 10, where: { categoryName: "actualitati" }) {
			nodes { title slug excerpt date featuredImage { node { sourceUrl srcSet sizes mediaDetails { width height } } } }
			pageInfo { hasNextPage endCursor }
		}
	}`;
	return queryWP(q).then(() => {}).catch(() => {});
}
