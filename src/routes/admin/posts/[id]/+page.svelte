<script lang="ts">
	import type { PageProps } from './$types';
	import PostForm from '$lib/components/admin/PostForm.svelte';

	let { data }: PageProps = $props();

	// svelte-ignore state_referenced_locally — input datetime-local nu acceptă zonă orară/secunde
	const dateInput = (value: string | Date) => {
		const d = value instanceof Date ? value : new Date(value);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	};

	const post = $derived({
		id: data.row.id,
		slug: data.row.slug,
		title: data.row.title,
		content: data.row.content,
		excerpt: data.row.excerpt,
		status: data.row.status,
		category: data.row.category,
		featuredImageUrl: data.row.featuredImageUrl,
		featuredImageAlt: data.row.featuredImageAlt,
		date: dateInput(data.row.date)
	});
</script>

<svelte:head>
	<title>Editează: {data.row.title} — FTB Admin</title>
</svelte:head>

<div class="mx-auto max-w-6xl">
	<nav aria-label="Migă" class="mb-4 text-sm">
		<a href="/admin/posts" class="text-text-muted no-underline hover:text-oxford">Noutăți</a>
		<span class="mx-2 text-text-muted" aria-hidden="true">/</span>
		<span class="font-medium text-text">{data.row.title}</span>
	</nav>

	<h1 class="mb-6 text-2xl font-bold text-oxford">Editează articolul</h1>

	{#key data.row.id}
		<PostForm {post} />
	{/key}
</div>
