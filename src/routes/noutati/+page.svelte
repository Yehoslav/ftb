<script lang="ts">
	import type { PageProps } from './$types';
	import type { WPPost } from '$lib/types/wp';
	import { stripHtml } from '$lib/utils/html';
	import PageIntro from '$lib/components/PageIntro.svelte';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	// svelte-ignore state_referenced_locally — intentional one-time init from server data
	let allPosts = $state<WPPost[]>($state.snapshot(data.posts));
	// svelte-ignore state_referenced_locally — intentional one-time init from server data
	let pageInfo = $state($state.snapshot(data.pageInfo));
	let loading = $state(false);
	let hasOlder = $state(false);

	const featured = $derived(allPosts[0]);
	const rest = $derived(allPosts.slice(1));

	function toWebp(srcSet: string | null | undefined): string | undefined {
		return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, '.webp$2');
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString('ro', dateOptions);
	}

	async function loadMore() {
		if (!pageInfo?.hasNextPage || loading) return;
		loading = true;
		try {
			const res = await fetch(`/api/posts?after=${pageInfo.endCursor}`);
			const json = await res.json();
			hasOlder = true;
			allPosts = [...allPosts, ...json.posts];
			pageInfo = json.pageInfo;
		} finally {
			loading = false;
		}
	}

	async function loadNewer() {
		if (!hasOlder || loading) return;
		loading = true;
		try {
			const res = await fetch('/api/posts');
			const json = await res.json();
			hasOlder = false;
			allPosts = json.posts;
			pageInfo = json.pageInfo;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(24px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-item { animation: fadeInUp 0.6s ease-out both; }

		.card-hover {
			transition: transform 0.3s ease, box-shadow 0.3s ease;
		}
		.card-hover:hover {
			transform: translateY(-3px);
			box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
		}

		@media (prefers-reduced-motion: reduce) {
			.anim-item { animation: none; }
			.card-hover:hover { transform: none; box-shadow: none; }
		}
	</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro
		title="Noutăți FTB"
		lede="Ultimele articole și anunțuri de la Federația Tinerilor Basarabeni — povești din proiecte, experiențe ale voluntarilor și noutăți din comunitate."
		class="mb-12"
	/>

	<p class="sr-only" aria-live="polite">{loading ? 'Se încarcă articolele…' : ''}</p>

	{#if allPosts.length === 0}
		<div class="rounded-xl border border-bg-alt bg-white p-10 text-center">
			<p class="text-text-muted">Nu există articole publicate momentan. Revino curând!</p>
		</div>
	{:else if featured}
		{@const fUrl = `/noutati/${featured.slug}`}
		{@const fExcerpt = featured.excerpt ? stripHtml(featured.excerpt) : ''}
		<article
			class="anim-item card-hover group grid overflow-hidden rounded-2xl border border-bg-alt bg-white lg:grid-cols-[1.15fr_1fr]"
			style="animation-delay: 0.05s"
		>
			<a
				href={fUrl}
				class="relative block aspect-[16/10] overflow-hidden bg-bg-alt lg:aspect-auto lg:h-full"
				tabindex="-1"
				aria-hidden="true"
			>
				{#if featured.featuredImage?.node?.sourceUrl}
					<picture>
						<source
							type="image/webp"
							srcset={toWebp(featured.featuredImage.node.srcSet)}
							sizes="(max-width: 1024px) 100vw, 55vw"
						/>
						<img
							class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
							src={featured.featuredImage.node.sourceUrl}
							srcset={featured.featuredImage.node.srcSet ?? undefined}
							sizes="(max-width: 1024px) 100vw, 55vw"
							width={featured.featuredImage.node.mediaDetails?.width ?? undefined}
							height={featured.featuredImage.node.mediaDetails?.height ?? undefined}
							alt=""
							decoding="async"
						/>
					</picture>
				{:else}
					<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oxford to-blue">
						<i class="fa-solid fa-newspaper text-5xl text-white/30" aria-hidden="true"></i>
					</div>
				{/if}
			</a>

			<div class="flex flex-col justify-center p-7 lg:p-10">
				<span class="inline-flex w-fit items-center gap-2 rounded-full bg-blue-light px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue">
					<i class="fa-solid fa-newspaper" aria-hidden="true"></i>
					Articol principal
				</span>
				<time datetime={featured.date} class="mt-5 block text-xs uppercase tracking-widest text-text-muted">
					{formatDate(featured.date)}
				</time>
				<h2 class="mt-3 text-2xl font-bold leading-snug tracking-tight text-text lg:text-3xl">
					<a href={fUrl} class="no-underline transition-colors hover:text-blue">
						{featured.title}
					</a>
				</h2>
				{#if fExcerpt}
					<p class="mt-4 max-w-prose text-base leading-relaxed text-text-muted line-clamp-3">
						{fExcerpt}
					</p>
				{/if}
				<a
					href={fUrl}
					class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-oxford no-underline transition-colors hover:text-blue"
				>
					Citește articolul
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>
		</article>
	{/if}

	<div id="noutati-list" class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
		{#each rest as post, i (post.slug)}
			{@const url = `/noutati/${post.slug}`}
			{@const excerpt = post.excerpt ? stripHtml(post.excerpt) : ''}
			<article
				class="anim-item card-hover group flex flex-col overflow-hidden rounded-xl border border-bg-alt bg-white"
				style={`animation-delay: ${Math.min(i * 0.05, 0.35)}s`}
			>
				<a href={url} class="block aspect-[16/10] overflow-hidden bg-bg-alt" tabindex="-1" aria-hidden="true">
					{#if post.featuredImage?.node?.sourceUrl}
						<picture>
							<source
								type="image/webp"
								srcset={toWebp(post.featuredImage.node.srcSet)}
								sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
							/>
							<img
								class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
								src={post.featuredImage.node.sourceUrl}
								srcset={post.featuredImage.node.srcSet ?? undefined}
								sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
								width={post.featuredImage.node.mediaDetails?.width ?? undefined}
								height={post.featuredImage.node.mediaDetails?.height ?? undefined}
								alt=""
								loading="lazy"
								decoding="async"
							/>
						</picture>
					{:else}
						<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oxford to-blue">
							<i class="fa-solid fa-newspaper text-4xl text-white/25" aria-hidden="true"></i>
						</div>
					{/if}
				</a>

				<div class="flex flex-1 flex-col p-5">
					<time datetime={post.date} class="text-xs uppercase tracking-widest text-text-muted">
						{formatDate(post.date)}
					</time>
					<h3 class="mt-2 text-lg font-bold leading-snug tracking-tight text-text">
						<a href={url} class="no-underline transition-colors hover:text-blue">
							{post.title}
						</a>
					</h3>
					{#if excerpt}
						<p class="mt-2.5 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3">
							{excerpt}
						</p>
					{/if}
					<a
						href={url}
						class="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-oxford no-underline transition-colors hover:text-blue"
					>
						Citește mai mult
						<i
							class="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-0.5"
							aria-hidden="true"
						></i>
					</a>
				</div>
			</article>
		{/each}
	</div>

	<nav class="mt-12 flex flex-wrap justify-center gap-3" aria-label="Paginare articole">
		{#if hasOlder}
			<button
				onclick={loadNewer}
				disabled={loading}
				class="inline-flex items-center gap-2 rounded-full border border-blue px-6 py-3 text-sm font-medium tracking-wide text-blue transition-all duration-300 hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
			>
				<i class="fa-solid fa-chevron-up text-xs" aria-hidden="true"></i>
				{loading ? 'Se încarcă…' : 'Articole mai noi'}
			</button>
		{/if}
		{#if pageInfo?.hasNextPage}
			<button
				onclick={loadMore}
				disabled={loading}
				class="inline-flex items-center gap-2 rounded-full border border-blue px-6 py-3 text-sm font-medium tracking-wide text-blue transition-all duration-300 hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Se încarcă…' : 'Articole mai vechi'}
				<i class="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
			</button>
		{/if}
	</nav>
</div>