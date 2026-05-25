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

<div class="mx-auto w-full max-w-screen-xl px-4 py-12">
	<h1 class="text-3xl font-bold text-oxford mb-2">Organizații Membre</h1>
	<p class="text-text-muted mb-8">Federația Tinerilor Basarabeni reunește {membri.length} de asociații studențești din toată România.</p>

	{#each sectiuni as { titlu, cheie }}
		{@const filtrati = membri.filter((m) => m.categorii.includes(cheie))}
		{#if filtrati.length > 0}
			<section class="mb-10">
				<h2 class="text-xl font-semibold text-oxford-light mb-4">{titlu} ({filtrati.length})</h2>

				<div class="flex flex-col gap-4">
					{#each filtrati as membru}
						<article class="bg-white rounded-lg border border-bg-alt p-5">
							<div class="flex items-start justify-between gap-4">
								<div class="min-w-0">
									<h3 class="font-bold text-text">{membru.abreviere} — {membru.nume}</h3>
									<p class="text-xs text-text-muted mt-0.5">
										{membru.oras}, jud. {membru.judet}
									</p>
								</div>
							</div>

							<div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-text-muted">
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
								<p class="mt-2 text-xs text-text-muted">
									<i class="fa-solid fa-location-dot mr-1"></i>{membru.adresa}
								</p>
							{/if}

							{#if membru.socialLinks}
								<div class="mt-2 flex gap-3">
									{#each Object.entries(membru.socialLinks) as [platform, url]}
										<a
											href={url}
											target="_blank"
											class="text-sm text-text-muted hover:text-oxford no-underline transition-colors"
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
