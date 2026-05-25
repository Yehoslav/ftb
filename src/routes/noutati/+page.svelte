<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};
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

	<div class="anim-posts flex flex-col gap-6 max-w-4xl mx-auto">
		{#each data.posts as post}
			{@const url = `/noutati/${post.slug}`}

			<article class="post-card flex flex-col sm:flex-row gap-0 bg-white rounded-xl border border-bg-alt overflow-hidden">
				{#if post.featuredImage?.node?.sourceUrl}
					<a href={url} class="block sm:w-72 shrink-0 h-56 sm:h-auto overflow-hidden">
						<img
							class="w-full h-full object-cover transition duration-500 hover:scale-105"
							src={post.featuredImage.node.sourceUrl}
							alt=""
						/>
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

	{#if data.pageInfo?.hasNextPage}
		<nav class="mt-10 flex justify-center">
			<a
				href="?after={data.pageInfo?.endCursor ?? ''}"
				class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white transition-colors duration-300"
			>
				Articole mai vechi
			</a>
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
