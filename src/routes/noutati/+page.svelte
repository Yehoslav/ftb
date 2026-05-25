<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    async function getPosts() {
        const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
                method: 'post', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    query: `{
                        posts {
                            nodes {
                                title
                                slug
                                excerpt
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                               }
                            }
                        }
                    }`
                })
            }
        ).then(data => data.json())
        return resp.data.posts.nodes
    } 
</script>

<div class="lg:w-300 border-x border-bg-alt py-8 flex flex-col mt-8 gap-4 mx-auto content-center">
    <h1 class="text-3xl">Noutăți FTB</h1>

        
    {#await getPosts()}
        <div class="flex flex-row">Încărcăm postarea<div class="loader"></div></div>

    {:then posts}
        Nr. postări: {posts.length}

    <div class="flex flex-col gap-y-4">
        {#each posts as post}
            {@const url = `/noutati/${post.slug}`}

                <div class="flex flex-row gap-x-4 items-center " >
                    <a class="block max-w-120 min-w-120 h-80 overflow-hidden" href={url}><img class="w-full h-full transition hover:scale-110 object-cover" src={post.featuredImage.node.sourceUrl} alt=""></a>
                    <div>
                        <h2 class="font-bold text-xl hover:text-blue-600"><a href={url}>{post.title}</a></h2>
                        <div>{@html post.excerpt}</div>
                    </div>
                </div>
                <hr class="border-bg-alt">
        {/each}
    </div>

    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

</div>

<style>
:global(article p, article ul) {
    margin-top: 1rem;
}
:global(article li) {
    list-style-type: circle;
    margin-left: 2rem;
}
:global(article a) {
    color: blue;
}

.loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
</style>
