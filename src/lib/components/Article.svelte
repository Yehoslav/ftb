<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	interface TocItem {
		id: string;
		level: number;
		text: string;
	}

	interface BreadcrumbItem {
		href?: string;
		label: string;
	}

	interface Props {
		title: string;
		lede?: string;
		breadcrumbs?: BreadcrumbItem[];
		metadata?: Snippet;
		children: Snippet;
		toc?: TocItem[];
		activeTocId?: string;
		onTocClick?: (id: string) => void;
		sidebar?: Snippet;
		related?: Snippet;
		prose?: boolean;
	}

	let {
		title,
		lede,
		breadcrumbs,
		metadata,
		children,
		toc = [],
		activeTocId,
		onTocClick,
		sidebar,
		related,
		prose = true
	}: Props = $props();

	const headerCtx = getContext<{ readonly height: number }>('header');
	const tocTop = $derived(headerCtx?.height ?? 88);

	function handleTocClick(e: MouseEvent, id: string) {
		e.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		onTocClick?.(id);
	}
</script>

<svelte:head>
	<style>
		@keyframes art-fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.art-anim { animation: art-fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
		.art-anim-side { animation: art-fadeInUp 0.6s ease-out both; animation-delay: 0.15s; }
		@media (prefers-reduced-motion: reduce) {
			.art-anim, .art-anim-side { animation: none; }
		}

		.toc-link { transition: color 0.2s ease, border-color 0.2s ease; }
		.toc-link--active { color: var(--color-oxford); border-color: var(--color-oxford); }

		/* Shared long-form prose styles */
		:global(.prose) {
			line-height: 1.75;
			color: var(--color-text);
		}
		:global(.prose p) { margin-top: 1.25rem; }
		:global(.prose p:first-child) { margin-top: 0; }
		:global(.prose ul), :global(.prose ol) { margin-top: 1rem; }
		:global(.prose li) { margin-top: 0.25rem; }
		:global(.prose li::marker) { color: var(--color-blue); }
		:global(.prose a) {
			color: var(--color-blue);
			text-decoration: underline;
			text-decoration-color: color-mix(in oklch, var(--color-blue) 30%, transparent);
			text-underline-offset: 2px;
			transition: text-decoration-color 0.2s ease;
		}
		:global(.prose a:hover) { text-decoration-color: var(--color-blue); }
		:global(.prose h2) {
			font-size: 1.5rem;
			font-weight: 700;
			letter-spacing: -0.02em;
			color: var(--color-text);
			margin-top: 2.5rem;
			margin-bottom: 0.75rem;
			scroll-margin-top: 6rem;
		}
		:global(.prose h2:first-child) { margin-top: 0; }
		:global(.prose h3) {
			font-size: 1.125rem;
			font-weight: 600;
			color: var(--color-text);
			margin-top: 2rem;
			margin-bottom: 0.5rem;
			scroll-margin-top: 6rem;
		}
		:global(.heading-anchor) {
			position: absolute;
			left: -1.5rem;
			opacity: 0;
			color: var(--color-blue);
			text-decoration: none;
			font-weight: 400;
			font-size: 0.875em;
			transition: opacity 0.15s ease;
		}
		:global(h2:hover .heading-anchor), :global(h3:hover .heading-anchor) { opacity: 0.5; }
		:global(.heading-anchor:hover) { opacity: 1 !important; }
		:global(.prose blockquote) {
			margin-top: 1.5rem;
			margin-bottom: 1.5rem;
			padding: 0.75rem 1.25rem;
			border-left: 4px solid var(--color-blue);
			background: color-mix(in oklch, var(--color-blue) 4%, transparent);
			border-radius: 0 0.5rem 0.5rem 0;
			font-style: normal;
			color: var(--color-text);
		}
		:global(.prose blockquote p) { margin-top: 0; }
		:global(.prose blockquote p + p) { margin-top: 0.75rem; }
		:global(.prose hr) {
			margin-top: 2.5rem;
			margin-bottom: 2.5rem;
			border: 0;
			height: 1px;
			background: var(--color-bg-alt);
		}
		:global(.prose img) {
			max-width: 100%;
			height: auto;
			border-radius: 0.75rem;
			margin-block: 1.5rem;
		}
		:global(.prose .wp-block-gallery) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 0.75rem;
			margin-block: 1.5rem;
			margin-inline: 0;
			padding: 0;
		}
		:global(.prose .wp-block-gallery .wp-block-image) {
			margin: 0;
			overflow: hidden;
			border-radius: 0.75rem;
			background: var(--color-bg-alt);
		}
		:global(.prose .wp-block-gallery.is-cropped .wp-block-image) { aspect-ratio: 4 / 3; }
		:global(.prose .wp-block-gallery .wp-block-image img) {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			margin: 0;
			border-radius: 0;
		}
		:global(.prose code) {
			font-size: 0.875em;
			background: var(--color-bg-alt);
			padding: 0.15em 0.4em;
			border-radius: 0.25rem;
			font-weight: 500;
		}
		:global(.prose pre) {
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			padding: 1rem;
			border-radius: 0.75rem;
			background: var(--color-bg-alt);
			overflow-x: auto;
		}
		:global(.prose pre code) { background: none; padding: 0; font-size: 0.875rem; }
		:global(.prose table) {
			width: 100%;
			margin-top: 1.5rem;
			border-collapse: collapse;
			font-size: 0.9rem;
		}
		:global(.prose th), :global(.prose td) {
			padding: 0.5rem 0.75rem;
			border: 1px solid var(--color-bg-alt);
			text-align: left;
		}
		:global(.prose th) { background: var(--color-bg-alt); font-weight: 600; }
	</style>
