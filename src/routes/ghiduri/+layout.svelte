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
	@keyframes slideInItem {
		from { opacity: 0; transform: translateX(-8px); }
		to { opacity: 1; transform: translateX(0); }
	}
	.anim-content { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.1s; }
	.nav-item { animation: slideInItem 0.35s ease-out both; }

	.sidebar-panel {
		transform: translateX(-100%);
		transition: transform 300ms, top 300ms;
	}
	.sidebar-panel.open {
		transform: translateX(0);
	}
	@media (min-width: 1024px) {
		.sidebar-panel {
			transform: none;
			transition: top 300ms;
		}
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-4 lg:px-6">
	<div class="flex gap-0">
		<!-- Mobile sidebar backdrop -->
		{#if sidebarOpen}
			<div
				class="fixed inset-0 z-30 bg-black/30 lg:hidden"
				onclick={() => (sidebarOpen = false)}
				role="presentation"
			></div>
		{/if}

		<!-- Sidebar -->
		<aside class="pt-4"><div
			class="fixed inset-y-0 left-0 z-40 w-56 shrink-0 bg-white lg:bg-transparent overflow-y-auto pb-8 sidebar-panel
				lg:sticky lg:z-auto lg:block lg:h-fit lg:max-h-screen
				{sidebarOpen ? 'open' : ''}"
			style="top: {sidebarTop}px"
			aria-label="Navigare resurse"
		>
			<div class="px-3 pt-6 lg:px-0">
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
								{#each category.items as item, i}
									{@const href = `/ghiduri/${item.slug}`}
									{@const active = !isLanding && currentSlug === item.slug}
									<li>
										<a
											{href}
											class="nav-item block px-1.5 py-1 text-sm border-l-2 transition-colors no-underline
												{active
													? 'border-oxford text-oxford font-medium'
													: 'border-transparent text-text-muted hover:border-bg-alt hover:text-text'}"
											style="animation-delay: {i * 0.04}s"
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
		</div></aside>

		<!-- Main content -->
		<div class="min-w-0 flex-1 anim-content pt-10 lg:pl-6 lg:border-l border-bg-alt">
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
