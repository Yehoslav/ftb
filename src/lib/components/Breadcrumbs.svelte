<script lang="ts">
	interface BreadcrumbItem {
		href?: string;
		label: string;
	}

	interface Props {
		items: BreadcrumbItem[];
		class?: string;
	}

	let { items, class: className = '' }: Props = $props();
</script>

<nav class="text-sm text-text-muted {className}" aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1.5">
		{#each items as item, i}
			<li>
				{#if i === items.length - 1}
					<span aria-current="page" class="text-text">{item.label}</span>
				{:else}
					<a
						href={item.href ?? '#'}
						class="no-underline hover:text-oxford text-blue transition-colors"
					>
						{item.label}
					</a>
				{/if}
			</li>
			{#if i < items.length - 1}
				<li aria-hidden="true">/</li>
			{/if}
		{/each}
	</ol>
</nav>
