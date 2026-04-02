import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
    // const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
    //         method: 'post', 
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             query: `{
    //                 post(id: "${params.slug}", idType: SLUG) {
    //                     content
    //                     date
    //                     title
    //                 }
    //             }`
    //         })
    //     }).then(data => data.json())
    // return { post: resp.data.post }
    return {}
}

