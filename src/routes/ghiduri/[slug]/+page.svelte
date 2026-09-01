<script lang="ts">
	import type { PageProps } from './$types';
	import { resurseCategorii, getResursaBySlug } from '$lib/data/resurse';
	import { connections } from '$lib/data/connections';
	import Article from '$lib/components/Article.svelte';
	import FreshnessStamp from '$lib/components/FreshnessStamp.svelte';
	import CrossLinks from '$lib/components/CrossLinks.svelte';

	let { data }: PageProps = $props();

	let proseEl: HTMLDivElement | undefined = $state();
	let toc = $state<Array<{ id: string; level: number; text: string }>>([]);
	let activeId = $state<string | null>(null);

	let currentItem = $derived(getResursaBySlug(data.page.slug));
	let conn = $derived(connections[data.page.slug]);

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
		const prose = proseEl;
		const _content = data.page.content;
		if (!prose) return;

		const headings = prose.querySelectorAll<HTMLHeadingElement>('h2, h3');
		const items: Array<{ id: string; level: number; text: string }> = [];

		headings.forEach((h, i) => {
			const id = `toc-${i}`;
			h.id = id;
			h.style.position = 'relative';

			const existing = h.querySelector('.heading-anchor');
			if (existing) existing.remove();

			const anchor = document.createElement('a');
			anchor.href = `#${id}`;
			anchor.className = 'heading-anchor';
			anchor.textContent = '#';
			anchor.setAttribute('aria-hidden', 'true');
			h.prepend(anchor);

			items.push({ id, level: Number(h.tagName[1]), text: h.textContent?.replace('#', '').trim() ?? '' });
		});

		toc = items;
		activeId = null;

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

	function handleTocClick(id: string) {
		activeId = id;
	}
</script>

<Article
	title={data.page.title}
	breadcrumbs={currentCategory
		? [
				{ href: '/ghiduri', label: 'Resurse' },
				{ href: `/ghiduri/#${currentCategory.id}`, label: currentCategory.label },
				{ label: data.page.title }
			]
		: [
				{ href: '/ghiduri', label: 'Resurse' },
				{ label: data.page.title }
			]}
	toc={toc}
	activeTocId={activeId ?? undefined}
	onTocClick={handleTocClick}
>
	{#snippet metadata()}
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-text-muted">
			{#if currentCategory}
				<span class="inline-flex items-center rounded-full bg-blue-light text-blue text-xs font-medium px-3 py-1 leading-normal">
					{currentCategory.label}
				</span>
			{/if}
			<span>{readingTime} min de citire</span>
			<span aria-hidden="true">•</span>
		</div>

		{#if currentItem}
			<FreshnessStamp
				volatility={currentItem.volatility}
				date={data.page.date}
				modified={data.page.modified}
				officialSource={conn?.external?.[0]}
				slug={data.page.slug}
			/>
		{/if}
	{/snippet}

	<div class="prose" bind:this={proseEl}>{@html data.page.content}</div>

	{#if conn?.nextStep || conn?.external}
		<div class="mt-10">
			<CrossLinks slug={data.page.slug} />
		</div>
	{/if}

	{#if relatedItems.length > 0}
		{#snippet related()}
			<section>
				<h2 class="text-lg font-bold tracking-tight text-text mb-4">
					{currentCategory?.label === 'Pentru studenți' ? 'Alte resurse utile' : 'Alte ghiduri din această categorie'}
				</h2>
				<div class="space-y-3">
					{#each relatedItems.slice(0, 3) as item}
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
		{/snippet}
	{/if}
</Article>
