<script lang="ts">
	import type { PageProps } from './$types';
	import { etichetaStare } from '$lib/data/proiecte';

	let { data }: PageProps = $props();
	const { hub, editii, editieCurenta, posturi, evenimente } = data;

	function formatData(dataIso: string): string {
		return new Date(dataIso).toLocaleDateString('ro', { day: 'numeric', month: 'long', year: 'numeric' });
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
	.anim-list  { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.25s; }

	.related-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.related-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-hero, .anim-body, .anim-list { animation: none; }
		.related-card:hover { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<a href="/proiecte" class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors mb-8 no-underline">
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Toate proiectele
	</a>

	<div class="anim-hero">
		<div class="flex flex-wrap items-center gap-2 mb-4">
			<span class="inline-flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1 rounded-full" style="background-color: {hub.culoare}">
				{hub.categorie === 'anuale' ? 'Proiect anual' : 'Proiect singular'}
			</span>
			{#each hub.domenii as domeniu}
				<span class="inline-flex items-center text-xs text-text-muted bg-bg-alt border border-bg-alt px-3 py-1 rounded-full">
					{domeniu}
				</span>
			{/each}
		</div>

		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">{hub.titlu}</h1>
		<div class="w-10 h-0.5 rounded-sm mt-3 mb-6" style="background-color: {hub.culoare}" aria-hidden="true"></div>

		{#if hub.imagine}
			<img
				src={hub.imagine}
				alt={hub.titlu}
				class="w-full rounded-xl object-cover max-h-96 mb-8"
				loading="eager"
				decoding="async"
			/>
		{/if}

		<p class="text-text leading-relaxed max-w-3xl">{hub.descriere}</p>

		{#if hub.website}
			<a
				href={hub.website}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-blue hover:text-oxford transition-colors no-underline mt-4"
			>
				<i class="fa-solid fa-arrow-up-right-from-square text-sm" aria-hidden="true"></i>
				Website-ul proiectului
			</a>
		{/if}
	</div>

	{#if editieCurenta}
		<section class="anim-body mt-12">
			<div class="bg-white rounded-xl border border-bg-alt p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
				<div class="flex-1 min-w-0">
					<div class="flex flex-wrap items-center gap-2 mb-2">
						<h2 class="text-xl font-bold text-text tracking-tight">Ediția curentă: {editieCurenta.titlu}</h2>
						<span
							class="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full"
							style="color: {hub.culoare}; background-color: {hub.culoare}1a"
						>
							{etichetaStare(editieCurenta.stare)}
						</span>
					</div>
					<p class="text-sm text-text-muted mb-3 flex items-center gap-1.5">
						<i class="fa-regular fa-calendar text-blue" aria-hidden="true"></i>
						{editieCurenta.perioada}
					</p>
					<p class="text-text leading-relaxed text-sm">{editieCurenta.descriere}</p>
				</div>
				<div class="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
					<a
						href="/proiecte/{hub.slug}/{editieCurenta.slug}"
						class="inline-flex items-center justify-center gap-2 bg-blue text-white px-5 py-3 rounded-xl font-medium hover:bg-oxford transition-colors no-underline"
					>
						Vezi ediția {editieCurenta.an}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					{#if editieCurenta.registrationUrl}
						<a
							href={editieCurenta.registrationUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 bg-white text-text border border-bg-alt px-5 py-3 rounded-xl font-medium hover:bg-bg transition-colors no-underline"
						>
							Înscrie-te
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	{#if editii.length > 1}
		<section class="anim-list mt-12">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold text-text tracking-tight">Arhiva edițiilor</h2>
				<a href="/proiecte/{hub.slug}/arhiva" class="text-sm text-blue hover:text-oxford transition-colors no-underline">
					Vezi toate →
				</a>
			</div>
			<div class="flex flex-col divide-y divide-bg-alt border border-bg-alt rounded-xl bg-white">
				{#each editii as editie}
					<a
						href="/proiecte/{hub.slug}/{editie.slug}"
						class="flex items-center gap-4 px-5 py-4 no-underline hover:bg-bg-alt transition-colors rounded-xl"
					>
						<span class="text-lg font-bold text-text w-12 shrink-0">{editie.an}</span>
						<span class="flex-1 min-w-0">
							<span class="block text-sm font-medium text-text truncate">{editie.titlu}</span>
							<span class="block text-xs text-text-muted">{editie.perioada}</span>
						</span>
						<span class="shrink-0 text-xs font-medium px-3 py-1 rounded-full" style="color: {hub.culoare}; background-color: {hub.culoare}1a">
							{etichetaStare(editie.stare)}
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if evenimente.length > 0}
		<section class="anim-list mt-12">
			<h2 class="text-xl font-bold text-text tracking-tight mb-4">Evenimente</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each evenimente as ev}
					<a
						href="/evenimente/{ev.slug}"
						class="related-card bg-white rounded-xl border border-bg-alt p-5 no-underline block"
					>
						<p class="text-xs text-text-muted uppercase tracking-wide mb-1">
							{formatData(ev.date)}
						</p>
						<h3 class="font-bold text-text leading-snug mb-2">{ev.title}</h3>
						{#if ev.location}
							<p class="text-sm text-text-muted flex items-center gap-1.5">
								<i class="fa-solid fa-location-dot text-blue text-xs" aria-hidden="true"></i>
								{ev.location}
							</p>
						{/if}
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if posturi.length > 0}
		<section class="anim-list mt-12">
			<h2 class="text-xl font-bold text-text tracking-tight mb-4">Din noutăți</h2>
			<div class="flex flex-col divide-y divide-bg-alt border border-bg-alt rounded-xl bg-white">
				{#each posturi as post}
					<a
						href="/noutati/{post.slug}"
						class="flex items-start gap-4 px-5 py-4 no-underline hover:bg-bg-alt transition-colors rounded-xl"
					>
						{#if post.featuredImage?.node?.sourceUrl}
							<img
								src={post.featuredImage.node.sourceUrl}
								alt=""
								class="w-16 h-16 rounded-lg object-cover shrink-0"
								loading="lazy"
								decoding="async"
							/>
						{/if}
						<span class="flex-1 min-w-0">
							<span class="block text-sm font-medium text-text leading-snug">{post.title}</span>
							<span class="block text-xs text-text-muted mt-1">{formatData(post.date)}</span>
						</span>
						<span class="shrink-0 text-text-muted self-center" aria-hidden="true">→</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>
