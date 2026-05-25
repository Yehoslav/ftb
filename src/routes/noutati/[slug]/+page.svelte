<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
</script>

<svelte:head>
	<title>{data.post?.title ?? 'Articol'} — FTB România</title>
</svelte:head>

<div class="mx-auto flex flex-col lg:flex-row lg:w-300 divide-y lg:divide-y-0 lg:divide-x divide-bg-alt border-bg-alt border-x">
	<article class="p-6 lg:p-8 lg:w-[70ch]">
		<h1 class="text-3xl font-bold text-text">{data.post.title}</h1>
		<time class="text-sm text-text-muted">
			{new Date(data.post.date).toLocaleString('ro', dateOptions)}
		</time>
		<hr class="my-4 border-bg-alt" />
		<div class="prose prose-sm max-w-none">{@html data.post.content}</div>
	</article>

	<aside class="p-6 lg:p-8 lg:grow flex flex-col gap-6">
		{#if data.featuredPost}
			<div>
				<h2 class="text-lg font-bold text-oxford mb-3">Articol Recomandat</h2>
				<article class="bg-bg-alt rounded-lg p-4">
					<h3 class="font-bold text-text">{data.featuredPost.title}</h3>
					<time class="text-xs text-text-muted">
						{new Date(data.featuredPost.date).toLocaleString('ro', dateOptions)}
					</time>
					<div class="text-sm text-text-muted mt-2">{@html data.featuredPost.excerpt}</div>
				</article>
			</div>
		{/if}

		<div>
			<h2 class="text-lg font-bold text-oxford mb-3">Calendarul evenimentelor</h2>
			<!-- TODO: de integrat cu WP Events când e disponibil -->
			<p class="text-sm text-text-muted">Nu există evenimente programate momentan.</p>
		</div>
	</aside>
</div>

<style>
	:global(.prose p, .prose ul) {
		margin-top: 1rem;
	}
	:global(.prose li) {
		list-style-type: circle;
		margin-left: 2rem;
	}
	:global(.prose a) {
		color: var(--color-blue);
	}
</style>
