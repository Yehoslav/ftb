<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	let { data }: PageProps = $props();
	const ev = data.event!;
	const { proiect, siblingEvents } = data;
	const locale = 'ro';
	const monthOpts: Intl.DateTimeFormatOptions = { month: 'long' };
	const dayOpts: Intl.DateTimeFormatOptions = { day: 'numeric' };
	const yearOpts: Intl.DateTimeFormatOptions = { year: 'numeric' };

	let calOpen = $state(false);

	function formatFull(dateStr: string): string {
		const d = new Date(dateStr);
		return `${d.toLocaleString(locale, dayOpts)} ${d.toLocaleString(locale, monthOpts)} ${d.toLocaleString(locale, yearOpts)}`;
	}

	function toIcsDatetime(dateStr: string): string {
		return new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
	}

	function googleCalUrl(): string {
		const start = toIcsDatetime(ev.date);
		const end = toIcsDatetime(ev.dateEnd || ev.date);
		const params = new URLSearchParams({
			action: 'TEMPLATE',
			text: ev.title,
			dates: `${start}/${end}`,
			details: ev.description,
			location: ev.location
		});
		return `https://www.google.com/calendar/render?${params}`;
	}

	function outlookUrl(): string {
		const start = toIcsDatetime(ev.date);
		const end = toIcsDatetime(ev.dateEnd || ev.date);
		const params = new URLSearchParams({
			rru: 'addevent',
			summary: ev.title,
			startdate: start,
			enddate: end,
			description: ev.description,
			location: ev.location
		});
		return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
	}

	function downloadIcs() {
		const start = toIcsDatetime(ev.date);
		const end = toIcsDatetime(ev.dateEnd || ev.date);
		const escaped = (s: string) => s.replace(/\n/g, '\\n').replace(/[;,]/g, '\\$&');
		const ics = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//FTB Romania//Evenimente//RO',
			'BEGIN:VEVENT',
			`DTSTART:${start}`,
			`DTEND:${end}`,
			`SUMMARY:${escaped(ev.title)}`,
			`DESCRIPTION:${escaped(ev.description)}`,
			`LOCATION:${escaped(ev.location)}`,
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\r\n');
		const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${ev.slug}.ics`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function fullSizeUrl(thumb: string): string {
		return thumb.replace(/-\d+x\d+(?=\.[^.]+$)/, '');
	}
</script>

<svelte:window
	onclick={(e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (calOpen && !target.closest('[data-cal-popup]')) {
			calOpen = false;
		}
	}}
/>

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

	.related-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.related-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-hero, .anim-body, .anim-side, .anim-gallery { animation: none; }
		.gallery-img:hover { transform: none; }
		.stat-card:hover { transform: none; }
		.related-card:hover { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<a href="/evenimente" class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors mb-8 no-underline">
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Toate evenimentele
	</a>

	<div class="flex flex-col lg:flex-row gap-10 lg:gap-16">
		<div class="flex-1 min-w-0">
			{#if ev.image}
				<div class="anim-hero mb-8">
					<img
						src={ev.image}
						alt={ev.title}
						class="w-full rounded-xl object-cover max-h-96"
						loading="eager"
						decoding="async"
					/>
				</div>
			{/if}

			<div class="anim-body">
				<div class="flex items-start gap-4 mb-4">
					<div class="shrink-0 w-16 h-16 rounded-xl bg-blue-light text-blue flex flex-col items-center justify-center leading-tight">
						<span class="text-2xl font-bold">{new Date(ev.date).toLocaleString(locale, dayOpts)}</span>
						<span class="text-xs font-medium uppercase">{new Date(ev.date).toLocaleString(locale, { month: 'short' })}</span>
					</div>
					<div>
						<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">{ev.title}</h1>
						{#if ev.duration}
							<p class="text-sm text-text-muted mt-1">
								<i class="fa-regular fa-calendar text-blue mr-1.5" aria-hidden="true"></i>
								{ev.duration}
							</p>
						{/if}
						{#if ev.location}
							<p class="text-sm text-text-muted mt-0.5 flex items-center gap-1.5">
								<i class="fa-solid fa-location-dot text-blue text-xs" aria-hidden="true"></i>
								{ev.location}
							</p>
						{/if}
					</div>
				</div>

				{#if ev.dateEnd}
					<p class="text-sm text-text-muted mb-6 inline-flex flex-wrap items-center gap-x-2">
						<i class="fa-regular fa-calendar-plus text-blue" aria-hidden="true"></i>
						<span>{formatFull(ev.date)}</span>
						<i class="fa-solid fa-arrow-right text-text-muted text-[10px]" aria-hidden="true"></i>
						<span class="font-medium text-text">{formatFull(ev.dateEnd)}</span>
					</p>
				{/if}

				<div class="w-10 h-0.5 bg-blue mb-6 rounded-sm" aria-hidden="true"></div>

				<p class="text-text leading-relaxed mb-8">{ev.description}</p>

				{#if ev.financedBy}
					<p class="text-sm text-text-muted mb-8">
						<i class="fa-solid fa-building-columns text-blue mr-1.5" aria-hidden="true"></i>
						<strong class="text-text">Finanțat de</strong>{' '}
						<a href={ev.financedBy.url} target="_blank" rel="noopener noreferrer" class="text-blue hover:text-oxford transition-colors">
							{ev.financedBy.label}
						</a>
					</p>
				{/if}

				{#if ev.activities.length > 0}
					<section class="mb-8">
						<h2 class="text-xl font-bold text-text tracking-tight mb-4">Activități</h2>
						<ol class="space-y-2">
							{#each ev.activities as activity, i}
								<li class="flex items-start gap-3 text-text leading-relaxed">
									<span class="shrink-0 w-6 h-6 rounded-full bg-blue-light text-blue text-xs font-bold flex items-center justify-center mt-0.5">
										{i + 1}
									</span>
									<span class="text-sm">{activity}</span>
								</li>
							{/each}
						</ol>
					</section>
				{/if}

				{#if ev.stats.length > 0}
					<section class="mb-8">
						<h2 class="text-xl font-bold text-text tracking-tight mb-4">Statistici</h2>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{#each ev.stats as stat}
								<div class="stat-card bg-bg-alt rounded-xl p-4 border border-bg-alt">
									<p class="text-lg font-bold text-blue">{stat.value}</p>
									<p class="text-xs text-text-muted mt-0.5">{stat.label}</p>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if ev.registrationUrl}
					<div class="mt-10 pt-8 border-t border-bg-alt">
						<a
							href={ev.registrationUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-xl font-medium hover:bg-oxford transition-colors no-underline"
						>
							Participă la eveniment
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</div>
				{/if}
			</div>

			{#if ev.gallery.length > 0}
				<div class="anim-gallery mt-12 pt-8 border-t border-bg-alt">
					<h2 class="text-xl font-bold text-text tracking-tight mb-4">Galerie</h2>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
						{#each ev.gallery as img}
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
				<h3 class="text-sm font-bold text-text tracking-tight uppercase mb-4">Detalii Eveniment</h3>

				<div class="space-y-4">
					<div>
						<p class="text-xs text-text-muted uppercase tracking-wide">{ev.dateEnd ? 'Perioadă' : 'Dată'}</p>
						<p class="text-sm font-medium text-text mt-0.5">
							{formatFull(ev.date)}
							{#if ev.dateEnd}
								<span class="text-text-muted font-normal"> – </span>
								<span>{formatFull(ev.dateEnd)}</span>
							{/if}
						</p>
					</div>

					{#if ev.location}
						<div>
							<p class="text-xs text-text-muted uppercase tracking-wide">Locație</p>
							<p class="text-sm font-medium text-text mt-0.5">{ev.location}</p>
						</div>
					{/if}

					{#if ev.email}
						<div>
							<p class="text-xs text-text-muted uppercase tracking-wide">Email</p>
							<a href="mailto:{ev.email}" class="text-sm text-blue hover:text-oxford transition-colors no-underline mt-0.5 block">
								{ev.email}
							</a>
						</div>
					{/if}

					{#if ev.phone}
						<div>
							<p class="text-xs text-text-muted uppercase tracking-wide">Telefon</p>
							<a href="tel:{ev.phone}" class="text-sm text-blue hover:text-oxford transition-colors no-underline mt-0.5 block">
								{ev.phone}
							</a>
						</div>
					{/if}

					{#if ev.registrationUrl}
						<div class="pt-3 border-t border-bg-alt">
							<a
								href={ev.registrationUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 bg-blue text-white w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-oxford transition-colors no-underline"
							>
								Book A Seat
							</a>
						</div>
					{/if}

					<div class="pt-3 border-t border-bg-alt">
						<div class="relative" data-cal-popup="true">
							<button
								onclick={() => (calOpen = !calOpen)}
								aria-haspopup="true"
								aria-expanded={calOpen}
								class="flex items-center justify-center gap-2 bg-white text-text w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-bg-alt hover:bg-bg transition-colors"
							>
								<i class="fa-regular fa-calendar-plus text-blue" aria-hidden="true"></i>
								Adaugă în Calendar
							</button>
							{#if calOpen}
								<div class="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg border border-bg-alt shadow-lg py-1 z-50">
									<a
										href={googleCalUrl()}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-bg-alt no-underline transition-colors"
										onclick={() => (calOpen = false)}
									>
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 2.5A1.5 1.5 0 019 1h6a1.5 1.5 0 011.5 1.5V4H19a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2.5V2.5zM9 4h6V2.5H9V4zM5 8v11h14V8H5zm4 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z"/></svg>
										Google Calendar
									</a>
									<a
										href={outlookUrl()}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-bg-alt no-underline transition-colors"
										onclick={() => (calOpen = false)}
									>
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
										Outlook
									</a>
									<button
										onclick={() => { downloadIcs(); calOpen = false; }}
										class="flex items-center gap-2 w-full px-4 py-2 text-sm text-text hover:bg-bg-alt transition-colors text-left"
									>
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
										Download .ics
									</button>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</aside>
	</div>

	{#if proiect && siblingEvents.length > 0}
		<div class="anim-gallery mt-16 pt-8 border-t border-bg-alt">
			<div class="flex flex-wrap items-baseline justify-between gap-2 mb-6">
				<h2 class="text-xl font-bold text-text tracking-tight">Toate evenimentele — {proiect.titlu}</h2>
				<a href="/proiecte/{proiect.slug}" class="text-sm text-blue hover:text-oxford transition-colors no-underline">
					Vezi proiectul →
				</a>
			</div>

			<ol class="relative max-w-3xl">
				<div class="absolute left-[5px] top-1 bottom-1 w-0.5 bg-bg-alt" aria-hidden="true"></div>

				{#each siblingEvents as sibling}
					<li class="relative pl-12 pb-5 last:pb-0">
						<span class="absolute left-[5px] top-6 w-3 h-3 rounded-full bg-blue -translate-x-1/2 ring-4 ring-bg" aria-hidden="true"></span>

						<article class="related-card bg-white rounded-xl border border-bg-alt p-5">
							<div class="flex items-center gap-4">
								<div class="shrink-0 w-14 h-14 rounded-lg bg-blue-light text-blue flex flex-col items-center justify-center leading-tight">
									<span class="text-lg font-bold">{new Date(sibling.date).toLocaleString(locale, dayOpts)}</span>
									<span class="text-xs font-medium uppercase">{new Date(sibling.date).toLocaleString(locale, { month: 'short' })}</span>
								</div>
								<div class="min-w-0 flex-1">
									<h3 class="font-semibold text-text leading-snug">
										<a href="/evenimente/{sibling.slug}" class="no-underline hover:text-blue transition-colors">{sibling.title}</a>
									</h3>
									{#if sibling.location}
										<p class="text-sm text-text-muted mt-1 flex items-center gap-1.5">
											<i class="fa-solid fa-location-dot text-blue text-xs" aria-hidden="true"></i>
											{sibling.location}
										</p>
									{/if}
								</div>
							</div>
						</article>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>
