<script lang="ts">
	import PostForm from '$lib/components/admin/PostForm.svelte';
</script>

<svelte:head>
	<title>Articol nou — FTB Admin</title>
</svelte:head>

<div class="mx-auto max-w-6xl">
	<nav aria-label="Migă" class="mb-4 text-sm">
		<a href="/admin/posts" class="text-text-muted no-underline hover:text-oxford">Noutăți</a>
		<span class="mx-2 text-text-muted" aria-hidden="true">/</span>
		<span class="font-medium text-text">Articol nou</span>
	</nav>

	<h1 class="mb-6 text-2xl font-bold text-oxford">Articol nou</h1>

	<PostForm />
</div>
