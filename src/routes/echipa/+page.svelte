<script lang="ts">
	import { membri } from '$lib/data/echipa';

	const birou = membri.filter((m) => m.categorie === 'birou');
	const extinsa = membri.filter((m) => m.categorie === 'extinsa');

	function initials(nume: string): string {
		return nume
			.split(' ')
			.map((c) => c[0])
			.join('');
	}
</script>

<svelte:head>
	<title>Echipă — FTB România</title>
</svelte:head>

<div class="mx-auto px-4 py-12 lg:w-300">
	<h1 class="text-3xl font-bold text-oxford mb-8">Echipă</h1>

	<section class="mb-12">
		<h2 class="text-xl font-semibold text-oxford-light mb-6">Birou de conducere</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each birou as { nume, rol }}
				<div class="bg-white rounded-lg border border-bg-alt p-6 flex flex-col items-center text-center gap-3">
					<!-- TODO: înlocuiește cu imagine reală când ACF e gata -->
					<div class="w-20 h-20 rounded-full bg-oxford text-white flex items-center justify-center text-xl font-bold">
						{initials(nume)}
					</div>
					<div>
						<h3 class="font-semibold text-text">{nume}</h3>
						<p class="text-sm text-text-muted">{rol}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="text-xl font-semibold text-oxford-light mb-6">Echipa extinsă</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each extinsa as { nume, rol }}
				<div class="bg-white rounded-lg border border-bg-alt p-6 flex flex-col items-center text-center gap-3">
					<div class="w-20 h-20 rounded-full bg-blue text-white flex items-center justify-center text-xl font-bold">
						{initials(nume)}
					</div>
					<div>
						<h3 class="font-semibold text-text">{nume}</h3>
						<p class="text-sm text-text-muted">{rol}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
