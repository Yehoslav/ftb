import { WP_GRAPHQL_ENDPOINT } from '$env/static/private';

export async function queryWP<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
	const resp = await fetch(WP_GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables })
	});

	const json = await resp.json() as { data?: T; errors?: Array<{ message: string }> };

	if (json.errors) {
		throw new Error(json.errors.map((e) => e.message).join('\n'));
	}

	return json.data as T;
}
