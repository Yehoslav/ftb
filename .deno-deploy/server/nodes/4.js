import * as server from '../entries/pages/noutati/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/noutati/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/noutati/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.-H6580mY.js","_app/immutable/chunks/BOtavGaX.js","_app/immutable/chunks/C1robant.js","_app/immutable/chunks/k_Eu9BfI.js","_app/immutable/chunks/CUXjzNTl.js","_app/immutable/chunks/DwcbK9BS.js"];
export const stylesheets = ["_app/immutable/assets/4.DR9HrTks.css"];
export const fonts = [];
