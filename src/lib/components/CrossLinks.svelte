<script lang="ts">
	import { connections } from '$lib/data/connections';

	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();

	let conn = $derived(connections[slug]);
</script>

{#if conn}
	<div class="space-y-6">
		{#if conn.nextStep}
			<section>
				<h2 class="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
					Pasul următor
				</h2>
				<a
					href={conn.nextStep.href}
					class="flex items-center gap-3 rounded-xl border border-blue/20 bg-blue-light/30 p-4 no-underline hover:border-blue/40 hover:bg-blue-light/50 transition-all group"
				>
					<div class="flex-1">
						<p class="text-sm font-medium text-text group-hover:text-oxford transition-colors">
							{conn.nextStep.label}
						</p>
					</div>
					<i class="fa-solid fa-arrow-right text-blue group-hover:text-oxford transition-colors" aria-hidden="true"></i>
				</a>
			</section>
		{/if}

		{#if conn.external && conn.external.length > 0}
			<section>
				<h2 class="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
					Surse oficiale
				</h2>
				<ul class="space-y-2">
					{#each conn.external as source}
						<li>
							<a
								href={source.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2.5 rounded-lg border border-bg-alt bg-white px-4 py-3 no-underline hover:border-blue/20 hover:shadow-sm transition-all group"
							>
								<i class="fa-solid fa-arrow-up-right-from-square text-xs text-text-muted group-hover:text-blue transition-colors" aria-hidden="true"></i>
								<span class="text-sm font-medium text-text group-hover:text-oxford transition-colors">
									{source.label}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
{/if}
