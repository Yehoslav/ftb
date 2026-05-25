<script lang="ts">
    import type { PageProps } from './$types';

    let { params }: PageProps = $props();

    const events = [
        {date: "22 aprilie", descr: "lorem ipsum"},
        {date: "22 aprilie", descr: "lorem ipsum"},
        {date: "22 aprilie", descr: "lorem ipsum"},
    ]

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
    }

    async function featuredPost() {
        const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
            method: 'post', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                query: `{
                    post(id: "federatia-tinerilor-basarabeni-din-romania-aniverseaza-trei-ani-de", idType: SLUG) {
                        excerpt
                        date
                        title
                    }
                }`
            })
        }).then(data => data.json())
        return resp.data.post
    } 
    async function getPost() {
        const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
            method: 'post', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                query: `{
                    post(id: "${params.slug}", idType: SLUG) {
                        content
                        date
                        title
                    }
                }`
            })
        }).then(data => data.json())
        return resp.data.post
    } 
</script>

<div class="mx-auto flex flex-row lg:w-300 divide-x divide-bg-alt border-bg-alt border-x">


    <!-- TODO: Nu vor fi într-atîtea articole ca să le încarc mereu așa, vezi cum le preprocesezi -->
    <div class="w-[60ch] min-w-[60ch] lg:w-[70ch] lg:min-w-[70ch] py-8">
        {#await getPost()}
            <div class="flex flex-row">Încărcăm postarea<div class="loader"></div></div>
            {:then post}
            <article>
                <h1 class="text-3xl font-bold">{post.title}</h1>
                <time>{new Date(post.date).toLocaleString("ro", dateOptions)}</time>
                <hr class="pb-4 border-bg-alt">
                {@html post.content}
            </article>
            {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>

    <div class="flex flex-col grow py-8 divide-y divide-bg-alt">
        <div class="pl-2 ">
            <h1>Articol Recomandat</h1>
            {#await featuredPost()}
                <div class="flex flex-row">Încărcăm postarea<div class="loader"></div></div>
                {:then post}
                <article>
                    <h1 class="text-lg font-bold">{post.title}</h1>
                    <time>{new Date(post.date).toLocaleString("ro", dateOptions)}</time>
                    {@html post.excerpt}
                </article>
                {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
        <div class="pl-2 pt-4">
            <h1>Calendarul evenimentelor</h1>
            <ul>
                {#each events as event}
                    <li class="ml-4"><time>{event.date}</time> &mdash; {event.descr}</li>
                {/each}
            </ul>
        </div>
    </div>

</div>

<style>
article {
    :global(:is(p, ul)) {
        margin-top: 1rem;
    }
    :global(li) {
        list-style-type: circle;
        margin-left: 2rem;
    }
    :global(a) {
        color: blue;
    }
}

.loader {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
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
