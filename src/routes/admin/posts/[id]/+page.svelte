<script lang="ts">
	import type { PageProps } from './$types';
	import PostForm from '$lib/components/admin/PostForm.svelte';

	let { data }: PageProps = $props();

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
		date: new Date(data.row.date).toISOString()
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

	<PostForm {post} />
</div>
