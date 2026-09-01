<script lang="ts">
	import type { PageProps } from './$types';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { manualItems, manualCategorii } from '$lib/data/manual';

	let { data }: PageProps = $props();
	void data;
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		@media (prefers-reduced-motion: reduce) { .pi-anim { animation: none; } }
	</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro
		title="Manual"
		lede="Un ghid public pentru membri și voluntari: proceduri, roluri și șabloane. (Prototip — conținutul se completează cu colegii.)"
		parent={{ href: '/org', label: 'Organizație' }}
	/>

	<div class="space-y-12">
		{#each manualCategorii as cat}
			{@const items = manualItems.filter((i) => i.categorie === cat.id)}
			{#if items.length > 0}
				<section>
					<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-6">{cat.label}</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						{#each items as item}
							<a
								href="/org/manual/{item.slug}"
								class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-white p-6 no-underline"
							>
								<h3 class="font-semibold text-text leading-snug group-hover:text-oxford transition-colors">{item.title}</h3>
								<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">{item.poveste[0]}</p>
								<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
									Deschide
									<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
								</span>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	</div>
</div>
