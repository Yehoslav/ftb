<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Acasă' },
		{ href: '/despre-noi', label: 'Despre Noi' },
		{ href: '/echipa', label: 'Echipă' },
		{ href: '/proiecte', label: 'Proiecte' },
		{ href: '/membre', label: 'Membre' },
		{ href: '/noutati', label: 'Noutăți' },
		{ href: '/contact', label: 'Contact' }
	];

	let { headerHeight = $bindable(0) } = $props();

	let header: HTMLElement | undefined = $state();
	let lastScroll = $state(0);
	let hidden = $state(false);
	let mobileOpen = $state(false);

	$effect(() => {
		if (header) headerHeight = header.offsetHeight;
	});
</script>

<svelte:window
	onscroll={() => {
		const cur = window.pageYOffset || document.documentElement.scrollTop;
		hidden = cur > lastScroll && cur > 80;
		lastScroll = cur;
	}}
/>

<header
	bind:this={header}
	style="transform: translateY({hidden ? '-100%' : '0'});"
	class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-bg-alt transition-transform duration-300"
>
	<div class="mx-auto flex items-center justify-between px-4 py-3 lg:w-300">
		<a href="/" class="font-bold text-xl text-oxford no-underline hover:text-oxford-light">
			FTB România
		</a>

		<nav class="hidden md:flex items-center gap-1">
			{#each links as { href, label }}
				<a
					{href}
					class="px-3 py-2 rounded text-sm font-medium transition-colors
						{href === '/'
							? page.url.pathname === href
								? 'bg-oxford text-white'
								: 'text-text hover:bg-bg-alt'
							: page.url.pathname.startsWith(href)
								? 'bg-oxford text-white'
								: 'text-text hover:bg-bg-alt'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<button
			aria-label="Meniu"
			class="md:hidden flex flex-col gap-1.5 p-2"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="block w-6 h-0.5 bg-text rounded transition-all"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all"></span>
		</button>
	</div>

	{#if mobileOpen}
		<nav class="md:hidden border-t border-bg-alt bg-white">
			{#each links as { href, label }}
				<a
					{href}
					class="block px-4 py-3 text-sm font-medium
						{href === '/'
							? page.url.pathname === href
								? 'bg-oxford text-white'
								: 'text-text hover:bg-bg-alt'
							: page.url.pathname.startsWith(href)
								? 'bg-oxford text-white'
								: 'text-text hover:bg-bg-alt'}"
					onclick={() => (mobileOpen = false)}
				>
					{label}
				</a>
			{/each}
		</nav>
	{/if}
</header>
