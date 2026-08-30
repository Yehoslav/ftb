<script lang="ts">
import './layout.css';
import type { LayoutProps } from './$types';
import { page, navigating } from '$app/state';
import { setContext } from 'svelte';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import Seo from '$lib/components/Seo.svelte';
import PlaceholderToggle from '$lib/components/PlaceholderToggle.svelte';
import { dev } from '$app/environment';

let { children }: LayoutProps = $props();
let headerHeight = $state(0);

setContext('header', {
	get height() { return headerHeight; }
});
</script>

<svelte:head>
	<Seo
		title={page.data.seo?.title ?? 'FTB România'}
		description={page.data.seo?.description}
		image={page.data.seo?.image}
	/>
	<link rel="stylesheet" href="/fa/css/fa-bare.min.css">
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

<a
	href="#main-content"
	class="fixed -top-full left-4 z-60 px-4 py-2 bg-white text-oxford rounded-lg shadow-lg border border-bg-alt text-sm font-medium no-underline focus:top-4 focus:outline-2 focus:outline-oxford transition-all duration-150"
>
	Sari la conținut
</a>

<Header bind:headerHeight />

<main id="main-content" class="min-h-screen" style="padding-top: {headerHeight}px">
	{@render children()}
</main>

<Footer />

<PlaceholderToggle />
