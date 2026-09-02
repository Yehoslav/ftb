<script lang="ts">
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	let { data, children }: LayoutProps = $props();

	const navItems = [
		{ href: '/admin', label: 'Panou principal', exact: true },
		{ href: '/admin/posts', label: 'Noutăți', exact: false },
		{ href: '/admin/media', label: 'Bibliotecă media', exact: false }
	];

	const isActive = (href: string, exact: boolean) =>
		exact ? page.url.pathname === href : page.url.pathname.startsWith(href);

	async function logout() {
		await fetch('/api/admin/auth/logout', { method: 'POST' });
		window.location.href = '/admin/login';
	}
</script>

{#if data.user}
	<div class="flex min-h-screen bg-bg">
		<a
			href="#admin-content"
			class="fixed -top-full left-4 z-60 px-4 py-2 bg-white text-oxford rounded-lg shadow-lg border border-bg-alt text-sm font-medium no-underline focus:top-4 transition-all duration-150"
		>
			Sari la conținut
		</a>

		<aside
			class="flex w-56 shrink-0 flex-col border-r border-bg-alt bg-white"
			aria-label="Navigare admin"
		>
			<div class="border-b border-bg-alt px-5 py-4">
				<a href="/admin" class="text-lg font-bold text-oxford no-underline">FTB Admin</a>
				<p class="mt-0.5 text-xs text-text-muted">Gestionare conținut</p>
			</div>

			<nav class="flex-1 px-3 py-4">
				<ul class="space-y-1" role="list">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="block rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors focus-visible:ring-2 focus-visible:ring-blue {isActive(
									item.href,
									item.exact
								)
									? 'bg-oxford text-white'
									: 'text-text hover:bg-bg-alt'}"
								aria-current={isActive(item.href, item.exact) ? 'page' : undefined}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="border-t border-bg-alt px-5 py-4">
				<p class="truncate text-sm font-medium" title={data.user.displayName}>
					{data.user.displayName}
				</p>
				<p class="text-xs text-text-muted">
					{data.user.role === 'admin' ? 'Administrator' : 'Editor'}
				</p>
				<button
					type="button"
					class="mt-3 w-full rounded-lg border border-bg-alt px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue"
					onclick={logout}
				>
					Deconectare
				</button>
				<a
					href="/"
					class="mt-2 block text-center text-xs text-text-muted no-underline hover:text-oxford focus-visible:ring-2 focus-visible:ring-blue"
				>
					← Înapoi la site
				</a>
			</div>
		</aside>

		<div id="admin-content" class="min-w-0 flex-1 p-6 lg:p-10">
			{@render children()}
		</div>
	</div>
{:else}
	{@render children()}
{/if}
