<script lang="ts">
	import MediaLibrary from '$lib/components/admin/MediaLibrary.svelte';
</script>

<svelte:head>
	<title>Bibliotecă media — FTB Admin</title>
</svelte:head>

<div class="mx-auto max-w-5xl space-y-6">
	<header>
		<h1 class="text-2xl font-bold text-oxford">Bibliotecă media</h1>
		<p class="mt-1 text-sm text-text-muted">
			Fișierele sunt găzduite pe WordPress (ftbromania.ro) și pot fi folosite în articole și pagini.
		</p>
	</header>

	<MediaLibrary />
</div>
