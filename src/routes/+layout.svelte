<script lang="ts">
import './layout.css';
import type { LayoutProps } from './$types';
import { page, navigating } from '$app/state';
import { setContext } from 'svelte';
import favicon from '$lib/assets/favicon.svg';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import Seo from '$lib/components/Seo.svelte';
import { dev } from '$app/environment';

let { children }: LayoutProps = $props();
let headerHeight = $state(0);
let headerVisible = $state(true);

setContext('header', {
	get height() { return headerHeight; },
	get visible() { return headerVisible; }
});
</script>

<svelte:head>
	<Seo
		title={page.data.seo?.title ?? 'FTB România'}
		description={page.data.seo?.description}
		image={page.data.seo?.image}
	/>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/fa/css/fontawesome.min.css">
	<link rel="stylesheet" href="/fa/css/brands.min.css">
	<link rel="stylesheet" href="/fa/css/solid.min.css">
	<link rel="stylesheet" href="/fa/css/regular.min.css">
</svelte:head>

{#if navigating.to}
	<div class="fixed top-0 left-0 right-0 z-100 h-0.5 bg-cerry animate-pulse"></div>
{/if}

{#if dev}
	<div
		class="fixed bottom-5 left-5 rounded bg-white/90 border border-bg-alt shadow-sm z-200 px-3 py-1.5 font-mono text-xs text-text-muted backdrop-blur-sm"
	>
		<span class="inline sm:hidden">xs</span>
		<span class="hidden sm:inline md:hidden">sm</span>
		<span class="hidden md:inline lg:hidden">md</span>
		<span class="hidden lg:inline xl:hidden">lg</span>
		<span class="hidden xl:inline">xl</span>
	</div>
{/if}

<Header bind:headerHeight bind:headerVisible />

<main class="min-h-screen" style="padding-top: {headerHeight}px">
	{@render children()}
</main>

<Footer />
