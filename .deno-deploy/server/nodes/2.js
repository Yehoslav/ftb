import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.dDUCi3MX.js","_app/immutable/chunks/BOtavGaX.js","_app/immutable/chunks/C1robant.js","_app/immutable/chunks/CWDJeJw0.js","_app/immutable/chunks/k_Eu9BfI.js","_app/immutable/chunks/Bsb6_eqI.js","_app/immutable/chunks/DwcbK9BS.js","_app/immutable/chunks/DCEEveiS.js"];
export const stylesheets = [];
export const fonts = [];
