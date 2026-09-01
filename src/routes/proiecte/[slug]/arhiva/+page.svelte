<script lang="ts">
	import type { PageProps } from './$types';
	import { etichetaStare } from '$lib/data/proiecte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data }: PageProps = $props();
	const hub = $derived(data.hub);
	const editii = $derived(data.editii);
	const peAni = $derived(data.peAni);
	const ani = $derived(Object.keys(peAni).map(Number).sort((a, b) => b - a));
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
	.anim-body { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.15s; }

	.editie-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.editie-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}

	@media (prefers-reduced-motion: reduce) {
		.anim-hero, .anim-body { animation: none; }
		.editie-card:hover { transform: none; }
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<Breadcrumbs
		class="mb-8"
		items={[
			{ href: '/proiecte', label: 'Proiecte' },
			{ href: `/proiecte/${hub.slug}`, label: hub.titlu },
			{ label: 'Arhiva edițiilor' }
		]}
	/>

	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Arhiva edițiilor</h1>
		<div class="w-10 h-0.5 rounded-sm mt-3 mb-6" style="background-color: {hub.culoare}" aria-hidden="true"></div>
		<p class="text-text-muted mb-10">Toate edițiile proiectului {hub.titlu} ({editii.length}).</p>
	</div>

	<div class="anim-body space-y-12">
		{#each ani as an}
			<section>
				<div class="flex items-center gap-3 mb-5">
					<span class="text-2xl font-bold text-text" style="color: {hub.culoare}">{an}</span>
					<div class="flex-1 h-px bg-bg-alt" aria-hidden="true"></div>
				</div>
				<div class="flex flex-col gap-5">
					{#each peAni[an] as editie}
						<a
							href="/proiecte/{hub.slug}/{editie.slug}"
							class="editie-card bg-white rounded-xl border border-bg-alt p-6 no-underline block"
						>
							<div class="flex flex-wrap items-center gap-2 mb-2">
								<h2 class="text-lg font-bold text-text">{editie.titlu}</h2>
								<span
									class="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full"
									style="color: {hub.culoare}; background-color: {hub.culoare}1a"
								>
									{etichetaStare(editie.stare)}
								</span>
							</div>
							<p class="text-sm text-text-muted mb-3 flex items-center gap-1.5">
								<i class="fa-regular fa-calendar text-blue" aria-hidden="true"></i>
								{editie.perioada}
							</p>
							<p class="text-sm text-text leading-relaxed">{editie.descriere}</p>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
