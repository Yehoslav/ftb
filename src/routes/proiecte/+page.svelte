<script lang="ts">
	import { categorii } from '$lib/data/proiecte';
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-projs { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

	.proj-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}
	.proj-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Proiecte</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<div class="anim-projs space-y-16">
		{#each categorii as { nume, proiecte }}
			<section>
				<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-8">{nume}</h2>

				<div class="flex flex-col gap-6 max-w-4xl mx-auto">
					{#each proiecte as proiect}
						<article class="proj-card bg-white rounded-xl border border-bg-alt p-6 lg:p-8">
							<h3 class="text-lg font-bold text-text mb-3">{proiect.titlu}</h3>

							<div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-muted mb-4">
								<span class="inline-flex items-center gap-1.5">
									<i class="fa-regular fa-calendar text-blue"></i>{proiect.perioada}
								</span>
								{#if proiect.finantator}
								<span class="inline-flex items-center gap-1.5">
									<i class="fa-solid fa-building text-blue"></i>{proiect.finantator}
								</span>
								{/if}
							</div>

							<p class="text-text leading-relaxed mb-4">{proiect.descriere}</p>

							{#if proiect.activitati.length > 0}
								<h4 class="font-semibold text-sm text-text mb-3">Activități:</h4>
								<ul class="list-disc list-inside text-sm text-text-muted space-y-1 mb-4">
									{#each proiect.activitati as activitate}
										<li>{activitate}</li>
									{/each}
								</ul>
							{/if}

							<div class="flex flex-wrap gap-4 text-xs text-text-muted border-t border-bg-alt pt-4 mt-4">
								{#if proiect.beneficiari}
									<span class="inline-flex items-center gap-1"><span class="font-medium text-text">Beneficiari:</span> {proiect.beneficiari}</span>
								{/if}
								{#if proiect.voluntari}
									<span class="inline-flex items-center gap-1"><span class="font-medium text-text">Voluntari:</span> {proiect.voluntari}</span>
								{/if}
								{#if proiect.parteneri}
									<span class="inline-flex items-center gap-1"><span class="font-medium text-text">Parteneri:</span> {proiect.parteneri}</span>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
