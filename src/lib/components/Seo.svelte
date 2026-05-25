<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		image?: string;
	}

	let { title, description, image }: Props = $props();

	const siteName = 'FTB România';
	const defaultDescription =
		'Federația Tinerilor Basarabeni (FTB) reunește asociațiile de studenți și tineri basarabeni din România.';
</script>

<title>{title} — {siteName}</title>
<meta name="description" content={description ?? defaultDescription} />
<meta property="og:title" content={title + ' — ' + siteName} />
<meta property="og:description" content={description ?? defaultDescription} />
<meta property="og:site_name" content={siteName} />
<meta property="og:type" content="website" />
{#if image}
	<meta property="og:image" content={image} />
{/if}
