<script lang="ts">
	import type { Volatility } from '$lib/data/resurse';

	interface Props {
		volatility: Volatility;
		date: string;
		modified?: string | null;
		officialSource?: { label: string; url: string };
		slug?: string;
	}

	let { volatility, date, modified, officialSource, slug }: Props = $props();

	const fmt = new Intl.DateTimeFormat('ro', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	function formatDate(d: string | null | undefined): string | null {
		if (!d) return null;
		try {
			return fmt.format(new Date(d));
		} catch {
			return null;
		}
	}

	let pubDate = $derived(formatDate(date));
	let modDate = $derived(formatDate(modified));
</script>

<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-text-muted">
	{#if pubDate}
		<span>
			<time datetime={date}>
				{#if volatility === 'timeless'}
					Publicat la {pubDate}
				{:else}
					Actualizat la {modDate ?? pubDate}
				{/if}
			</time>
		</span>
		<span aria-hidden="true">•</span>
	{/if}

	{#if volatility === 'timeless' && modDate && pubDate && modDate !== pubDate}
		<span class="text-text-muted">
			<time datetime={modified!}>Actualizat la {modDate}</time>
		</span>
		<span aria-hidden="true">•</span>
	{/if}

	{#if volatility === 'critical'}
		<div class="w-full mt-2 rounded-lg border border-sunglow/60 bg-sunglow/10 px-4 py-3">
			<div class="flex items-start gap-2.5">
				<i class="fa-solid fa-triangle-exclamation text-sunglow mt-0.5" aria-hidden="true"></i>
				<div class="space-y-2">
					<p class="text-sm font-medium text-text leading-snug">
						Atenție: informațiile de pe această pagină pot fi depășite.
						Verifică cu sursa oficială înainte de a lua decizii.
					</p>

					{#if officialSource}
						<a
							href={officialSource.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-oxford no-underline"
						>
							<i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i>
							<span>Vezi pe {officialSource.label}</span>
						</a>
					{/if}

					{#if slug}
						<a
							href="/contact?intent=informatii-invechite&ghid={slug}"
							class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text no-underline"
						>
							<i class="fa-solid fa-flag text-xs" aria-hidden="true"></i>
							<span>Semnalează informații învechite</span>
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
