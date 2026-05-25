<script lang="ts">
import './layout.css';
import type { LayoutProps } from './$types';
import favicon from '$lib/assets/favicon.svg';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';

let { children }: LayoutProps = $props();
let headerHeight = $state(0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer src="/fa/js/fontawesome.js"></script>
	<script defer src="/fa/js/brands.js"></script>
	<script defer src="/fa/js/solid.js"></script>
	<script defer src="/fa/js/regular.js"></script>
</svelte:head>

<Header bind:headerHeight />

<main class="min-h-screen" style="padding-top: {headerHeight}px">
	{@render children()}
</main>

<Footer />
