<script lang="ts">
	import { page } from '$app/state';

	interface DropdownItem {
		href: string;
		label: string;
	}

	interface DropdownGroup {
		label: string;
		items: DropdownItem[];
	}

	const groups: DropdownGroup[] = [
		{
			label: 'Organizație',
			items: [
				{ href: '/despre-noi', label: 'Despre Noi' },
				{ href: '/echipa', label: 'Echipă' }
			]
		},
		{
			label: 'Activități',
			items: [
				{ href: '/proiecte', label: 'Proiecte' },
				{ href: '/membre', label: 'Membre' },
				{ href: '/noutati', label: 'Noutăți' }
			]
		},
		{
			label: 'Resurse',
			items: [
				{ href: '/ghiduri#ghiduri', label: 'Ghiduri' },
				{ href: '/ghiduri#pentru-studenti', label: 'Pentru studenți' },
				{ href: '/ghiduri#resurse-generale', label: 'Resurse generale' }
			]
		}
	];

	const directLinks: DropdownItem[] = [
		{ href: '/', label: 'Acasă' },
		{ href: '/contact', label: 'Contact' }
	];

	let { headerHeight = $bindable(0), headerVisible = $bindable(true) } = $props();

	let header: HTMLElement | undefined = $state();
	let lastScroll = $state(0);
	let hidden = $state(false);
	let mobileOpen = $state(false);
	let openDropdown: string | null = $state(null);
	let openMobileGroup: string | null = $state(null);

	function isActive(href: string): boolean {
		const path = href.split('#')[0];
		if (path === '/') return page.url.pathname === path;
		return page.url.pathname.startsWith(path);
	}

	function isGroupActive(group: DropdownGroup): boolean {
		return group.items.some((item) => isActive(item.href));
	}

	function onToggleMobileGroup(label: string) {
		openMobileGroup = openMobileGroup === label ? null : label;
	}

	$effect(() => {
		if (header) headerHeight = header.offsetHeight;
	});

	$effect(() => {
		headerVisible = !hidden;
	});
</script>

<svelte:window
	onscroll={() => {
		const cur = window.pageYOffset || document.documentElement.scrollTop;
		hidden = cur > lastScroll && cur > 80;
		lastScroll = cur;
	}}
	onclick={(e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest('[data-dropdown]')) {
			openDropdown = null;
		}
	}}
/>

<header
	bind:this={header}
	style="transform: translateY({hidden ? '-100%' : '0'});"
	class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-bg-alt transition-transform duration-300"
>
	<div class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-3">
		<a href="/" class="font-bold text-xl text-oxford no-underline hover:text-oxford-light transition-colors">
			FTB România
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-1" aria-label="Principal">
			{#each directLinks.filter((l) => l.href === '/') as { href, label }}
				<a
					{href}
					aria-current={isActive(href) ? 'page' : undefined}
					class="px-3 py-2 rounded text-sm font-medium transition-colors
						{isActive(href)
							? 'bg-oxford text-white'
							: 'text-text hover:bg-bg-alt'}"
				>
					{label}
				</a>
			{/each}

			{#each groups as group}
				<div
					role="none"
					data-dropdown="true"
					class="relative"
					onmouseenter={() => (openDropdown = group.label)}
					onmouseleave={() => (openDropdown = null)}
				>
					<button
						aria-haspopup="true"
						aria-expanded={openDropdown === group.label}
						onclick={(e) => {
							e.stopPropagation();
							openDropdown = openDropdown === group.label ? null : group.label;
						}}
						class="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-colors
							{isGroupActive(group)
								? 'bg-oxford text-white'
								: 'text-text hover:bg-bg-alt'}"
					>
						{group.label}
						<svg
							class="w-3 h-3 transition-transform duration-200 {openDropdown === group.label ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if openDropdown === group.label}
						<div class="absolute top-full left-0 pt-1 w-48 z-50">
							<div
								role="menu"
								class="bg-white rounded-lg border border-bg-alt shadow-lg py-1"
							>
								{#each group.items as { href, label }}
									<a
										{href}
										role="menuitem"
										aria-current={isActive(href) ? 'page' : undefined}
										class="block px-4 py-2 text-sm transition-colors
											{isActive(href)
												? 'bg-oxford/10 text-oxford font-medium'
												: 'text-text hover:bg-bg-alt'}"
									>
										{label}
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}

			{#each directLinks.filter((l) => l.href !== '/') as { href, label }}
				<a
					{href}
					aria-current={isActive(href) ? 'page' : undefined}
					class="px-3 py-2 rounded text-sm font-medium transition-colors
						{isActive(href)
							? 'bg-oxford text-white'
							: 'text-text hover:bg-bg-alt'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<!-- Mobile hamburger -->
		<button
			aria-label={mobileOpen ? 'Închide meniul' : 'Deschide meniul'}
			aria-expanded={mobileOpen}
			class="md:hidden flex flex-col gap-1.5 p-2"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? 'rotate-45 translate-y-2' : ''}"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? 'opacity-0' : ''}"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<nav class="md:hidden border-t border-bg-alt bg-white max-h-[80vh] overflow-y-auto" aria-label="Principal mobil">
			{#each directLinks.filter((l) => l.href === '/') as { href, label }}
				<a
					{href}
					class="block px-4 py-3 text-sm font-medium border-b border-bg-alt
						{isActive(href)
							? 'bg-oxford text-white'
							: 'text-text hover:bg-bg-alt'}"
					onclick={() => (mobileOpen = false)}
				>
					{label}
				</a>
			{/each}

			{#each groups as group}
				<div>
					<button
						aria-expanded={openMobileGroup === group.label}
						onclick={() => onToggleMobileGroup(group.label)}
						class="flex w-full items-center justify-between px-4 py-3 text-sm font-medium border-b border-bg-alt
							{isGroupActive(group)
								? 'bg-oxford/10 text-oxford'
								: 'text-text hover:bg-bg-alt'}"
					>
						{group.label}
						<svg
							class="w-3 h-3 transition-transform duration-200 {openMobileGroup === group.label ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					{#if openMobileGroup === group.label}
						<div class="bg-bg">
							{#each group.items as { href, label }}
								<a
									{href}
									class="block px-6 py-2.5 text-sm border-b border-bg-alt
										{isActive(href)
											? 'bg-oxford/10 text-oxford font-medium'
											: 'text-text hover:bg-bg-alt'}"
									onclick={() => (mobileOpen = false)}
								>
									{label}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/each}

			{#each directLinks.filter((l) => l.href !== '/') as { href, label }}
				<a
					{href}
					class="block px-4 py-3 text-sm font-medium border-b border-bg-alt
						{isActive(href)
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
