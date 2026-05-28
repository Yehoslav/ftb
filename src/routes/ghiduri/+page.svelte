<script lang="ts">
	import { resurseCategorii } from '$lib/data/resurse';
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-intro { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
	.anim-section { animation: fadeInUp 0.6s ease-out both; }

	.card-hover {
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}
	.card-hover:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="anim-intro mb-12">
	<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">Ghiduri și Resurse</h1>
	<div class="w-10 h-0.5 bg-blue mt-3 mb-6 rounded-sm" aria-hidden="true"></div>
	<p class="text-text-muted max-w-2xl leading-relaxed">
		Informații practice și ghiduri detaliate pentru tinerii basarabeni din România — de la admitere
		și acte de ședere, până la implicare civică și finanțări.
	</p>
</div>

{#each resurseCategorii as category, i}
	<section id={category.id} class="mb-14">
		<h2 class="text-xl font-bold tracking-tight text-text mb-6">{category.label}</h2>
		<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{#each category.items as item}
				<a
					href="/ghiduri/{item.slug}"
					class="group card-hover block bg-white rounded-xl border border-bg-alt p-5 no-underline"
				>
					<h3 class="font-semibold text-text group-hover:text-oxford transition-colors">
						{item.title}
					</h3>
					<p class="text-sm text-text-muted mt-2 leading-relaxed">{item.description}</p>
					<span class="inline-flex items-center gap-1 text-xs font-medium text-blue mt-3 group-hover:gap-1.5 transition-all">
						Citește mai mult
						<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</span>
				</a>
			{/each}
		</div>
	</section>
{/each}
