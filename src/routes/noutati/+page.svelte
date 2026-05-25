<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
</script>

<div class="mx-auto w-full max-w-screen-xl px-4 py-12">
	<h1 class="text-3xl font-bold text-oxford mb-8">Noutăți FTB</h1>

	<div class="flex flex-col gap-y-6">
		{#each data.posts as post}
			{@const url = `/noutati/${post.slug}`}

			<article class="flex flex-col sm:flex-row gap-4 bg-white rounded-lg border border-bg-alt overflow-hidden">
				{#if post.featuredImage?.node?.sourceUrl}
					<a href={url} class="block sm:w-72 shrink-0 h-56 sm:h-auto overflow-hidden">
						<img
							class="w-full h-full object-cover transition hover:scale-105"
							src={post.featuredImage.node.sourceUrl}
							alt=""
						/>
					</a>
				{/if}
				<div class="p-4 flex flex-col justify-center">
					<time class="text-xs text-text-muted">
						{new Date(post.date).toLocaleString('ro', dateOptions)}
					</time>
					<h2 class="font-bold text-lg mt-1">
						<a href={url} class="text-text hover:text-oxford no-underline transition-colors">
							{post.title}
						</a>
					</h2>
					<div class="text-sm text-text-muted mt-2 line-clamp-3">{@html post.excerpt}</div>
				</div>
			</article>
			<hr class="border-bg-alt" />
		{/each}
	</div>

	{#if data.pageInfo?.hasNextPage}
		<nav class="mt-8 flex justify-center">
			<a
				href="?after={data.pageInfo?.endCursor ?? ''}"
				class="px-6 py-2 rounded bg-oxford text-white text-sm font-medium hover:bg-oxford-light transition-colors no-underline"
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
