import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({}) => {
    // const posts = await fetch(
    //     "https://ftbromania.ro/incubator/graphql",
    //     {
    //         method: 'post', 
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             query: `{
    //                 posts {
    //                     nodes {
    //                         title
    //                         slug
    //                         excerpt
    //                     }
    //                 }
    //             }`
    //         })
    //     }
    // ).then(data => data.json())
    // return { posts: posts.data.posts.nodes }
    return {}
}
