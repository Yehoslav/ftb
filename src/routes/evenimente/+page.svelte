<script lang="ts">
	import type { PageProps } from './$types';
	import type { Eveniment } from '$lib/data/evenimente';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { esteTrecut, sorteazaEvenimente } from '$lib/data/evenimente';

	let { data }: PageProps = $props();

	const locale = 'ro';
	const dayOpts: Intl.DateTimeFormatOptions = { day: 'numeric' };

	function dataCompleta(dateStr: string): string {
		return new Date(dateStr).toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
	}

	const LIMIT = 5;

	const sorted = $derived(sorteazaEvenimente(data.evenimente));
	const upcoming = $derived(sorted.filter((e) => !esteTrecut(e)));
	const shownUpcoming = $derived(Math.min(LIMIT, upcoming.length));
	const hasHidden = $derived(shownUpcoming > 0 && shownUpcoming < sorted.length);

	let showAll = $state(false);

	const visible = $derived(hasHidden && !showAll ? upcoming.slice(0, shownUpcoming) : sorted);

	interface TimelineEntry {
		monthKey: string;
		monthLabel: string;
		isNewMonth: boolean;
		past: boolean;
		event: Eveniment;
	}

	const timeline: TimelineEntry[] = $derived(
		visible.map((event, i, arr) => {
			const monthKey = event.date.slice(0, 7);
			const prevKey = i > 0 ? arr[i - 1].date.slice(0, 7) : null;
			const d = new Date(event.date);
			return {
				monthKey,
				monthLabel: `${d.toLocaleString(locale, { month: 'long' })} ${d.toLocaleString(locale, { year: 'numeric' })}`,
				isNewMonth: monthKey !== prevKey,
				past: esteTrecut(event),
				event
			};
		})
	);
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-item  { animation: fadeInUp 0.6s ease-out both; }

	.card-hover {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.card-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}

	.tl-item::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 28px;
		width: 32px;
		height: 1px;
		background-color: var(--color-bg-alt);
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-intro, .anim-item { animation: none; }
		.card-hover:hover { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro
		title="Evenimente"
		lede="Evenimente organizate de FTB România și partenerii săi pentru tinerii basarabeni."
		class="mb-12"
	/>

	{#if sorted.length === 0}
		<div class="bg-bg-alt rounded-xl p-8 border border-bg-alt text-center">
			<p class="text-text-muted">Nu există evenimente programate momentan.</p>
		</div>
	{:else}
		<ol class="relative max-w-3xl mx-auto">
			<div class="absolute left-[5px] top-1 bottom-1 w-0.5 bg-bg-alt" aria-hidden="true"></div>

			{#each timeline as entry, i (entry.event.title)}
				{#if entry.isNewMonth}
					<li class="relative pl-12 mb-6 mt-2">
						<span class="absolute left-[5px] top-1.5 w-4 h-4 rounded-full bg-oxford -translate-x-1/2" aria-hidden="true"></span>
						<h2 class="text-sm font-bold uppercase tracking-wide text-text-muted">{entry.monthLabel}</h2>
					</li>
				{/if}

				<li class="tl-item relative pl-12 mb-6 anim-item" style={`animation-delay: ${i * 0.06}s`}>
					<span class="absolute left-[5px] top-6 w-3 h-3 rounded-full {entry.past ? 'bg-text-muted' : 'bg-blue'} -translate-x-1/2 ring-4 ring-bg" aria-hidden="true"></span>

					<article class="card-hover bg-white rounded-xl border border-bg-alt p-5 lg:p-6">
						<div class="flex items-start gap-4">
							<div class="shrink-0 w-14 h-14 rounded-lg {entry.past ? 'bg-bg-alt text-text-muted' : 'bg-blue-light text-blue'} flex flex-col items-center justify-center leading-tight">
								{#if entry.event.dateEnd}
									{@const start = new Date(entry.event.date)}
									{@const end = new Date(entry.event.dateEnd)}
									{#if start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()}
										<span class="text-lg font-bold">{start.toLocaleString(locale, dayOpts)}</span>
										<span class="text-xs font-medium uppercase">– {end.toLocaleString(locale, dayOpts)} {end.toLocaleString(locale, { month: 'short' })}</span>
									{:else}
										<span class="text-xs font-bold uppercase">{start.toLocaleString(locale, { month: 'short' })}</span>
										<span class="text-[10px] font-medium uppercase">→ {end.toLocaleString(locale, { month: 'short' })}</span>
									{/if}
								{:else}
									<span class="text-lg font-bold">{new Date(entry.event.date).toLocaleString(locale, dayOpts)}</span>
									<span class="text-xs font-medium uppercase">{new Date(entry.event.date).toLocaleString(locale, { month: 'short' })}</span>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<h3 class="font-semibold text-text leading-snug">
										<a href="/evenimente/{entry.event.slug}" class="no-underline hover:text-blue transition-colors">{entry.event.title}</a>
									</h3>
									{#if entry.past}
										<span class="text-xs font-medium text-text-muted bg-bg-alt px-2 py-0.5 rounded-full shrink-0">Trecut</span>
									{/if}
								</div>
								{#if entry.event.location}
									<p class="text-sm text-text-muted mt-1 flex items-center gap-1.5">
										<i class="fa-solid fa-location-dot text-blue text-xs" aria-hidden="true"></i>
										{entry.event.location}
									</p>
								{/if}
							</div>
						</div>

						<p class="text-sm text-text-muted mt-4 leading-relaxed">
							{entry.event.description.length > 140 ? entry.event.description.slice(0, 140) + '…' : entry.event.description}
						</p>

						<div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
							{#if entry.event.dateEnd}
								<p class="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-text bg-bg-alt border border-bg-alt rounded-lg px-3 py-1.5">
									<i class="fa-regular fa-calendar text-blue" aria-hidden="true"></i>
									<span>{dataCompleta(entry.event.date)}</span>
									<i class="fa-solid fa-arrow-right text-text-muted text-[10px]" aria-hidden="true"></i>
									<span class="font-bold">{dataCompleta(entry.event.dateEnd)}</span>
								</p>
							{/if}
							{#if entry.event.registrationUrl}
								<a
									href={entry.event.registrationUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-oxford transition-colors"
								>
									Participă
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
							{/if}
						</div>
					</article>
				</li>
			{/each}
		</ol>

		{#if hasHidden}
			<div class="flex justify-center mt-10">
				<button
					onclick={() => (showAll = !showAll)}
					aria-expanded={showAll}
					class="inline-flex items-center gap-2 text-sm font-medium text-blue hover:text-oxford transition-colors bg-white border border-bg-alt rounded-xl px-5 py-3 hover:bg-bg"
				>
					<i class="fa-solid {showAll ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs" aria-hidden="true"></i>
					{showAll ? 'Arată mai puțin' : `Vezi toate evenimentele (${sorted.length})`}
				</button>
			</div>
		{/if}
	{/if}
</div>
