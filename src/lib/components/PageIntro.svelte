<script lang="ts">
	interface Props {
		title: string;
		lede?: string;
		parent?: { href: string; label: string };
		accent?: string;
		class?: string;
	}

	let { title, lede, parent, accent = 'bg-blue', class: className = '' }: Props = $props();
</script>

<svelte:head>
	<style>
		@keyframes pi-fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.pi-anim { animation: pi-fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
		@media (prefers-reduced-motion: reduce) {
			.pi-anim { animation: none; }
		}
	</style>
</svelte:head>

<div class="pi-anim {className}">
	{#if parent}
		<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">
			<a href={parent.href} class="no-underline hover:text-oxford transition-colors text-blue">
				{parent.label}
			</a>
		</p>
	{/if}
	<h1 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">
		{title}
	</h1>
	{#if lede}
		<p class="text-text-muted mt-2 mb-4 max-w-2xl leading-relaxed">
			{lede}
		</p>
	{/if}
	<div class="w-10 h-0.5 {accent} mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
</div>
