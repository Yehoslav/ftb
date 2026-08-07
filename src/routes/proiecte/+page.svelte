<script lang="ts">
	import { huburi } from '$lib/data/proiecte';

	let categorie = $state<'toate' | 'anuale' | 'singulare'>('toate');
	let domeniu = $state('toate');

	const domenii = $derived([...new Set(huburi.flatMap((h) => h.domenii))].sort());

	const filtrate = $derived(
		huburi.filter(
			(h) =>
				(categorie === 'toate' || h.categorie === categorie) &&
				(domeniu === 'toate' || h.domenii.includes(domeniu))
		)
	);

	const categoriiFiltru: Array<{ valoare: typeof categorie; eticheta: string }> = [
		{ valoare: 'toate', eticheta: 'Toate' },
		{ valoare: 'anuale', eticheta: 'Anuale' },
		{ valoare: 'singulare', eticheta: 'Singulare' }
	];
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-projs { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

	.proj-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}
	.proj-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
	.proj-card:hover .proj-card__arrow {
		transform: translateX(3px);
	}
	.proj-card__arrow {
		transition: transform 0.3s ease;
	}

	.filter-chip {
		transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
	}
	.filter-chip[aria-pressed="true"] {
		background-color: var(--color-blue);
		border-color: var(--color-blue);
		color: #fff;
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-hero, .anim-projs { animation: none; }
		.proj-card:hover { transform: none; }
		.proj-card:hover .proj-card__arrow { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Proiecte</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<div class="anim-projs">
		{#if huburi.length > 0}
			<nav class="flex flex-wrap items-center gap-2 mb-8" aria-label="Filtre proiecte">
				{#each categoriiFiltru as filtru}
					<button
						onclick={() => (categorie = filtru.valoare)}
						class="filter-chip inline-flex items-center text-sm px-4 py-1.5 rounded-full border border-bg-alt bg-white text-text hover:bg-bg transition-colors"
						aria-pressed={categorie === filtru.valoare}
					>
						{filtru.eticheta}
					</button>
				{/each}

				<span class="w-px h-6 bg-bg-alt mx-1" aria-hidden="true"></span>

				<button
					onclick={() => (domeniu = 'toate')}
					class="filter-chip inline-flex items-center text-sm px-4 py-1.5 rounded-full border border-bg-alt bg-white text-text hover:bg-bg transition-colors"
					aria-pressed={domeniu === 'toate'}
				>
					Toate domeniile
				</button>
				{#each domenii as d}
					<button
						onclick={() => (domeniu = domeniu === d ? 'toate' : d)}
						class="filter-chip inline-flex items-center text-sm px-4 py-1.5 rounded-full border border-bg-alt bg-white text-text hover:bg-bg transition-colors"
						aria-pressed={domeniu === d}
					>
						{d}
					</button>
				{/each}
			</nav>
		{/if}

		{#if filtrate.length === 0}
			<p class="text-text-muted text-center py-12">
				Nu există proiecte care să corespundă filtrelor selectate.
			</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{#each filtrate as hub}
					<a href="/proiecte/{hub.slug}" class="proj-card bg-white rounded-xl border border-bg-alt p-6 lg:p-7 no-underline block flex flex-col">
						<div class="w-12 h-1 rounded-full mb-5" style="background-color: {hub.culoare}" aria-hidden="true"></div>

						<div class="flex items-center justify-between gap-2 mb-3">
							<span class="inline-flex items-center text-xs font-medium text-white px-3 py-1 rounded-full" style="background-color: {hub.culoare}">
								{hub.categorie === 'anuale' ? 'Anual' : 'Singular'}
							</span>
							{#if hub.website}
								<i class="fa-solid fa-arrow-up-right-from-square text-text-muted text-sm" aria-hidden="true"></i>
							{/if}
						</div>

						<h2 class="text-lg font-bold text-text leading-snug mb-3">{hub.titlu}</h2>

						<p class="text-sm text-text-muted leading-relaxed line-clamp-3 mb-5 flex-1">{hub.descriere}</p>

						<div class="flex flex-wrap gap-1.5 mb-5">
							{#each hub.domenii as domeniu}
								<span class="text-xs text-text-muted bg-bg-alt border border-bg-alt px-2.5 py-0.5 rounded-full">
									{domeniu}
								</span>
							{/each}
						</div>

						<span class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline">
							Vezi proiectul
							<span class="proj-card__arrow" aria-hidden="true">→</span>
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
