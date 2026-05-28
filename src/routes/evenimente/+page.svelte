<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const activeEvents = data.evenimente;
	const locale = 'ro';
	const monthOpts: Intl.DateTimeFormatOptions = { month: 'long' };
	const dayOpts: Intl.DateTimeFormatOptions = { day: 'numeric' };

	function formatDate(dateStr: string, dateEnd?: string): string {
		const d = new Date(dateStr);
		const day = d.toLocaleString(locale, dayOpts);
		const month = d.toLocaleString(locale, monthOpts);
		if (dateEnd) {
			const e = new Date(dateEnd);
			if (d.getMonth() === e.getMonth() && d.getFullYear() === e.getFullYear()) {
				return `${day} – ${e.toLocaleString(locale, dayOpts)} ${month}`;
			}
			return `${day} ${month} – ${e.toLocaleString(locale, dayOpts)} ${e.toLocaleString(locale, monthOpts)}`;
		}
		return `${day} ${month}`;
	}
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-intro { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
	.anim-card  { animation: fadeInUp 0.6s ease-out both; }

	.card-hover {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.card-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-intro mb-12">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">Evenimente</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-6 rounded-sm" aria-hidden="true"></div>
		<p class="text-text-muted max-w-2xl leading-relaxed">
			Evenimente organizate de FTB România și partenerii săi pentru tinerii basarabeni.
		</p>
	</div>

	{#if activeEvents.length === 0}
		<div class="bg-bg-alt rounded-xl p-8 border border-bg-alt text-center">
			<p class="text-text-muted">Nu există evenimente programate momentan.</p>
		</div>
	{/if}

	<div class="grid gap-6 md:grid-cols-2">
		{#each activeEvents as event, i (event.title)}
			<article
				class="anim-card card-hover bg-white rounded-xl border border-bg-alt p-6 flex flex-col"
				style="animation-delay: {i * 0.08}s"
			>
				<div class="flex items-start gap-4">
					<div class="shrink-0 w-14 h-14 rounded-lg bg-blue-light text-blue flex flex-col items-center justify-center leading-tight">
						<span class="text-lg font-bold">{new Date(event.date).toLocaleString(locale, dayOpts)}</span>
						<span class="text-xs font-medium uppercase">{new Date(event.date).toLocaleString(locale, { month: 'short' })}</span>
					</div>
					<div class="min-w-0 flex-1">
						<h2 class="font-semibold text-text">{event.title}</h2>
						<p class="text-sm text-text-muted mt-1 flex items-center gap-1.5">
							<i class="fa-solid fa-location-dot text-blue text-xs" aria-hidden="true"></i>
							{event.location}
						</p>
					</div>
				</div>

				<p class="text-sm text-text-muted mt-4 leading-relaxed">{event.description}</p>

				{#if event.dateEnd}
					<p class="text-xs text-text-muted mt-3">
						<i class="fa-regular fa-calendar text-blue mr-1" aria-hidden="true"></i>
						{formatDate(event.date)} – {formatDate(event.dateEnd)}
					</p>
				{/if}

				{#if event.registrationUrl}
					<a
						href={event.registrationUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="mt-4 self-start inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-oxford transition-colors"
					>
						Participă
						<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				{/if}
			</article>
		{/each}
	</div>
</div>
