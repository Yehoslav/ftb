import { GRIST_AUTH_TOKEN } from '$env/static/private';

import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const resp = await fetch(
        'https://docs.getgrist.com/api/docs/s854V9KHkfoAY2ZE7BuSPd/tables/Table1/records',
        {
            method: 'get',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${GRIST_AUTH_TOKEN}`,
            },
        },
    )
        .then((data) => data.json());

    return json(resp.records.map(r => r.fields))
}
