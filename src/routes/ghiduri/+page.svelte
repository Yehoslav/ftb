<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { resurseCategorii } from '$lib/data/resurse';
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
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

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro
		title="Ghiduri și Resurse"
		lede="Informații practice și ghiduri detaliate pentru tinerii basarabeni din România — de la admitere și acte de ședere, până la implicare civică și finanțări."
		class="mb-12"
	/>

	{#each resurseCategorii as category, i}
	<section id={category.id} class="anim-section mb-14" style={`animation-delay: ${i * 0.05}s`}>
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
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</span>
				</a>
			{/each}
		</div>
	</section>
{/each}
</div>
