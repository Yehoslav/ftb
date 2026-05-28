<script lang="ts">
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import { resurseCategorii, getResursaBySlug } from '$lib/data/resurse';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const headerCtx = getContext<{ readonly height: number; readonly visible: boolean }>('header');

	let sidebarOpen = $state(false);

	let currentSlug = $derived(page.url.pathname.replace(/^\/ghiduri\//, '').replace(/\/$/, ''));
	let isLanding = $derived(page.url.pathname === '/ghiduri' || page.url.pathname === '/ghiduri/');

	let currentTitle = $derived.by(() => {
		if (isLanding) return 'Toate resursele';
		const item = getResursaBySlug(currentSlug);
		return item?.title ?? '';
	});

	let sidebarTop = $derived(headerCtx.visible ? headerCtx.height : 0);
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-content { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.1s; }
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-4 lg:px-6 pb-16">
	<div class="flex gap-0 lg:gap-6">
		<!-- Mobile sidebar backdrop -->
		{#if sidebarOpen}
			<div
				class="fixed inset-0 z-30 bg-black/30 lg:hidden"
				onclick={() => (sidebarOpen = false)}
				role="presentation"
			></div>
		{/if}

		<!-- Sidebar -->
		<aside
			class="fixed inset-y-0 left-0 z-40 w-56 shrink-0 bg-white border-r border-bg-alt overflow-y-auto
				transform transition-[top,transform] duration-300 ease-in-out pt-6 pb-8
				lg:sticky lg:z-auto lg:block lg:max-h-screen lg:transform-none lg:border-r-0
				{sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
			style="top: {sidebarTop}px"
			aria-label="Navigare resurse"
		>
			<div class="px-3 lg:px-0">
				<a
					href="/ghiduri"
					class="block text-sm font-semibold text-text no-underline mb-4 hover:text-oxford transition-colors
						{isLanding ? 'text-oxford' : 'text-text-muted'}"
				>
					Toate resursele
				</a>

				<nav>
					{#each resurseCategorii as category}
						<div class="mb-4">
							<p class="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5 px-1.5">
								{category.label}
							</p>
							<ul class="space-y-px">
								{#each category.items as item}
									{@const href = `/ghiduri/${item.slug}`}
									{@const active = !isLanding && currentSlug === item.slug}
									<li>
										<a
											{href}
											class="block px-1.5 py-1 text-sm rounded transition-colors
												{active
													? 'bg-oxford/10 text-oxford font-medium'
													: 'text-text-muted hover:text-text hover:bg-bg-alt'}"
											aria-current={active ? 'page' : undefined}
										>
											{item.title}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</nav>
			</div>
		</aside>

		<!-- Main content -->
		<div class="min-w-0 flex-1 anim-content pt-6">
			<!-- Mobile: sidebar toggle + page title -->
			<div class="flex items-center gap-3 mb-6 lg:hidden">
				<button
					aria-label="Deschide navigarea"
					aria-expanded={sidebarOpen}
					onclick={() => (sidebarOpen = true)}
					class="shrink-0 p-1.5 rounded text-text-muted hover:bg-bg-alt transition-colors"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<h1 class="text-lg font-bold text-text tracking-tight truncate">{currentTitle}</h1>
			</div>

			{@render children()}
		</div>
	</div>
</div>
