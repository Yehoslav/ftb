<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const birou = data.echipa.filter((m) => m.categorie === 'birou');
	const extinsa = data.echipa.filter((m) => m.categorie === 'extinsa');

	function initials(nume: string): string {
		return nume
			.split(' ')
			.map((c) => c[0])
			.join('');
	}
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-team  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }

	.member-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.member-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Echipă</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<section class="anim-team mb-16">
		<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-8">Birou de conducere</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each birou as member}
				<div class="member-card bg-white rounded-xl border border-bg-alt p-8 flex flex-col items-center text-center gap-4">
					{#if member.foto}
						<img
							src={member.foto}
							alt={member.nume}
							class="w-20 h-20 rounded-full object-cover shrink-0"
							loading="lazy"
						/>
					{:else}
						<div class="w-20 h-20 rounded-full bg-blue text-white flex items-center justify-center text-xl font-bold shrink-0">
							{initials(member.nume)}
						</div>
					{/if}
					<div>
						<h3 class="font-semibold text-text text-lg">{member.nume}</h3>
						<p class="text-sm text-text-muted mt-0.5">{member.rol}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="anim-team">
		<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-8">Echipa extinsă</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each extinsa as member}
				<div class="member-card bg-white rounded-xl border border-bg-alt p-8 flex flex-col items-center text-center gap-4">
					{#if member.foto}
						<img
							src={member.foto}
							alt={member.nume}
							class="w-20 h-20 rounded-full object-cover shrink-0"
							loading="lazy"
						/>
					{:else}
						<div class="w-20 h-20 rounded-full bg-blue-light text-blue flex items-center justify-center text-xl font-bold shrink-0">
							{initials(member.nume)}
						</div>
					{/if}
					<div>
						<h3 class="font-semibold text-text text-lg">{member.nume}</h3>
						<p class="text-sm text-text-muted mt-0.5">{member.rol}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
