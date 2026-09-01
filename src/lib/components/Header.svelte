<script lang="ts">
	import { page } from '$app/state';
	import { resurseCategorii } from '$lib/data/resurse';
	import logoLong from '$lib/assets/FTB_logo_long_default-2_1.png';

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
				{ href: '/despre-noi', label: 'Despre noi' },
				{ href: '/org', label: 'Organizație' },
				{ href: '/org/structura-organizatie', label: 'Structura organizației' },
				{ href: '/org/transparenta', label: 'Transparență' },
				{ href: '/organizatii-studentesti', label: 'Organizații studențești' },
			]
		},
		{
			label: 'Activități',
			items: [
				{ href: '/proiecte', label: 'Proiecte' },
				{ href: '/noutati', label: 'Noutăți' },
				{ href: '/evenimente', label: 'Evenimente' }
			]
		},
		{
			label: 'Resurse',
			items: [
				{ href: '/admitere', label: 'Admitere' },
				...resurseCategorii.map((c) => ({
					href: `/ghiduri#${c.id}`,
					label: c.label
				}))
			]
		}
	];

	const directLinks: DropdownItem[] = [
		{ href: '/', label: 'Acasă' },
		{ href: '/contact', label: 'Contact' }
	];

	let { headerHeight = $bindable(0) } = $props();

	let header: HTMLElement | undefined = $state();
	let mobileOpen = $state(false);
	let openDropdown: string | null = $state(null);
	let openMobileGroup: string | null = $state(null);

	function isActive(href: string): boolean {
		const [path, hash] = href.split('#');
		if (path === '/') return page.url.pathname === path;
		if (hash) {
			return page.url.pathname === path && page.url.hash === `#${hash}`;
		}
		return page.url.pathname === path;
	}

	function isGroupActive(group: DropdownGroup): boolean {
		const onGhiduri = page.url.pathname.startsWith('/ghiduri');
		if (onGhiduri && group.items.some((item) => item.href.startsWith('/ghiduri'))) {
			return true;
		}
		return group.items.some((item) => {
			const [itemPath] = item.href.split('#');
			return page.url.pathname === itemPath || itemPath.startsWith(page.url.pathname + '/');
		});
	}

	function onToggleMobileGroup(label: string) {
		openMobileGroup = openMobileGroup === label ? null : label;
	}

	function getMenuItems(groupLabel: string): HTMLAnchorElement[] {
		const dropdown = document.querySelector<HTMLElement>(`[data-dropdown-label="${groupLabel}"]`);
		if (!dropdown) return [];
		const menu = dropdown.querySelector<HTMLElement>('[role="menu"]');
		if (!menu) return [];
		return Array.from(menu.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'));
	}

	function focusItem(items: HTMLAnchorElement[], idx: number) {
		if (items[idx]) items[idx].focus();
	}

	function onTriggerKeydown(e: KeyboardEvent, groupLabel: string) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			openDropdown = groupLabel;
			requestAnimationFrame(() => {
				const items = getMenuItems(groupLabel);
				if (e.key === 'ArrowDown') focusItem(items, 0);
				else focusItem(items, items.length - 1);
			});
		}
	}

	function onMenuKeydown(e: KeyboardEvent, groupLabel: string) {
		const menu = e.currentTarget as HTMLElement;
		const items = Array.from(menu.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'));
		const current = e.target as HTMLElement;
		const idx = items.indexOf(current as HTMLAnchorElement);

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				focusItem(items, (idx + 1) % items.length);
				break;
			case 'ArrowUp':
				e.preventDefault();
				focusItem(items, (idx - 1 + items.length) % items.length);
				break;
			case 'Home':
				e.preventDefault();
				focusItem(items, 0);
				break;
			case 'End':
				e.preventDefault();
				focusItem(items, items.length - 1);
				break;
			case 'Escape':
				e.preventDefault();
				openDropdown = null;
				menu.closest('[data-dropdown]')?.querySelector<HTMLButtonElement>('button')?.focus();
				break;
		}
	}

	function onDropdownFocusout(e: FocusEvent, groupLabel: string) {
		if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
			openDropdown = null;
		}
	}

	$effect(() => {
		if (header) headerHeight = header.offsetHeight;
	});

	function onPageShow(e: PageTransitionEvent) {
		if (e.persisted) {
			mobileOpen = false;
			openDropdown = null;
			openMobileGroup = null;
		}
	}

</script>

<svelte:window
	onclick={(e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest('[data-dropdown]')) {
			openDropdown = null;
		}
		if (mobileOpen && !target.closest('[data-mobile-menu]') && !target.closest('[data-hamburger]')) {
			mobileOpen = false;
		}
	}}
	onpageshow={onPageShow}
/>

<header
	bind:this={header}
	class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-bg-alt"
>
	<div class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-3">
		<a href="/" class="no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford" aria-label="FTB România — Acasă">
			<img src={logoLong} alt="FTB România" class="h-9 w-auto object-contain" />
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
					data-dropdown-label={group.label}
					class="relative"
					onmouseenter={() => (openDropdown = group.label)}
					onmouseleave={() => (openDropdown = null)}
					onfocusout={(e) => onDropdownFocusout(e, group.label)}
				>
					<button
						aria-haspopup="true"
						aria-expanded={openDropdown === group.label}
						onclick={(e) => {
							e.stopPropagation();
							openDropdown = openDropdown === group.label ? null : group.label;
						}}
						onkeydown={(e) => onTriggerKeydown(e, group.label)}
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
								tabindex="-1"
								onkeydown={(e) => onMenuKeydown(e, group.label)}
								class="bg-white rounded-lg border border-bg-alt shadow-lg py-1"
							>
								{#each group.items as { href, label }}
									<a
										{href}
										role="menuitem"
										tabindex="-1"
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

			<a
				href="/contact"
				class="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-cerry px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-cerry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerry"
			>
				Vreau să mă implic
			</a>
		</nav>

		<!-- Mobile hamburger -->
		<button
			aria-label={mobileOpen ? 'Închide meniul' : 'Deschide meniul'}
			aria-expanded={mobileOpen}
			data-hamburger="true"
			class="md:hidden flex flex-col gap-1.5 p-2"
			onclick={() => (mobileOpen = !mobileOpen)}
			onkeydown={(e) => {
				if (e.key === 'Escape' && mobileOpen) {
					mobileOpen = false;
				}
			}}
		>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? 'rotate-45 translate-y-2' : ''}"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? 'opacity-0' : ''}"></span>
			<span class="block w-6 h-0.5 bg-text rounded transition-all {mobileOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div data-mobile-menu="true" onkeydown={(e) => {
				if (e.key === 'Escape') {
					mobileOpen = false;
					document.querySelector<HTMLButtonElement>('[data-hamburger]')?.focus();
				}
			}}>
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

			<a
				href="/contact"
				class="block bg-cerry px-4 py-3 text-sm font-semibold text-white no-underline hover:bg-cerry-dark"
				onclick={() => (mobileOpen = false)}
			>
				Vreau să mă implic
			</a>
		</nav>
		</div>
	{/if}
</header>
