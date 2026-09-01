<script lang="ts">
	import type { PageProps } from './$types';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data }: PageProps = $props();

	const item = $derived(data.item);
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-hero { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
		@media (prefers-reduced-motion: reduce) { .anim-hero { animation: none; } }
	</style>
</svelte:head>

<div class="mx-auto w-full max-w-3xl px-6 py-16">
	<div class="anim-hero">
		<Breadcrumbs
			items={[
				{ href: '/org', label: 'Organizație' },
				{ href: '/org/manual', label: 'Manual' },
				{ label: item.title }
			]}
		/>

		<h1 class="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">{item.title}</h1>

		<!-- Metadata — Actualizat (NU "Verificat"), as required by the IA guardrails -->
		<p class="mt-2 text-sm text-text-muted">
			<span class="font-medium text-text">Actualizat:</span> {item.ultimaActualizare}
			<span class="mx-1">·</span>
			<span class="font-medium text-text">Responsabil:</span> {item.responsabil}
		</p>
		<p class="mt-1 text-xs text-text-muted">
			{item.roluri.join(' · ')}
		</p>

		<div class="w-10 h-0.5 bg-blue mt-4 mb-8 rounded-sm" aria-hidden="true"></div>
	</div>

	<article class="anim-hero space-y-6">
		<p class="text-base text-text leading-relaxed">{item.poveste[0]}</p>
		{#if item.poveste[1]}
			<p class="text-base text-text-muted leading-relaxed">{item.poveste[1]}</p>
		{/if}

		<section>
			<h2 class="text-xl font-bold text-text tracking-tight mb-3">Conținut</h2>
			<ul class="space-y-3">
				{#each item.continut as punct}
					<li class="flex items-start gap-3 rounded-xl border border-bg-alt bg-white p-4 text-sm text-text leading-relaxed">
						<i class="fa-solid fa-chevron-right mt-0.5 text-blue" aria-hidden="true"></i>
						<span>{punct}</span>
					</li>
				{/each}
			</ul>
		</section>

		<p class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
			Prototip demonstrativ. Conținutul operațional se completează și se aprobă cu colegii.
		</p>
	</article>
</div>