</svelte:head>

<div class="art-anim">
	{#if breadcrumbs}
		<Breadcrumbs items={breadcrumbs} class="mb-4" />
	{/if}

	<article class="min-w-0">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4">
			{title}
		</h1>

		{#if metadata}
			<div class="mb-4">
				{@render metadata()}
			</div>
		{/if}

		{#if lede}
			<p class="text-text-muted max-w-2xl leading-relaxed mb-6">
				{lede}
			</p>
		{/if}

		<div class="w-10 h-0.5 bg-blue mb-8 rounded-sm" aria-hidden="true"></div>

		<div class="flex flex-col lg:flex-row gap-10">
			<div class="min-w-0 flex-1 max-w-3xl">
				{#if toc.length > 0}
				<details class="lg:hidden mb-8 rounded-xl border border-bg-alt bg-bg-alt/50">
					<summary class="px-4 py-3 text-sm font-semibold text-text cursor-pointer select-none rounded-xl">
						Cuprins
					</summary>
					<nav class="px-4 pb-3" aria-label="Cuprins mobil">
						<ul class="space-y-1">
							{#each toc as { id, level, text } (id)}
								<li>
									<a
										href="#{id}"
										class="block text-sm py-0.5 text-text-muted hover:text-oxford no-underline"
										class:font-medium={activeTocId === id}
										class:text-oxford={activeTocId === id}
										style="padding-left: {level === 3 ? '1rem' : '0'}"
										onclick={(e) => handleTocClick(e, id)}
									>
										{text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</details>
			{/if}

			<div class={prose ? 'prose' : ''}>
				{@render children()}
			</div>

			{#if related}
				<hr class="my-12 border-bg-alt" aria-hidden="true" />
				{@render related()}
			{/if}
		</div>

		{#if toc.length > 0 || sidebar}
			<aside class="art-anim-side lg:w-72 shrink-0 flex flex-col gap-8">
				{#if toc.length > 0}
					<div class="hidden lg:block sticky" style="top: {tocTop}px;">
						<h2 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
							Pe această pagină
						</h2>
						<nav aria-label="Cuprins">
							<ul class="space-y-1">
								{#each toc as { id, level, text } (id)}
									<li>
										<a
											href="#{id}"
											class="toc-link block text-sm py-1.5 pl-3 border-l-2 border-bg-alt text-text-muted hover:text-oxford hover:border-oxford/40 no-underline transition-colors"
											class:toc-link--active={activeTocId === id}
											style="padding-left: {level === 3 ? '1.5rem' : '0.75rem'}"
											onclick={(e) => handleTocClick(e, id)}
										>
											{text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				{/if}

				{#if sidebar}
					<div>
						{@render sidebar()}
					</div>
				{/if}
			</aside>
		{/if}
	</div>
	</article>
</div>
