<script lang="ts">
	import type { PageProps } from './$types';
	import type { WPPost } from '$lib/types/wp';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	let allPosts = $state<WPPost[]>(data.posts);
	let pageInfo = $state(data.pageInfo);
	let loading = $state(false);

	function toWebp(srcSet: string | null | undefined): string | undefined {
		return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, '.webp$2');
	}


	async function loadMore() {
		if (!pageInfo?.hasNextPage || loading) return;
		loading = true;
		try {
			const res = await fetch(`/api/posts?after=${pageInfo.endCursor}`);
			const json = await res.json();
			allPosts = [...allPosts, ...json.posts];
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
	.anim-hero  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
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
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Noutăți FTB</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

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

	{#if pageInfo?.hasNextPage}
		<nav class="mt-10 flex justify-center">
			<button
				onclick={loadMore}
				disabled={loading}
				class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
			>
				{loading ? 'Se încarcă...' : 'Articole mai vechi'}
			</button>
		</nav>
	{/if}
</div>

<style>
	:global(article p, article ul) {
		margin-top: 1rem;
	}
	:global(article li) {
		list-style-type: circle;
		margin-left: 2rem;
	}
	:global(article a) {
		color: var(--color-blue);
	}
</style>
