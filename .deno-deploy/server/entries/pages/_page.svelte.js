import { e as escape_html } from "../../chunks/escaping.js";
function Counter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let counterResult = {};
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex flex-row justify-between w-full text-2xl font-bold"><div class="flex flex-col items-center">${escape_html(counterResult.organizatii)} <span>organizații membre</span></div> <div class="flex flex-col items-center"><span>${escape_html(counterResult.voluntari)}+</span> <span>voluntari</span></div> <div class="flex flex-col items-center">${escape_html(counterResult.parteneri)} <span>parteneri</span></div> <div class="flex flex-col items-center">${escape_html(counterResult.proiecte)} <span>evenimente anuale</span></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  $$renderer.push(`<div class="lg:w-300 border-x-1 border-olive-200 *:border-olive-200 m-auto"><div class="border-b-1 py-8 flex flex-row items-center"><div class="w-1/2"><h1 class="text-2xl font-bold">Noi suntem FTB</h1> Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate asociațiile de studenți și tineri basarabeni din România. Chiar dacă ca grup de inițiativă am existat de mai mult timp, statutul juridic l-am obținut pe 24 septembrie 2021. În prezent federația are 17 asociații membre din cele mai mari centre universitare din România: Alba-Iulia, Bacău, Brașov, București, Cluj-Napoca, Craiova, Galați, Iași, Petroșani, Ploiești, Sibiu, Suceava, Târgoviște, Târgu Mureș și Timișoara.</div> <div class="w-1/2 flex justify-center"><img src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png" class="w-2/3" alt=""/></div></div> <div class="py-16 flex flex-row items-center">`);
  Counter($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};
