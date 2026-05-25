<script lang="ts">
	import type { PageProps } from './$types';
	import Counter from '$lib/components/Counter.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>FTB România — Federația Tinerilor Basarabeni</title>
</svelte:head>

<div class="mx-auto lg:w-300">
	<!-- Hero -->
	<section class="flex flex-col lg:flex-row items-center gap-8 px-4 py-12 lg:py-16 text-white bg-linear-to-r from-oxford to-blue">
		<div class="lg:w-1/2">
			<h1 class="text-3xl lg:text-4xl font-bold mb-4">Noi suntem FTB</h1>
			<p class="leading-relaxed">
				Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
				la un loc toate asociațiile de studenți și tineri basarabeni din
				România. Chiar dacă ca grup de inițiativă am existat de mai mult
				timp, statutul juridic l-am obținut pe 24 septembrie 2021.
			</p>
			<a
				href="/despre-noi"
				class="inline-block mt-6 px-6 py-2 rounded bg-white text-oxford font-medium text-sm no-underline hover:bg-bg transition-colors"
			>
				Află mai multe
			</a>
		</div>
		<div class="lg:w-1/2 flex justify-center">
			<img
				src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png"
				class="w-2/3"
				alt=""
			/>
		</div>
	</section>

	<!-- Counter -->
	<section class="px-4 py-16">
		{#if data.info}
			<Counter
				values={{
					organizatii: parseInt(data.info.Nr_Org_Membre),
					voluntari: parseInt(data.info.Nr_Voluntari),
					parteneri: parseInt(data.info.Nr_Parteneri),
					proiecte: parseInt(data.info.Nr_Evenimente)
				}}
				duration="3000"
				minspeed="50"
			/>
		{/if}
	</section>

	<!-- Membre -->
	<section class="px-4 py-12 bg-bg-alt border-y border-bg-alt">
		<div class="text-center">
			<h2 class="text-2xl font-bold text-oxford mb-2">Organizații Membre</h2>
			<p class="text-text-muted mb-4">
				{data.membreStats.total} de asociații în {data.membreStats.orase} de centre universitare
			</p>
			<div class="flex flex-wrap justify-center gap-2 mb-6 max-w-xl mx-auto">
				{#each data.membreStats.oraseList as oras}
					<span class="px-3 py-1 rounded-full bg-white border border-bg-alt text-sm text-text">
						{oras}
					</span>
				{/each}
			</div>
			<a
				href="/membre"
				class="inline-block px-6 py-2 rounded bg-oxford text-white text-sm font-medium no-underline hover:bg-oxford-light transition-colors"
			>
				Vezi toate organizațiile membre
			</a>
		</div>
	</section>

	<!-- Quick links -->
	<section class="px-4 py-16">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<a
				href="/echipa"
				class="block p-6 rounded-lg bg-white border border-bg-alt no-underline hover:border-oxford transition-colors"
			>
				<h3 class="font-bold text-oxford mb-2">Echipă</h3>
				<p class="text-sm text-text-muted">Cunoaște echipa FTB</p>
			</a>
			<a
				href="/proiecte"
				class="block p-6 rounded-lg bg-white border border-bg-alt no-underline hover:border-oxford transition-colors"
			>
				<h3 class="font-bold text-oxford mb-2">Proiecte</h3>
				<p class="text-sm text-text-muted">Descoperă proiectele noastre</p>
			</a>
			<a
				href="/noutati"
				class="block p-6 rounded-lg bg-white border border-bg-alt no-underline hover:border-oxford transition-colors"
			>
				<h3 class="font-bold text-oxford mb-2">Noutăți</h3>
				<p class="text-sm text-text-muted">Ultimele articole și anunțuri</p>
			</a>
		</div>
	</section>
</div>
