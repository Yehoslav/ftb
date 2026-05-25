<script lang="ts">
import './layout.css';
import type { LayoutProps } from './$types';
import { page } from '$app/state';
import favicon from '$lib/assets/favicon.svg';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import Seo from '$lib/components/Seo.svelte';
import { dev } from '$app/environment';

let { children }: LayoutProps = $props();
let headerHeight = $state(0);
</script>

<svelte:head>
	<Seo
		title={page.data.seo?.title ?? 'FTB România'}
		description={page.data.seo?.description}
		image={page.data.seo?.image}
	/>
	<link rel="icon" href={favicon} />
	<script defer src="/fa/js/fontawesome.js"></script>
	<script defer src="/fa/js/brands.js"></script>
	<script defer src="/fa/js/solid.js"></script>
	<script defer src="/fa/js/regular.js"></script>
</svelte:head>


{#if dev}
    <div
        class="fixed bottom-6 left-6 rounded bg-primary-subtle border border-primary-border z-200 px-4 py-2 font-mono"
    >
        <span class="inline sm:hidden">xs</span>
        <span class="hidden sm:inline md:hidden">sm</span>
        <span class="hidden md:inline lg:hidden">md</span>
        <span class="hidden lg:inline xl:hidden">lg</span>
        <span class="hidden xl:inline">xl</span>
    </div>
{/if}

<Header bind:headerHeight />

<main class="min-h-screen" style="padding-top: {headerHeight}px">
	{@render children()}
</main>

<Footer />
