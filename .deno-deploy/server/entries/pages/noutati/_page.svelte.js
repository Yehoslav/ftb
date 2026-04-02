import { a5 as await_block, a6 as ensure_array_like, c as attr } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { h as html } from "../../../chunks/html.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    async function getPosts() {
      const resp = await fetch("https://ftbromania.ro/incubator/graphql", {
        method: "post",
        headers: { "Content-Type": "application/json" },
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
      }).then((data2) => data2.json());
      return resp.data.posts.nodes;
    }
    $$renderer2.push(`<div class="lg:w-300 border-x-1 border-olive-200 py-8 flex flex-col mt-8 gap-4 mx-auto content-center svelte-1i5b1z9"><h1 class="text-3xl svelte-1i5b1z9">Noutăți FTB</h1> `);
    await_block(
      $$renderer2,
      getPosts(),
      () => {
        $$renderer2.push(`<div class="flex flex-row svelte-1i5b1z9">Încărcăm postarea<div class="loader svelte-1i5b1z9"></div></div>`);
      },
      (posts) => {
        $$renderer2.push(`Nr. postări: ${escape_html(posts.length)} <div class="flex flex-col gap-y-4 svelte-1i5b1z9"><!--[-->`);
        const each_array = ensure_array_like(posts);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let post = each_array[$$index];
          const url = `/noutati/${post.slug}`;
          $$renderer2.push(`<div class="flex flex-row gap-x-4 items-center svelte-1i5b1z9"><a class="block max-w-120 min-w-120 h-80 overflow-hidden svelte-1i5b1z9"${attr("href", url)}><img class="w-full h-full transition hover:scale-110 object-cover svelte-1i5b1z9"${attr("src", post.featuredImage.node.sourceUrl)} alt=""/></a> <div class="svelte-1i5b1z9"><h2 class="font-bold text-xl hover:text-blue-600 svelte-1i5b1z9"><a${attr("href", url)} class="svelte-1i5b1z9">${escape_html(post.title)}</a></h2> <div class="svelte-1i5b1z9">${html(post.excerpt)}</div></div></div> <hr class="border-olive-200 svelte-1i5b1z9"/>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
    );
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
