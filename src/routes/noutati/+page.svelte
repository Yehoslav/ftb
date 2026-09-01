<script lang="ts">
	import type { PageProps } from './$types';
	import type { WPPost } from '$lib/types/wp';
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

	function toWebp(srcSet: string | null | undefined): string | undefined {
		return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, '.webp$2');
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
	.anim-posts { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

	.post-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.post-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<PageIntro title="Noutăți FTB" />

	<div id="noutati-list" class="anim-posts flex flex-col gap-6 max-w-4xl mx-auto">
		{#each allPosts as post}
			{@const url = `/noutati/${post.slug}`}

			<article class="post-card flex flex-col sm:flex-row gap-0 bg-white rounded-xl border border-bg-alt overflow-hidden">
				{#if post.featuredImage?.node?.sourceUrl}
					<a href={url} class="block sm:w-72 shrink-0 h-56 sm:h-auto overflow-hidden">
						<picture>
							<source
								type="image/webp"
								srcset={toWebp(post.featuredImage.node.srcSet)}
								sizes="(max-width: 768px) 100vw, 288px"
							/>
							<img
								class="w-full h-full object-cover transition duration-500 hover:scale-105"
								src={post.featuredImage.node.sourceUrl}
								srcset={post.featuredImage.node.srcSet ?? undefined}
								sizes="(max-width: 768px) 100vw, 288px"
								width={post.featuredImage.node.mediaDetails?.width ?? undefined}
								height={post.featuredImage.node.mediaDetails?.height ?? undefined}
								alt=""
								loading="lazy"
								decoding="async"
							/>
						</picture>
					</a>
				{/if}
				<div class="p-5 lg:p-6 flex flex-col justify-center flex-1">
					<time class="text-xs text-text-muted">
						{new Date(post.date).toLocaleString('ro', dateOptions)}
					</time>
					<h2 class="font-bold text-lg mt-1.5">
						<a href={url} class="text-text hover:text-blue no-underline transition-colors">
							{post.title}
						</a>
					</h2>
					<div class="text-sm text-text-muted mt-2 line-clamp-3 leading-relaxed">{@html post.excerpt}</div>
				</div>
			</article>
		{/each}
	</div>

	<nav class="mt-10 flex justify-center gap-3">
		{#if hasOlder}
			<button
				onclick={loadNewer}
				disabled={loading}
				class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
			>
				{loading ? 'Se încarcă...' : 'Articole mai noi'}
			</button>
		{/if}
		{#if pageInfo?.hasNextPage}
			<button
				onclick={loadMore}
				disabled={loading}
				class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
			>
				{loading ? 'Se încarcă...' : 'Articole mai vechi'}
			</button>
		{/if}
	</nav>
</div>

<style>
	:global(.post-card p, .post-card ul) {
		margin-top: 1rem;
	}
	:global(.post-card li) {
		list-style-type: circle;
		margin-left: 2rem;
	}
	:global(.post-card a) {
		color: var(--color-blue);
	}
</style>
