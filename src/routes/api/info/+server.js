import { GRIST_AUTH_TOKEN } from '$env/static/private';

import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const r = await getInfo()
    return json(r)
}

async function getInfo() {
    const resp = await fetch(
        'https://docs.getgrist.com/api/docs/s854V9KHkfoAY2ZE7BuSPd/tables/Informatii/records',
        {
            method: 'get',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${GRIST_AUTH_TOKEN}`,
            },
        },
    )
        .then((data) => data.json());

    return resp.records.at(0).fields;
}

