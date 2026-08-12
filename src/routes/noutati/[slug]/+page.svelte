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
	<div class="flex flex-col lg:flex-row">
		<article class="anim-article lg:min-w-3xl lg:max-w-3xl lg:pr-10">
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

			{#if data.evenimente.length > 0}
				<div>
					<h2 class="text-lg font-bold text-text tracking-tight mb-4">Calendarul evenimentelor</h2>
					<div class="flex flex-col gap-3">
						{#each data.evenimente as event}
							<a
								href="/evenimente/{event.slug}"
								class="bg-bg-alt rounded-xl p-4 border border-bg-alt no-underline block hover:border-blue/20 transition-colors"
							>
								<div class="flex items-start gap-3">
									<div class="shrink-0 w-10 h-10 rounded-lg bg-blue-light text-blue flex flex-col items-center justify-center leading-tight text-xs">
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
									<div class="min-w-0">
										<span class="text-sm font-semibold text-text leading-snug">{event.title}</span>
										<p class="text-xs text-text-muted mt-0.5">{event.location}</p>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
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
	:global(.prose .wp-block-gallery) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 0.75rem;
		margin-block: 1.5rem;
		margin-inline: 0;
		padding: 0;
	}
	:global(.prose .wp-block-gallery .wp-block-image) {
		margin: 0;
		overflow: hidden;
		border-radius: 0.75rem;
		background: var(--color-bg-alt);
	}
	:global(.prose .wp-block-gallery.is-cropped .wp-block-image) {
		aspect-ratio: 4 / 3;
	}
	:global(.prose .wp-block-gallery .wp-block-image img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		margin: 0;
		border-radius: 0;
	}
</style>
