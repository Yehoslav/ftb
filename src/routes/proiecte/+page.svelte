<script lang="ts">
	import { categorii } from '$lib/data/proiecte';
</script>

<svelte:head>
	<title>Proiecte — FTB România</title>
</svelte:head>

<div class="mx-auto px-4 py-12 lg:w-300">
	<h1 class="text-3xl font-bold text-oxford mb-8">Proiecte</h1>

	{#each categorii as { nume, proiecte }}
		<section class="mb-12">
			<h2 class="text-xl font-semibold text-oxford-light mb-6">{nume}</h2>

			<div class="flex flex-col gap-6">
				{#each proiecte as proiect}
					<article class="bg-white rounded-lg border border-bg-alt p-6">
						<h3 class="text-lg font-bold text-text mb-2">{proiect.titlu}</h3>

						<div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-muted mb-3">
							<span>
								<i class="fa-regular fa-calendar mr-1"></i>{proiect.perioada}
							</span>
							{#if proiect.finantator}
							<span>
								<i class="fa-solid fa-building mr-1"></i>{proiect.finantator}
							</span>
							{/if}
						</div>

						<p class="text-text leading-relaxed mb-4">{proiect.descriere}</p>

						{#if proiect.activitati.length > 0}
							<h4 class="font-semibold text-sm text-text mb-2">Activități:</h4>
							<ul class="list-disc list-inside text-sm text-text-muted mb-4 space-y-1">
								{#each proiect.activitati as activitate}
									<li>{activitate}</li>
								{/each}
							</ul>
						{/if}

						<div class="flex flex-wrap gap-4 text-xs text-text-muted border-t border-bg-alt pt-3">
							{#if proiect.beneficiari}
								<span><strong>Beneficiari:</strong> {proiect.beneficiari}</span>
							{/if}
							{#if proiect.voluntari}
								<span><strong>Voluntari:</strong> {proiect.voluntari}</span>
							{/if}
							{#if proiect.parteneri}
								<span><strong>Parteneri:</strong> {proiect.parteneri}</span>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/each}
</div>
