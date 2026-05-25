<script lang="ts">
	import type { PageProps } from './$types';
	import Counter from '$lib/components/Counter.svelte';
	let { data }: PageProps = $props();
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.1s; }
	.anim-stats { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.2s; }
	.anim-membre { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.3s; }
	.anim-links { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.4s; }
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl">
	<!-- Hero -->
	<section class="relative flex flex-col lg:flex-row items-center gap-8 px-4 py-12 lg:py-20 overflow-hidden
		anim-hero"
		style="background-color: #FAF8F5;"
	>
		<div class="lg:w-1/2 z-10">
			<h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-oxford">
				Noi suntem <span class="text-cerry">FTB</span>
			</h1>
			<p class="text-lg lg:text-xl leading-relaxed text-text mb-8 max-w-lg">
				Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
				la un loc toate asociațiile de studenți și tineri basarabeni din
				România. Chiar dacă ca grup de inițiativă am existat de mai mult
				timp, statutul juridic l-am obținut pe 24 septembrie 2021.
			</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="/despre-noi"
					class="inline-block px-6 py-3 rounded-lg bg-cerry text-white font-semibold text-sm no-underline hover:bg-cerry-light transition-all duration-300 shadow-md hover:shadow-lg"
				>
					Află mai multe
				</a>
				<a
					href="/proiecte"
					class="inline-block px-6 py-3 rounded-lg border-2 border-cerry/30 text-cerry font-semibold text-sm no-underline hover:bg-cerry/5 hover:border-cerry transition-all duration-300"
				>
					Vezi proiecte
				</a>
			</div>
		</div>

		<div class="lg:w-1/2 flex justify-center z-10">
			<img
				src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png"
				class="w-2/3 lg:w-3/4"
				alt=""
			/>
		</div>
	</section>

	<!-- Counter / Stats -->
	<section class="px-4 py-16 bg-bg-alt anim-stats">
		{#if data.info}
			<div class="max-w-5xl mx-auto text-center">
				<h2 class="text-2xl lg:text-3xl font-bold text-oxford mb-2">FTB în cifre</h2>
				<p class="text-text-muted mb-10">Impactul nostru în comunitate</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div class="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
						<i class="fa-solid fa-building text-3xl text-cerry mb-3" aria-hidden="true"></i>
						<span class="text-3xl font-bold text-oxford">{parseInt(data.info.Nr_Org_Membre)}</span>
						<span class="text-sm text-text-muted mt-1">organizații membre</span>
					</div>
					<div class="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
						<i class="fa-solid fa-users text-3xl text-blue mb-3" aria-hidden="true"></i>
						<span class="text-3xl font-bold text-oxford">{parseInt(data.info.Nr_Voluntari)}+</span>
						<span class="text-sm text-text-muted mt-1">voluntari</span>
					</div>
					<div class="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
						<i class="fa-solid fa-handshake text-3xl text-sunglow mb-3" aria-hidden="true"></i>
						<span class="text-3xl font-bold text-oxford">{parseInt(data.info.Nr_Parteneri)}</span>
						<span class="text-sm text-text-muted mt-1">parteneri</span>
					</div>
					<div class="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
						<i class="fa-solid fa-calendar text-3xl text-orange mb-3" aria-hidden="true"></i>
						<span class="text-3xl font-bold text-oxford">{parseInt(data.info.Nr_Evenimente)}</span>
						<span class="text-sm text-text-muted mt-1">evenimente anuale</span>
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- Membre -->
	<section class="relative px-4 py-16 bg-white border-y border-bg-alt overflow-hidden anim-membre">
		<div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cerry via-sunglow to-blue"></div>
		<div class="text-center max-w-3xl mx-auto">
			<h2 class="text-2xl lg:text-3xl font-bold text-oxford mb-2">Organizații Membre</h2>
			<p class="text-text-muted mb-6">
				{data.membreStats.total} de asociații în {data.membreStats.orase} de centre universitare
			</p>
			<div class="flex flex-wrap justify-center gap-2 mb-8 max-w-xl mx-auto">
				{#each data.membreStats.oraseList as oras, i}
					{@const tagColors = ['bg-cerry/10 text-cerry border-cerry/20', 'bg-blue/10 text-blue border-blue/20', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-oxford/10 text-oxford border-oxford/20', 'bg-orange/10 text-orange border-orange/20']}
					<span class="px-3 py-1.5 rounded-full text-sm font-medium border {tagColors[i % tagColors.length]}">
						{oras}
					</span>
				{/each}
			</div>
			<a
				href="/membre"
				class="inline-block px-6 py-3 rounded-lg bg-oxford text-white text-sm font-semibold no-underline hover:bg-oxford-light transition-all duration-300 shadow-sm hover:shadow-md"
			>
				Vezi toate organizațiile membre
			</a>
		</div>
	</section>

	<!-- Quick links -->
	<section class="px-4 py-16 anim-links">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<a
				href="/echipa"
				class="group flex flex-col items-center p-8 rounded-xl bg-white border border-bg-alt no-underline hover:-translate-y-1 hover:shadow-md transition-all duration-300"
			>
				<div class="w-14 h-14 rounded-full bg-oxford/10 flex items-center justify-center mb-4 group-hover:bg-oxford/20 transition-colors duration-300">
					<i class="fa-solid fa-users text-2xl text-oxford" aria-hidden="true"></i>
				</div>
				<h3 class="font-bold text-oxford text-lg mb-1">Echipă</h3>
				<p class="text-sm text-text-muted">Cunoaște echipa FTB</p>
			</a>
			<a
				href="/proiecte"
				class="group flex flex-col items-center p-8 rounded-xl bg-white border border-bg-alt no-underline hover:-translate-y-1 hover:shadow-md transition-all duration-300"
			>
				<div class="w-14 h-14 rounded-full bg-cerry/10 flex items-center justify-center mb-4 group-hover:bg-cerry/20 transition-colors duration-300">
					<i class="fa-solid fa-rocket text-2xl text-cerry" aria-hidden="true"></i>
				</div>
				<h3 class="font-bold text-oxford text-lg mb-1">Proiecte</h3>
				<p class="text-sm text-text-muted">Descoperă proiectele noastre</p>
			</a>
			<a
				href="/noutati"
				class="group flex flex-col items-center p-8 rounded-xl bg-white border border-bg-alt no-underline hover:-translate-y-1 hover:shadow-md transition-all duration-300"
			>
				<div class="w-14 h-14 rounded-full bg-blue/10 flex items-center justify-center mb-4 group-hover:bg-blue/20 transition-colors duration-300">
					<i class="fa-solid fa-newspaper text-2xl text-blue" aria-hidden="true"></i>
				</div>
				<h3 class="font-bold text-oxford text-lg mb-1">Noutăți</h3>
				<p class="text-sm text-text-muted">Ultimele articole și anunțuri</p>
			</a>
		</div>
	</section>
</div>
