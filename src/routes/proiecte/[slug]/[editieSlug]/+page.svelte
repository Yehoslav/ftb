<script lang="ts">
	import type { PageProps } from './$types';
	import { etichetaStare } from '$lib/data/proiecte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data }: PageProps = $props();
	const { hub, editie } = data;

	function fullSizeUrl(thumb: string): string {
		return thumb.replace(/-\d+x\d+(?=\.[^.]+$)/, '');
	}
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero  { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
	.anim-body  { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.15s; }
	.anim-side  { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.25s; }
	.anim-gallery { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.35s; }

	.gallery-img {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.gallery-img:hover {
		transform: scale(1.03);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
	}

	.stat-card {
		transition: transform 0.3s ease;
	}
	.stat-card:hover {
		transform: translateY(-1px);
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-hero, .anim-body, .anim-side, .anim-gallery { animation: none; }
		.gallery-img:hover { transform: none; }
		.stat-card:hover { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<Breadcrumbs
		class="mb-8"
		items={[
			{ href: '/proiecte', label: 'Proiecte' },
			{ href: `/proiecte/${hub.slug}`, label: hub.titlu },
			{ label: editie.titlu }
		]}
	/>

	<div class="flex flex-col lg:flex-row gap-10 lg:gap-16">
		<div class="flex-1 min-w-0">
			{#if editie.imagine}
				<div class="anim-hero mb-8">
					<img
						src={editie.imagine}
						alt={editie.titlu}
						class="w-full rounded-xl object-cover max-h-96"
						loading="eager"
						decoding="async"
					/>
				</div>
			{/if}

			<div class="anim-body">
				<div class="flex flex-wrap items-center gap-3 mb-3">
					<span
						class="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full"
						style="color: {hub.culoare}; background-color: {hub.culoare}1a"
					>
						{etichetaStare(editie.stare)}
					</span>
					<span class="text-xs font-medium text-text-muted bg-bg-alt border border-bg-alt px-3 py-1 rounded-full">
						{hub.categorie === 'anuale' ? 'Proiect anual' : 'Proiect singular'}
					</span>
				</div>

				<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">{editie.titlu}</h1>

				<p class="text-sm text-text-muted mt-2 flex items-center gap-1.5">
					<i class="fa-regular fa-calendar text-blue" aria-hidden="true"></i>
					{editie.perioada}
				</p>

				<div class="w-10 h-0.5 rounded-sm mt-4 mb-6" style="background-color: {hub.culoare}" aria-hidden="true"></div>

				<p class="text-text leading-relaxed mb-8">{editie.descriere}</p>

				{#if editie.finantator}
					<p class="text-sm text-text-muted mb-8">
						<i class="fa-solid fa-building-columns text-blue mr-1.5" aria-hidden="true"></i>
						<strong class="text-text">Finanțat de</strong>{' '}
						<span class="text-blue">{editie.finantator}</span>
					</p>
				{/if}

				{#if editie.activitati.length > 0}
					<section class="mb-8">
						<h2 class="text-xl font-bold text-text tracking-tight mb-4">Activități</h2>
						<ol class="space-y-2">
							{#each editie.activitati as activitate, i}
								<li class="flex items-start gap-3 text-text leading-relaxed">
									<span class="shrink-0 w-6 h-6 rounded-full bg-blue-light text-blue text-xs font-bold flex items-center justify-center mt-0.5">
										{i + 1}
									</span>
									<span class="text-sm">{activitate}</span>
								</li>
							{/each}
						</ol>
					</section>
				{/if}

				{#if editie.statistici.length > 0}
					<section class="mb-8">
						<h2 class="text-xl font-bold text-text tracking-tight mb-4">Statistici</h2>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{#each editie.statistici as stat}
								<div class="stat-card bg-bg-alt rounded-xl p-4 border border-bg-alt">
									<p class="text-lg font-bold" style="color: {hub.culoare}">{stat.value}</p>
									<p class="text-xs text-text-muted mt-0.5">{stat.label}</p>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if editie.beneficiari || editie.voluntari || editie.parteneri}
					<section class="mb-8">
						<h2 class="text-xl font-bold text-text tracking-tight mb-4">Impact</h2>
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{#if editie.beneficiari}
								<div class="bg-white rounded-xl border border-bg-alt p-4">
									<p class="text-xs text-text-muted uppercase tracking-wide mb-1">Beneficiari</p>
									<p class="text-sm font-medium text-text leading-snug">{editie.beneficiari}</p>
								</div>
							{/if}
							{#if editie.voluntari}
								<div class="bg-white rounded-xl border border-bg-alt p-4">
									<p class="text-xs text-text-muted uppercase tracking-wide mb-1">Voluntari</p>
									<p class="text-sm font-medium text-text leading-snug">{editie.voluntari}</p>
								</div>
							{/if}
							{#if editie.parteneri}
								<div class="bg-white rounded-xl border border-bg-alt p-4">
									<p class="text-xs text-text-muted uppercase tracking-wide mb-1">Parteneri</p>
									<p class="text-sm font-medium text-text leading-snug">{editie.parteneri}</p>
								</div>
							{/if}
						</div>
					</section>
				{/if}

				{#if editie.registrationUrl}
					<div class="mt-10 pt-8 border-t border-bg-alt">
						<a
							href={editie.registrationUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-xl font-medium hover:bg-oxford transition-colors no-underline"
						>
							Înscrie-te la {editie.titlu}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</div>
				{/if}
			</div>

			{#if editie.galerie.length > 0}
				<div class="anim-gallery mt-12 pt-8 border-t border-bg-alt">
					<h2 class="text-xl font-bold text-text tracking-tight mb-4">Galerie</h2>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
						{#each editie.galerie as img}
							<a href={fullSizeUrl(img)} target="_blank" rel="noopener noreferrer" class="block">
								<img
									src={img}
									alt=""
									class="gallery-img w-full rounded-lg object-cover aspect-square"
									loading="lazy"
									decoding="async"
								/>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<aside class="anim-side lg:w-72 shrink-0">
			<div class="bg-bg-alt rounded-xl border border-bg-alt p-6 sticky top-32">
				<h3 class="text-sm font-bold text-text tracking-tight uppercase mb-4">Detalii Ediție</h3>

				<div class="space-y-4">
					<div>
						<p class="text-xs text-text-muted uppercase tracking-wide">Proiect</p>
						<a href="/proiecte/{hub.slug}" class="text-sm font-medium text-blue hover:text-oxford transition-colors no-underline mt-0.5 block">
							{hub.titlu}
						</a>
					</div>

					<div>
						<p class="text-xs text-text-muted uppercase tracking-wide">Perioadă</p>
						<p class="text-sm font-medium text-text mt-0.5">{editie.perioada}</p>
					</div>

					<div>
						<p class="text-xs text-text-muted uppercase tracking-wide">An</p>
						<p class="text-sm font-medium text-text mt-0.5">{editie.an}</p>
					</div>

					<div>
						<p class="text-xs text-text-muted uppercase tracking-wide">Stare</p>
						<p class="text-sm font-medium text-text mt-0.5">{etichetaStare(editie.stare)}</p>
					</div>

					{#if editie.registrationUrl}
						<div class="pt-3 border-t border-bg-alt">
							<a
								href={editie.registrationUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 bg-blue text-white w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-oxford transition-colors no-underline"
							>
								Înscrie-te
							</a>
						</div>
					{/if}

					{#if editie.materiale.length > 0}
						<div class="pt-3 border-t border-bg-alt">
							<p class="text-xs text-text-muted uppercase tracking-wide mb-2">Materiale</p>
							<ul class="space-y-2">
								{#each editie.materiale as material}
									<li>
										<a
											href={material.url}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-2 text-sm text-blue hover:text-oxford transition-colors no-underline"
										>
											<i class="fa-solid fa-file-pdf text-xs" aria-hidden="true"></i>
											{material.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		</aside>
	</div>
</div>
