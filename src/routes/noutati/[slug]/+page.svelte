<script lang="ts">
	import type { PageProps } from './$types';
	import Article from '$lib/components/Article.svelte';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	let readingTime = $derived.by(() => {
		const text = data.post.content.replace(/<[^>]+>/g, '');
		const words = text.split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.ceil(words / 200));
	});
</script>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<Article
		title={data.post.title}
		breadcrumbs={[
			{ href: '/noutati', label: 'Noutăți' },
			{ label: data.post.title }
		]}
	>
	{#snippet metadata()}
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-text-muted">
			<time>
				{new Date(data.post.date).toLocaleString('ro', dateOptions)}
			</time>
			<span aria-hidden="true">•</span>
			<span>{readingTime} min de citire</span>
		</div>
	{/snippet}

	{#snippet sidebar()}
		{#if data.featuredPost}
			<div>
				<h2 class="text-lg font-bold text-text tracking-tight mb-4">Articol recomandat</h2>
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
	{/snippet}

	<div class="prose">{@html data.post.content}</div>
</Article>
</div>
