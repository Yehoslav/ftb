<script lang="ts">
	import type { PageProps } from './$types';
	import { resurseCategorii } from '$lib/data/resurse';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	let proseEl: HTMLDivElement | undefined = $state();
	let toc = $state<Array<{ id: string; level: number; text: string }>>([]);
	let activeId = $state<string | null>(null);

	let currentCategory = $derived.by(() => {
		for (const cat of resurseCategorii) {
			if (cat.items.some((i) => i.slug === data.page.slug)) return cat;
		}
		return null;
	});

	let relatedItems = $derived.by(() => {
		if (!currentCategory) return [];
		return currentCategory.items.filter((i) => i.slug !== data.page.slug);
	});

	let readingTime = $derived.by(() => {
		const text = data.page.content.replace(/<[^>]+>/g, '');
		const words = text.split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.ceil(words / 200));
	});

	$effect(() => {
		if (!proseEl) return;

		const headings = proseEl.querySelectorAll<HTMLHeadingElement>('h2, h3');
		const items: Array<{ id: string; level: number; text: string }> = [];

		headings.forEach((h, i) => {
			const id = `toc-${i}`;
			h.id = id;
			h.style.position = 'relative';

			const anchor = document.createElement('a');
			anchor.href = `#${id}`;
			anchor.className = 'heading-anchor';
			anchor.textContent = '#';
			anchor.setAttribute('aria-hidden', 'true');
			h.prepend(anchor);

			items.push({ id, level: Number(h.tagName[1]), text: h.textContent?.replace('#', '').trim() ?? '' });
		});

		toc = items;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{ rootMargin: '-80px 0px -65% 0px' }
		);

		headings.forEach((h) => observer.observe(h));

		return () => observer.disconnect();
	});

	function handleTocClick(e: MouseEvent, id: string) {
		e.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			activeId = id;
		}
	}
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-article { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
	.anim-toc     { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.15s; }

	.toc-link { transition: color 0.2s ease, border-color 0.2s ease; }
	.toc-link--active { color: var(--color-oxford); border-color: var(--color-oxford); }
</style>
</svelte:head>

<!-- Breadcrumb -->
<nav class="text-sm text-text-muted mb-6 anim-article" aria-label="Breadcrumb">
	<a href="/ghiduri" class="hover:text-oxford transition-colors no-underline">Resurse</a>
	{#if currentCategory}
		<span class="mx-1.5" aria-hidden="true">/</span>
		<a href="/ghiduri/#{currentCategory.id}" class="hover:text-oxford transition-colors no-underline">{currentCategory.label}</a>
	{/if}
</nav>

<div class="flex flex-col lg:flex-row gap-10">
	<article class="anim-article min-w-0 flex-1 max-w-3xl">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4">{data.page.title}</h1>

		<!-- Metadata bar -->
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8 text-sm text-text-muted">
			{#if currentCategory}
				<span class="inline-flex items-center rounded-full bg-blue-light text-blue text-xs font-medium px-3 py-1 leading-normal">
					{currentCategory.label}
				</span>
			{/if}
			<span>{readingTime} min de citire</span>
			<span aria-hidden="true">•</span>
			<time>Actualizat: {new Date(data.page.date).toLocaleString('ro', dateOptions)}</time>
		</div>

		<div class="w-10 h-0.5 bg-blue mb-8 rounded-sm" aria-hidden="true"></div>

		<!-- Mobile TOC -->
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
									class:font-medium={activeId === id}
									class:text-oxford={activeId === id}
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

		<div class="prose" bind:this={proseEl}>{@html data.page.content}</div>

		<!-- Related guides -->
		{#if relatedItems.length > 0}
			<hr class="my-12 border-bg-alt" aria-hidden="true" />
			<section>
				<h2 class="text-lg font-bold tracking-tight text-text mb-4">
					{currentCategory?.label === 'Pentru studenți' ? 'Alte resurse utile' : 'Alte ghiduri din această categorie'}
				</h2>
				<div class="space-y-3">
					{#each relatedItems as item}
						<a
							href="/ghiduri/{item.slug}"
							class="block bg-white rounded-xl p-4 border border-bg-alt no-underline hover:border-blue/20 hover:shadow-sm transition-all"
						>
							<h3 class="font-medium text-text">{item.title}</h3>
							<p class="text-sm text-text-muted mt-1 leading-relaxed">{item.description}</p>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</article>

	<!-- Desktop TOC -->
	{#if toc.length > 0}
		<aside class="anim-toc hidden lg:block lg:w-56 shrink-0" aria-label="Cuprins">
			<div class="sticky top-24">
				<h2 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
					Pe această pagină
				</h2>
				<nav>
					<ul class="space-y-1">
						{#each toc as { id, level, text } (id)}
							<li>
								<a
									href="#{id}"
									class="toc-link block text-sm py-1.5 pl-3 border-l-2 border-bg-alt text-text-muted hover:text-oxford hover:border-oxford/40 no-underline transition-colors"
									class:toc-link--active={activeId === id}
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
		</aside>
	{/if}
</div>

<style>
	:global(.prose) {
		line-height: 1.75;
		color: var(--color-text);
	}
	:global(.prose p) {
		margin-top: 1.25rem;
	}
	:global(.prose p:first-child) {
		margin-top: 0;
	}
	:global(.prose ul), :global(.prose ol) {
		margin-top: 1rem;
	}
	:global(.prose li) {
		margin-top: 0.25rem;
	}
	:global(.prose li::marker) {
		color: var(--color-blue);
	}
	:global(.prose a) {
		color: var(--color-blue);
		text-decoration: underline;
		text-decoration-color: color-mix(in oklch, var(--color-blue) 30%, transparent);
		text-underline-offset: 2px;
		transition: text-decoration-color 0.2s ease;
	}
	:global(.prose a:hover) {
		text-decoration-color: var(--color-blue);
	}
	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
		scroll-margin-top: 6rem;
	}
	:global(.prose h2:first-child) {
		margin-top: 0;
	}
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
	:global(h2:hover .heading-anchor),
	:global(h3:hover .heading-anchor) {
		opacity: 0.5;
	}
	:global(.heading-anchor:hover) {
		opacity: 1 !important;
	}
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
	:global(.prose blockquote p) {
		margin-top: 0;
	}
	:global(.prose blockquote p + p) {
		margin-top: 0.75rem;
	}
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
	:global(.prose pre code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
	}
	:global(.prose table) {
		width: 100%;
		margin-top: 1.5rem;
		border-collapse: collapse;
		font-size: 0.9rem;
	}
	:global(.prose th),
	:global(.prose td) {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-bg-alt);
		text-align: left;
	}
	:global(.prose th) {
		background: var(--color-bg-alt);
		font-weight: 600;
	}
</style>
