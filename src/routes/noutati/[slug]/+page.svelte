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
	.anim-article { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-side   { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="flex flex-col lg:flex-row gap-10 lg:divide-x lg:divide-bg-alt">
		<article class="anim-article lg:max-w-[70ch] lg:pr-10">
			<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-3">{data.post.title}</h1>
			<time class="text-sm text-text-muted">
				{new Date(data.post.date).toLocaleString('ro', dateOptions)}
			</time>
			<div class="w-10 h-0.5 bg-blue mt-6 mb-8 rounded-sm" aria-hidden="true"></div>
			<div class="prose">{@html data.post.content}</div>
		</article>

		<aside class="anim-side lg:pl-10 lg:min-w-72 flex flex-col gap-8">
			{#if data.featuredPost}
				<div>
					<h2 class="text-lg font-bold text-text tracking-tight mb-4">Articol Recomandat</h2>
					<article class="bg-bg-alt rounded-xl p-5 border border-bg-alt">
						<h3 class="font-bold text-text">{data.featuredPost.title}</h3>
						<time class="text-xs text-text-muted block mt-1">
							{new Date(data.featuredPost.date).toLocaleString('ro', dateOptions)}
						</time>
						<div class="text-sm text-text-muted mt-3 leading-relaxed">{@html data.featuredPost.excerpt}</div>
					</article>
				</div>
			{/if}

			<div>
				<h2 class="text-lg font-bold text-text tracking-tight mb-4">Calendarul evenimentelor</h2>
				<div class="bg-bg-alt rounded-xl p-5 border border-bg-alt text-sm text-text-muted">
					<p class="inline-flex items-center gap-2">
						<i class="fa-regular fa-calendar text-blue"></i>
						Nu există evenimente programate momentan.
					</p>
				</div>
			</div>
		</aside>
	</div>
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
	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.75rem;
		margin-block: 1.5rem;
	}
</style>
