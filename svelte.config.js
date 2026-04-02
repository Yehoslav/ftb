// import adapter from '@sveltejs/adapter-node';
import adapter from "@deno/svelte-adapter";

/** @type {import('@sveltejs/kit').Config} */
const config = { kit: { adapter: adapter() } };

export default config;
