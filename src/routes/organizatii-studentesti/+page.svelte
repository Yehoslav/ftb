<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import Placeholder from '$lib/components/Placeholder.svelte';

	let { data }: PageProps = $props();

	const orase = $derived(
		[...new Set(data.membri.map((m) => m.oras))]
			.map((oras) => ({
				oras,
				nr: data.membri.filter((m) => m.oras === oras).length
			}))
			.sort((a, b) => b.nr - a.nr || a.oras.localeCompare(b.oras, 'ro'))
	);

	const orasSelectat = $derived(
		(() => {
			const param = page.url.searchParams.get('oras');
			return param && orase.some((o) => o.oras === param) ? param : null;
		})()
	);

	const vizibile = $derived(orasSelectat ? data.membri.filter((m) => m.oras === orasSelectat) : data.membri);
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(24px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-hero  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
		.anim-lists { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

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
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Organizații studențești</h1>
		<p class="text-text-muted mt-2 mb-4 max-w-2xl leading-relaxed">
			Găsește asociația studențească din orașul unde vrei să studiezi. Alege un oraș
			universitar și descoperă comunitățile care te pot ajuta după ce ajungi în România.
		</p>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<!-- City selector -->
	<section class="anim-lists mb-10">
		<h2 class="text-sm font-semibold uppercase tracking-widest text-text-muted mb-3">Alege orașul</h2>
		<div class="flex flex-wrap gap-2">
			<a
				href="/organizatii-studentesti"
				class="rounded-full border {!orasSelectat ? 'bg-oxford border-oxford text-white' : 'border-bg-alt bg-white text-text hover:bg-bg-alt'} px-4 py-2 text-sm font-medium no-underline transition-colors"
			>
				Toate orașele
			</a>
			{#each orase as { oras, nr }}
				<a
					href="/organizatii-studentesti?oras={encodeURIComponent(oras)}"
					class="rounded-full border {orasSelectat === oras ? 'bg-oxford border-oxford text-white' : 'border-bg-alt bg-white text-text hover:bg-bg-alt'} px-4 py-2 text-sm font-medium no-underline transition-colors"
				>
					{oras} <span class="text-xs opacity-70">({nr})</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Results grouped by city -->
	<section class="anim-lists space-y-10">
		{#if orasSelectat}
			<header class="flex items-center justify-between">
				<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight">
					{vizibile.length} organizație{vizibile.length === 1 ? '' : 'i'} în {orasSelectat}
				</h2>
			</header>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each vizibile as membru}
					<article class="card bg-white rounded-xl border border-bg-alt p-6">
						<div class="flex items-start justify-between gap-4">
							<div class="min-w-0">
								<h3 class="font-bold text-text">{membru.abreviere}</h3>
								<p class="text-xs text-text-muted mt-0.5">{membru.nume}</p>
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

						<Placeholder label="O linie despre ce face această asociație pentru studenți — de completat" tone="content">
							<p class="mt-3 text-sm text-text-muted leading-relaxed">
								Asociație studențească basarabeană în {membru.oras}.
							</p>
						</Placeholder>

						<div class="mt-4 space-y-1.5 text-sm text-text-muted">
							{#if membru.email}
								<p><i class="fa-solid fa-envelope mr-1.5 text-blue"></i>{membru.email}</p>
							{/if}
							{#if membru.presedinte}
								<p><span class="font-medium text-text">Președinte:</span> {membru.presedinte}</p>
							{/if}
						</div>

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
		{:else}
			{#each orase as { oras, nr }}
				<section>
					<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-6">{oras} ({nr})</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each data.membri.filter((m) => m.oras === oras) as membru}
							<article class="card bg-white rounded-xl border border-bg-alt p-6">
								<div class="flex items-start justify-between gap-4">
									<div class="min-w-0">
										<h3 class="font-bold text-text">{membru.abreviere}</h3>
										<p class="text-xs text-text-muted mt-0.5">{membru.nume}</p>
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
								<div class="mt-4 space-y-1.5 text-sm text-text-muted">
									{#if membru.email}
										<p><i class="fa-solid fa-envelope mr-1.5 text-blue"></i>{membru.email}</p>
									{/if}
									{#if membru.presedinte}
										<p><span class="font-medium text-text">Președinte:</span> {membru.presedinte}</p>
									{/if}
								</div>
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
			{/each}
		{/if}

		<p class="rounded-lg border border-bg-alt bg-white p-4 text-xs text-text-muted leading-relaxed">
			Această pagină enumeră asociațiile membre FTB. Organizații care nu sunt membre ale
			federației dar pot ajuta studenții în anumite orașe se pot adăuga după confirmarea
			datelor și a criteriilor de includere.
		</p>
		<p class="rounded-lg border border-bg-alt bg-white p-4 text-xs text-text-muted leading-relaxed">
			Pentru structura internă a federației (conducere și statutul asociațiilor), vezi
			<a href="/org/structura-organizatie" class="text-blue no-underline hover:text-oxford transition-colors">
				Structura organizației
			</a>.
		</p>
	</section>
</div>
