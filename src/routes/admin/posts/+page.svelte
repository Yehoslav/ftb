<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	interface PostRow {
		id: number;
		slug: string;
		title: string;
		status: 'draft' | 'published';
		date: string;
		featuredImageUrl: string | null;
	}

	type StatusFilter = 'all' | 'draft' | 'published';

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};

	const formatDate = (d: string) => new Date(d).toLocaleString('ro', dateOptions);

	let items = $state<PostRow[]>([]);
	let total = $state(0);
	let page = $state(1);
	let statusFilter = $state<StatusFilter>('all');
	let loading = $state(true);
	let error = $state('');
	let deleting = $state<number | null>(null);

	const limit = 20;
	const pageCount = $derived(Math.max(1, Math.ceil(total / limit)));

	async function load() {
		loading = true;
		error = '';
		try {
			const params = new URLSearchParams({ page: String(page), limit: String(limit) });
			if (statusFilter !== 'all') params.set('status', statusFilter);
			const resp = await fetch(`/api/admin/content/posts?${params}`);
			if (!resp.ok) {
				error = `Nu am putut încărca articolele (${resp.status}).`;
				return;
			}
			const res = (await resp.json()) as { items: PostRow[]; total: number };
			items = res.items;
			total = res.total;
		} finally {
			loading = false;
		}
	}

	function setStatus(next: StatusFilter) {
		statusFilter = next;
		page = 1;
		load();
	}

	function goToPage(next: number) {
		page = Math.min(Math.max(1, next), pageCount);
		load();
	}

	async function remove(id: number) {
		if (!confirm('Sigur ștergi acest articol? Acțiunea este definitivă.')) return;
		deleting = id;
		try {
			const resp = await fetch(`/api/admin/content/posts/${id}`, { method: 'DELETE' });
			if (!resp.ok) {
				error = 'Ștergerea a eșuat.';
				return;
			}
			await load();
		} finally {
			deleting = null;
		}
	}

	onMount(() => {
		load();
	});

	const statusLabel = (s: string) => (s === 'published' ? 'publicat' : 'schiță');
</script>

<svelte:head>
	<title>Noutăți — FTB Admin</title>
</svelte:head>

<div class="mx-auto max-w-5xl space-y-6">
	<header class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-oxford">Noutăți</h1>
			<p class="mt-1 text-sm text-text-muted">{total} articole în total</p>
		</div>
		<a
			href="/admin/posts/new"
			class="rounded-lg bg-cerry px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-cerry-dark focus-visible:ring-2 focus-visible:ring-blue"
		>
			+ Articol nou
		</a>
	</header>

	<div class="flex gap-2" role="group" aria-label="Filtrează după stare">
		{#each [['all', 'Toate'], ['published', 'Publicate'], ['draft', 'Schițe']] as [value, label]}
			<button
				type="button"
				class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue {statusFilter === value
					? 'bg-oxford text-white'
					: 'bg-white text-text border border-bg-alt hover:bg-bg-alt'}"
				aria-pressed={statusFilter === value}
				onclick={() => setStatus(value as StatusFilter)}
			>
				{label}
			</button>
		{/each}
	</div>

	{#if error}
		<p class="rounded-lg bg-cerry/10 px-4 py-3 text-sm text-cerry" role="alert">{error}</p>
	{/if}

	{#if loading}
		<p class="text-sm text-text-muted">Se încarcă…</p>
	{:else if items.length === 0}
		<p class="rounded-xl border border-bg-alt bg-white p-8 text-center text-sm text-text-muted">
			Niciun articol corespunzător filtrelor.
		</p>
	{:else}
		<ul class="divide-y divide-bg-alt rounded-xl border border-bg-alt bg-white" role="list">
			{#each items as post (post.id)}
				<li class="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap">
					{#if post.featuredImageUrl}
						<img
							src={post.featuredImageUrl}
							alt=""
							class="h-12 w-20 shrink-0 rounded-md object-cover"
							loading="lazy"
						/>
					{/if}
					<div class="min-w-0 flex-1">
						<a
							href="/admin/posts/{post.id}"
							class="block truncate text-sm font-medium text-text no-underline hover:text-oxford focus-visible:ring-2 focus-visible:ring-blue"
						>
							{post.title}
						</a>
						<p class="truncate text-xs text-text-muted">
							/noutati/{post.slug} · {formatDate(post.date)}
						</p>
					</div>
					<span
						class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium {post.status === 'published'
							? 'bg-blue/10 text-blue'
							: 'bg-sunglow/20 text-text'}"
					>
						{statusLabel(post.status)}
					</span>
					<div class="flex shrink-0 gap-2">
						<a
							href="/admin/posts/{post.id}"
							class="rounded-md border border-bg-alt px-2.5 py-1 text-xs font-medium text-oxford no-underline hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue"
						>
							Editează
						</a>
						<button
							type="button"
							class="rounded-md border border-bg-alt px-2.5 py-1 text-xs font-medium text-cerry hover:bg-cerry/10 focus-visible:ring-2 focus-visible:ring-cerry disabled:opacity-50"
							disabled={deleting === post.id}
							onclick={() => remove(post.id)}
						>
							{deleting === post.id ? '…' : 'Șterge'}
						</button>
					</div>
				</li>
			{/each}
		</ul>

		{#if pageCount > 1}
			<nav class="flex items-center justify-between" aria-label="Paginare articole">
				<button
					type="button"
					class="rounded-lg border border-bg-alt bg-white px-3.5 py-2 text-sm font-medium text-text hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-40"
					disabled={page <= 1}
					onclick={() => goToPage(page - 1)}
				>
					← Anterioare
				</button>
				<span class="text-sm text-text-muted">Pagina {page} din {pageCount}</span>
				<button
					type="button"
					class="rounded-lg border border-bg-alt bg-white px-3.5 py-2 text-sm font-medium text-text hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-40"
					disabled={page >= pageCount}
					onclick={() => goToPage(page + 1)}
				>
					Următoare →
				</button>
			</nav>
		{/if}
	{/if}
</div>
