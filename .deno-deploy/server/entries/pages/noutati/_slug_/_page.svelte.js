import { a5 as await_block, a6 as ensure_array_like } from "../../../../chunks/index.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { h as html } from "../../../../chunks/html.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { params } = $$props;
    const events = [
      { date: "22 aprilie", descr: "lorem ipsum" },
      { date: "22 aprilie", descr: "lorem ipsum" },
      { date: "22 aprilie", descr: "lorem ipsum" }
    ];
    const dateOptions = { month: "long", day: "numeric", year: "numeric" };
    async function featuredPost() {
      const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
                    post(id: "federatia-tinerilor-basarabeni-din-romania-aniverseaza-trei-ani-de", idType: SLUG) {
                        excerpt
                        date
                        title
                    }
                }`
        })
      }).then((data) => data.json());
      return resp.data.post;
    }
    async function getPost() {
      const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
                    post(id: "${params.slug}", idType: SLUG) {
                        content
                        date
                        title
                    }
                }`
        })
      }).then((data) => data.json());
      return resp.data.post;
    }
    $$renderer2.push(`<div class="mx-auto flex flex-row lg:w-300 divide-x-1 divide-olive-200 border-olive-200 border-x-1 svelte-k4m9k3"><div class="w-[60ch] min-w-[60ch] lg:w-[70ch] lg:min-w-[70ch] py-8 svelte-k4m9k3">`);
    await_block(
      $$renderer2,
      getPost(),
      () => {
        $$renderer2.push(`<div class="flex flex-row svelte-k4m9k3">Încărcăm postarea<div class="loader svelte-k4m9k3"></div></div>`);
      },
      (post) => {
        $$renderer2.push(`<article class="svelte-k4m9k3"><h1 class="text-3xl font-bold svelte-k4m9k3">${escape_html(post.title)}</h1> <time class="svelte-k4m9k3">${escape_html(new Date(post.date).toLocaleString("ro", dateOptions))}</time> <hr class="pb-4 border-olive-200 svelte-k4m9k3"/> ${html(post.content)}</article>`);
      }
    );
    $$renderer2.push(`<!--]--></div> <div class="flex flex-col grow py-8 divide-y-1 divide-olive-200 svelte-k4m9k3"><div class="pl-2 svelte-k4m9k3"><h1 class="svelte-k4m9k3">Articol Recomandat</h1> `);
    await_block(
      $$renderer2,
      featuredPost(),
      () => {
        $$renderer2.push(`<div class="flex flex-row svelte-k4m9k3">Încărcăm postarea<div class="loader svelte-k4m9k3"></div></div>`);
      },
      (post) => {
        $$renderer2.push(`<article class="svelte-k4m9k3"><h1 class="text-lg font-bold svelte-k4m9k3">${escape_html(post.title)}</h1> <time class="svelte-k4m9k3">${escape_html(new Date(post.date).toLocaleString("ro", dateOptions))}</time> ${html(post.excerpt)}</article>`);
      }
    );
    $$renderer2.push(`<!--]--></div> <div class="pl-2 pt-4 svelte-k4m9k3"><h1 class="svelte-k4m9k3">Calendarul evenimentelor</h1> <ul class="svelte-k4m9k3"><!--[-->`);
    const each_array = ensure_array_like(events);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let event = each_array[$$index];
      $$renderer2.push(`<li class="ml-4 svelte-k4m9k3"><time class="svelte-k4m9k3">${escape_html(event.date)}</time> — ${escape_html(event.descr)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div></div>`);
  });
}
export {
  _page as default
};
