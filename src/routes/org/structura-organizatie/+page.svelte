<script lang="ts">
	import type { PageProps } from './$types';
	import PageIntro from '$lib/components/PageIntro.svelte';

	let { data }: PageProps = $props();

	const birou = data.echipa.filter((m) => m.categorie === 'birou');
	const extinsa = data.echipa.filter((m) => m.categorie === 'extinsa');

	const sectiuni: Array<{ titlu: string; cheie: 'fondator' | 'activ' | 'candidat' | 'potential' }> = [
		{ titlu: 'Membri fondatori', cheie: 'fondator' },
		{ titlu: 'Membri activi cu drept de vot', cheie: 'activ' },
		{ titlu: 'Membri candidați', cheie: 'candidat' },
		{ titlu: 'Membri potențiali candidați', cheie: 'potential' }
	];

	function initials(nume: string): string {
		return nume
			.split(' ')
			.map((c) => c[0])
			.join('');
	}
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(24px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-body  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

		.card {
			transition: transform 0.3s ease, box-shadow 0.3s ease;
		}
		.card:hover {
			transform: translateY(-2px);
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
		}
	</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro
		title="Structura organizației"
		lede="Conducerea și rețeaua de asociații ale federației, după statut. Pentru descoperirea pe orașe, vezi organizațiile studențești."
		parent={{ href: '/org', label: 'Organizație' }}
	/>

	<div class="anim-body space-y-16">
		<!-- Leadership -->
		<section>
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-8">Birou de conducere</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each birou as member}
					<div class="card bg-white rounded-xl border border-bg-alt p-8 flex flex-col items-center text-center gap-4">
						{#if member.foto}
							<img
								src={member.foto}
								alt={member.nume}
								class="w-20 h-20 rounded-full object-cover shrink-0"
								loading="lazy"
							/>
						{:else}
							<div class="w-20 h-20 rounded-full bg-blue text-white flex items-center justify-center text-xl font-bold shrink-0">
								{initials(member.nume)}
							</div>
						{/if}
						<div>
							<h3 class="font-semibold text-text text-lg">{member.nume}</h3>
							<p class="text-sm text-text-muted mt-0.5">{member.rol}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		{#if extinsa.length > 0}
			<section>
				<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-8">Echipa extinsă</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each extinsa as member}
						<div class="card bg-white rounded-xl border border-bg-alt p-8 flex flex-col items-center text-center gap-4">
							{#if member.foto}
								<img
									src={member.foto}
									alt={member.nume}
									class="w-20 h-20 rounded-full object-cover shrink-0"
									loading="lazy"
								/>
							{:else}
								<div class="w-20 h-20 rounded-full bg-blue-light text-blue flex items-center justify-center text-xl font-bold shrink-0">
									{initials(member.nume)}
								</div>
							{/if}
							<div>
								<h3 class="font-semibold text-text text-lg">{member.nume}</h3>
								<p class="text-sm text-text-muted mt-0.5">{member.rol}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Member network by status (governance) -->
		<section>
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-2">Asociații membre</h2>
			<p class="text-sm text-text-muted mb-8">
				Rețeaua federației, după statut. Pentru descoperirea pe orașe, vezi
				<a href="/organizatii-studentesti" class="text-blue no-underline hover:text-oxford">organizațiile studențești</a>.
			</p>

			<div class="space-y-12">
				{#each sectiuni as { titlu, cheie }}
					{@const filtrati = data.membri.filter((m) => m.categorii.includes(cheie))}
					{#if filtrati.length > 0}
						<section>
							<h3 class="text-lg lg:text-xl font-bold text-text tracking-tight mb-6">{titlu} ({filtrati.length})</h3>
							<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
								{#each filtrati as membru}
									<article class="card bg-white rounded-xl border border-bg-alt p-6">
										<div class="flex items-start justify-between gap-4">
											<div class="min-w-0">
												<h4 class="font-bold text-text">{membru.abreviere} — {membru.nume}</h4>
												<p class="text-xs text-text-muted mt-0.5">{membru.oras}, jud. {membru.judet}</p>
											</div>
											{#if membru.logo}
												<img
													src={membru.logo}
													alt={membru.abreviere}
													class="w-12 h-12 object-contain shrink-0"
													loading="lazy"
												/>
											{/if}
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
		</section>
	</div>
</div>
