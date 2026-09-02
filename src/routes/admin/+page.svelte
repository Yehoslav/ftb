<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};

	const formatDate = (d: Date) => new Date(d).toLocaleString('ro', dateOptions);

	const sections = $derived([
		{ href: '/admin/posts', label: 'Noutăți', total: data.counts.posts, note: `${data.counts.postsDrafts} schițe` },
		{ href: '/admin/media', label: 'Bibliotecă media', total: data.counts.media, note: 'fișiere pe WordPress' },
		{ href: '/admin/posts', label: 'Ghiduri', total: data.counts.pages, note: 'pagini WP migrate', disabled: true },
		{ href: '/admin/posts', label: 'Proiecte', total: data.counts.projects, note: 'hub + ediții', disabled: true },
		{ href: '/admin/posts', label: 'Evenimente', total: data.counts.events, note: 'aggregate', disabled: true },
		{ href: '/admin/posts', label: 'Organizații membre', total: data.counts.members, note: 'fondatori / activi / candidați', disabled: true },
		{ href: '/admin/posts', label: 'Echipă', total: data.counts.team, note: 'birou + extinsă', disabled: true }
	]);
</script>

<svelte:head>
	<title>Panou principal — FTB Admin</title>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-8">
	<header>
		<h1 class="text-2xl font-bold text-oxford">Panou principal</h1>
		<p class="mt-1 text-sm text-text-muted">
			Bine ai venit, {data.user?.displayName ?? 'editor'}. Conținutul site-ului se administrează de aici.
		</p>
	</header>

	<section aria-label="Acțiuni rapide" class="flex flex-wrap gap-3">
		<a
			href="/admin/posts/new"
			class="rounded-lg bg-cerry px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-cerry-dark focus-visible:ring-2 focus-visible:ring-blue"
		>
			+ Articol nou
		</a>
		<a
			href="/admin/media"
			class="rounded-lg border border-bg-alt bg-white px-4 py-2.5 text-sm font-semibold text-oxford no-underline transition-colors hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue"
		>
			Încarcă fișiere
		</a>
	</section>

	<section aria-label="Sumar conținut">
		<h2 class="mb-3 text-lg font-semibold text-text">Conținut</h2>
		<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
			{#each sections as s}
				<li>
					{#if s.disabled}
						<div class="rounded-xl border border-bg-alt bg-white/60 p-4 opacity-70">
							<p class="text-xs font-medium uppercase tracking-wide text-text-muted">
								În curând
							</p>
							<p class="mt-1 font-semibold text-text">{s.label}</p>
							<p class="text-sm text-text-muted">{s.total} înregistrări · {s.note}</p>
						</div>
					{:else}
						<a
							href={s.href}
							class="block rounded-xl border border-bg-alt bg-white p-4 no-underline transition-colors hover:border-oxford focus-visible:ring-2 focus-visible:ring-blue"
						>
							<p class="font-semibold text-oxford">{s.label}</p>
							<p class="text-sm text-text-muted">{s.total} · {s.note}</p>
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<section aria-label="Articole recente">
		<h2 class="mb-3 text-lg font-semibold text-text">Articole recente</h2>
		{#if data.recent.length === 0}
			<p class="text-sm text-text-muted">Nu există articole încă.</p>
		{:else}
			<ul class="divide-y divide-bg-alt rounded-xl border border-bg-alt bg-white" role="list">
				{#each data.recent as post (post.id)}
					<li>
						<a
							href="/admin/posts/{post.id}"
							class="flex items-center justify-between gap-4 px-4 py-3 no-underline transition-colors hover:bg-bg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue"
						>
							<span class="min-w-0">
								<span class="block truncate text-sm font-medium text-text">{post.title}</span>
								<span class="text-xs text-text-muted">{formatDate(post.date)}</span>
							</span>
							<span
								class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium {post.status === 'published'
									? 'bg-blue/10 text-blue'
									: 'bg-sunglow/20 text-text'}"
							>
								{post.status === 'published' ? 'publicat' : 'schiță'}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</div>
