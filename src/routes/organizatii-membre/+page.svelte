<script lang="ts">
	import { membri } from '$lib/data/membre';
	import type { Membru } from '$lib/data/membre';

	const sectiuni: Array<{ titlu: string; cheie: Membru['categorii'][number]; }> = [
		{ titlu: 'Membri fondatori', cheie: 'fondator' },
		{ titlu: 'Membri activi cu drept de vot', cheie: 'activ' },
		{ titlu: 'Membri candidați', cheie: 'candidat' },
		{ titlu: 'Membri potențiali candidați', cheie: 'potential' }
	];
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero   { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-lists  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

	.org-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.org-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Organizații Membre</h1>
		<p class="text-text-muted mt-2 mb-4">Federația Tinerilor Basarabeni reunește {membri.length} de asociații studențești din toată România.</p>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<div class="anim-lists space-y-12">
		{#each sectiuni as { titlu, cheie }}
			{@const filtrati = membri.filter((m) => m.categorii.includes(cheie))}
			{#if filtrati.length > 0}
				<section>
					<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-6">{titlu} ({filtrati.length})</h2>

					<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{#each filtrati as membru}
							<article class="org-card bg-white rounded-xl border border-bg-alt p-6">
								<div class="flex items-start justify-between gap-4">
									<div class="min-w-0">
										<h3 class="font-bold text-text">{membru.abreviere} — {membru.nume}</h3>
										<p class="text-xs text-text-muted mt-0.5">
											{membru.oras}, jud. {membru.judet}
										</p>
									</div>
								</div>

								<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-text-muted">
									{#if membru.presedinte}
										<p><span class="font-medium text-text">Președinte:</span> {membru.presedinte}</p>
									{/if}
									{#if membru.telefon}
										<p><span class="font-medium text-text">Telefon:</span> {membru.telefon}</p>
									{/if}
									{#if membru.email}
										<p><span class="font-medium text-text">Email:</span> {membru.email}</p>
									{/if}
									{#if membru.dataInfiintarii}
										<p><span class="font-medium text-text">Înființată:</span> {membru.dataInfiintarii}</p>
									{/if}
								</div>

								{#if membru.adresa}
									<p class="mt-3 text-xs text-text-muted">
										<i class="fa-solid fa-location-dot mr-1 text-blue"></i>{membru.adresa}
									</p>
								{/if}

								{#if membru.socialLinks}
									<div class="mt-3 flex gap-3">
										{#each Object.entries(membru.socialLinks) as [platform, url]}
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm text-text-muted hover:text-blue no-underline transition-colors"
											>
												{platform}
											</a>
										{/each}
									</div>
								{/if}
							</article>
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	</div>
</div>
