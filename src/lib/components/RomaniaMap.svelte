<script lang="ts">
	import { romaniaJudete, type JudetId } from "$lib/data/romaniaJudete";

	interface Highlight {
		id: JudetId;
		name: string;
		count: number;
	}

	let {
		highlight = [],
		title = "Județele unde avem organizații membre",
	}: { highlight?: Highlight[]; title?: string } = $props();

	const all = Object.keys(romaniaJudete) as JudetId[];
	const active = new Set(highlight.map((h) => h.id));

	function fill(id: JudetId): string {
		return active.has(id) ? "judet-active" : "judet";
	}
</script>

<svg
	viewBox="0 0 1000 704"
	class="h-auto w-full"
	role="img"
	aria-label={title}
	shape-rendering="geometricPrecision"
>
	<title>{title}</title>
	{#each all as id (id)}
		{#if active.has(id)}
			<path
				class="judet judet-active"
				d={romaniaJudete[id].d}
				fill="currentColor"
			>
				<title>
					{romaniaJudete[id].name} — {highlight.find((h) => h.id === id)?.count} organizații
				</title>
			</path>
		{:else}
			<path
				class="judet"
				d={romaniaJudete[id].d}
			>
				<title>{romaniaJudete[id].name}</title>
			</path>
		{/if}
	{/each}
</svg>

<style>
	.judet {
		fill: var(--color-bg-alt);
		stroke: var(--color-bg);
		stroke-width: 1;
		stroke-linejoin: round;
	}
	.judet-active {
		fill: var(--color-oxford);
		transition: fill 0.2s ease;
	}
	.judet-active:hover {
		fill: var(--color-blue);
	}
</style>
