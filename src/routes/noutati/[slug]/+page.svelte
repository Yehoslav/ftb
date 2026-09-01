<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { stripHtml } from '$lib/utils/html';
	import Article from '$lib/components/Article.svelte';

	interface LightboxImage {
		el: HTMLImageElement;
		src: string;
		alt: string;
		caption: string;
	}

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	const post = $derived(data.post);
	const relatedPosts = $derived(data.related);

	let readingTime = $derived.by(() => {
		const text = post.content.replace(/<[^>]+>/g, '');
		const words = text.split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.ceil(words / 200));
	});

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString('ro', dateOptions);
	}

	const isUpdated = $derived(
		!!post.modified && new Date(post.modified).getTime() !== new Date(post.date).getTime()
	);

	// ---- share ----
	const shareUrl = $derived(`${page.url.origin}/noutati/${post.slug}`);

	const shareLinks = $derived(
		[
			{
				label: 'Distribuie pe Facebook',
				href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
				icon: 'fa-brands fa-facebook',
				external: true
			},
			{
				label: 'Distribuie pe Telegram',
				href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
				icon: 'fa-brands fa-telegram',
				external: true
			},
			{
				label: 'Trimite pe email',
				href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`,
				icon: 'fa-solid fa-envelope',
				external: false
			}
		]
	);

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 2000);
		} catch {
			// clipboard unavailable — nothing to do
		}
	}

	// ---- image lightbox (WP galleries + inline figures) ----
	let proseEl = $state<HTMLElement | null>(null);
	let dialogEl = $state<HTMLDialogElement | null>(null);
	let images = $state<LightboxImage[]>([]);
	let index = $state(0);

	const current = $derived(images[index]);

	$effect(() => {
		if (!proseEl) return;
		images = Array.from(proseEl.querySelectorAll('img')).map((el) => {
			if (el.closest('.wp-block-gallery')) {
				// Gallery images get keyboard-accessible zoom (Enter/Space)
				el.setAttribute('tabindex', '0');
				el.setAttribute('role', 'button');
				if (!el.getAttribute('alt')) el.setAttribute('aria-label', 'Mărește imaginea');
			}
			return {
				el,
				src: el.dataset.fullUrl ?? el.currentSrc ?? el.src,
				alt: el.getAttribute('alt') ?? '',
				caption: el.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? ''
			};
		});
	});

	function openLightbox(img: HTMLImageElement) {
		const i = images.findIndex((entry) => entry.el === img);
		if (i === -1) return;
		index = i;
		dialogEl?.showModal();
	}

	function onProseClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.closest?.('a')) return; // don't hijack linked images
		const img = target.closest('img');
		if (!img) return;
		openLightbox(img);
	}

	function onProseKeydown(e: KeyboardEvent) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		const target = e.target as HTMLElement;
		const img = target.closest<HTMLImageElement>('img[role="button"]');
		if (img) {
			e.preventDefault();
			openLightbox(img);
		}
	}

	function closeLightbox() {
		dialogEl?.close();
	}

	function goPrev() {
		if (images.length === 0) return;
		index = (index - 1 + images.length) % images.length;
	}

	function goNext() {
		if (images.length === 0) return;
		index = (index + 1) % images.length;
	}

	function onLightboxKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			goPrev();
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			goNext();
		}
	}
</script>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<Article
		title={post.title}
		breadcrumbs={[
			{ href: '/noutati', label: 'Noutăți' },
			{ label: post.title }
		]}
	>
	{#snippet metadata()}
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-text-muted">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if isUpdated}
				<span aria-hidden="true">•</span>
				<span>Actualizat: {formatDate(post.modified ?? post.date)}</span>
			{/if}
			<span aria-hidden="true">•</span>
			<span>{readingTime} min de citire</span>
		</div>

		<div class="mt-5 flex flex-wrap items-center gap-2">
			<span class="text-xs font-semibold uppercase tracking-widest text-text-muted">Distribuie</span>
			{#each shareLinks as link}
				<a
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
					aria-label={link.label}
					class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-alt text-text-muted transition-colors hover:bg-blue hover:text-white"
				>
					<i class={`${link.icon} text-sm`} aria-hidden="true"></i>
				</a>
			{/each}
			<button
				type="button"
				onclick={copyLink}
				aria-label={copied ? 'Link copiat' : 'Copiază linkul articolului'}
				class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-alt text-text-muted transition-colors hover:bg-blue hover:text-white"
			>
				<i class={`fa-solid ${copied ? 'fa-check' : 'fa-link'} text-sm`} aria-hidden="true"></i>
			</button>
		</div>
	{/snippet}

	{#snippet sidebar()}
		{#if data.featuredPost}
			{@const rec = data.featuredPost}
			{@const recUrl = `/noutati/${rec.slug}`}
			{@const recExcerpt = rec.excerpt ? stripHtml(rec.excerpt) : ''}
			<section>
				<h2 class="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">Articol recomandat</h2>
				<article class="group overflow-hidden rounded-xl border border-bg-alt bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
					{#if rec.featuredImage?.node?.sourceUrl}
						<a href={recUrl} tabindex="-1" aria-hidden="true" class="block aspect-[16/9] overflow-hidden bg-bg-alt">
							<img
								src={rec.featuredImage.node.sourceUrl}
								width={rec.featuredImage.node.mediaDetails?.width ?? undefined}
								height={rec.featuredImage.node.mediaDetails?.height ?? undefined}
								alt=""
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
						</a>
					{/if}
					<div class="p-5">
						<h3 class="font-bold leading-snug text-text">
							<a href={recUrl} class="no-underline transition-colors hover:text-blue">{rec.title}</a>
						</h3>
						<time class="mt-1.5 block text-xs uppercase tracking-widest text-text-muted">{formatDate(rec.date)}</time>
						{#if recExcerpt}
							<p class="mt-2.5 text-sm leading-relaxed text-text-muted line-clamp-3">{recExcerpt}</p>
						{/if}
						<a
							href={recUrl}
							class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-oxford no-underline transition-colors hover:text-blue"
						>
							Citește articolul
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</a>
					</div>
				</article>
			</section>
		{/if}

		{#if data.evenimente.length > 0}
			<section>
				<h2 class="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">Calendarul evenimentelor</h2>
				<div class="flex flex-col gap-3">
					{#each data.evenimente as event}
						<a
							href="/evenimente/{event.slug}"
							class="group flex items-start gap-3 rounded-xl border border-bg-alt bg-white p-4 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-sm"
						>
							<div class="shrink-0 w-11 h-11 rounded-lg bg-blue-light text-blue flex flex-col items-center justify-center leading-tight text-xs">
									{#if event.dateEnd}
										{@const start = new Date(event.date)}
										{@const end = new Date(event.dateEnd)}
										{#if start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()}
											<span class="text-sm font-bold">{start.toLocaleString('ro', { day: 'numeric' })}</span>
											<span class="uppercase font-medium text-[10px] leading-none">– {end.toLocaleString('ro', { day: 'numeric' })}</span>
										{:else}
											<span class="text-sm font-bold uppercase">{start.toLocaleString('ro', { month: 'short' })}</span>
											<span class="uppercase font-medium text-[10px] leading-none">→ {end.toLocaleString('ro', { month: 'short' })}</span>
										{/if}
									{:else}
										<span class="text-sm font-bold">{new Date(event.date).toLocaleString('ro', { day: 'numeric' })}</span>
										<span class="uppercase font-medium">{new Date(event.date).toLocaleString('ro', { month: 'short' })}</span>
									{/if}
								</div>
								<div class="min-w-0 flex-1">
									<span class="block text-sm font-semibold leading-snug text-text transition-colors group-hover:text-blue">{event.title}</span>
									{#if event.location}
										<p class="mt-1 flex items-center gap-1 text-xs text-text-muted">
											<i class="fa-solid fa-location-dot text-[10px] text-blue/70" aria-hidden="true"></i>
											{event.location}
										</p>
									{/if}
								</div>
							</a>
					{/each}
				</div>
			</section>
		{/if}
	{/snippet}

	<!-- svelte-ignore a11y_no_noninteractive_element_interactions — delegation container: zoom handlers live on the images inside -->
	<div bind:this={proseEl} role="group" class="prose" onclick={onProseClick} onkeydown={onProseKeydown}>{@html post.content}</div>
</Article>

{#snippet related()}
	{#if relatedPosts.length > 0}
		<h2 class="text-2xl font-bold tracking-tight text-text mb-6">Citește în continuare</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each relatedPosts as r}
				{@const rUrl = `/noutati/${r.slug}`}
				<article class="group flex flex-col overflow-hidden rounded-xl border border-bg-alt bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
					<a href={rUrl} class="block aspect-[16/9] overflow-hidden bg-bg-alt" tabindex="-1" aria-hidden="true">
						{#if r.featuredImage?.node?.sourceUrl}
							<img
								src={r.featuredImage.node.sourceUrl}
								width={r.featuredImage.node.mediaDetails?.width ?? undefined}
								height={r.featuredImage.node.mediaDetails?.height ?? undefined}
								alt=""
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oxford to-blue">
								<i class="fa-solid fa-newspaper text-3xl text-white/25" aria-hidden="true"></i>
							</div>
						{/if}
					</a>
					<div class="flex flex-1 flex-col p-4">
						<time class="text-xs uppercase tracking-widest text-text-muted">{formatDate(r.date)}</time>
						<h3 class="mt-1.5 font-bold leading-snug text-text">
							<a href={rUrl} class="no-underline transition-colors hover:text-blue">{r.title}</a>
						</h3>
					</div>
				</article>
			{/each}
		</div>
	{/if}
{/snippet}
</div>

<dialog
	bind:this={dialogEl}
	aria-label="Galeria de imagini"
	class="m-auto w-full max-w-5xl rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-oxford-dark/70 backdrop:backdrop-blur-sm"
	onclose={closeLightbox}
	onkeydown={onLightboxKeydown}
	onclick={(e) => e.target === dialogEl && closeLightbox()}
>
	{#if current}
		<div class="relative">
			<button
				type="button"
				onclick={closeLightbox}
				aria-label="Închide galeria"
				class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg leading-none text-text shadow-md transition-colors hover:bg-white"
			>
				×
			</button>
			<figure class="m-0">
				<img
					src={current.src}
					alt={current.alt}
					class="max-h-[80vh] w-full bg-bg object-contain"
					loading="lazy"
					decoding="async"
				/>
				{#if current.caption}
					<figcaption class="border-t border-bg-alt px-6 py-4 text-center text-sm text-text-muted">
						{current.caption}
					</figcaption>
				{/if}
			</figure>

			{#if images.length > 1}
				<div class="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
					<button
						type="button"
						onclick={goPrev}
						aria-label="Imaginea anterioară"
						class="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-text shadow-md transition-colors hover:bg-white"
					>
						<i class="fa-solid fa-arrow-right rotate-180 text-sm" aria-hidden="true"></i>
					</button>
					<button
						type="button"
						onclick={goNext}
						aria-label="Imaginea următoare"
						class="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-text shadow-md transition-colors hover:bg-white"
					>
						<i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
					</button>
				</div>
				<span class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-oxford-dark/60 px-3 py-1 text-xs font-medium text-white">
					{index + 1} / {images.length}
				</span>
			{/if}
		</div>
	{/if}
</dialog>