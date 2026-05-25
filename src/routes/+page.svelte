<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero   { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.1s; }
	.anim-stats  { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.2s; }
	.anim-values { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.3s; }
	.anim-membre { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.4s; }
	.anim-links  { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.5s; }

	.card-hover {
		transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
	}
	.card-hover:hover {
		border-color: oklch(0.3848 0.141 273.69);
		transform: translateY(-3px);
		box-shadow: 0 4px 20px rgba(0,0,0,0.06);
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border: 1px solid oklch(0.85 0.01 78.3);
		font-size: 0.875rem;
		color: oklch(0.45 0.02 273.69);
		transition: border-color 0.2s ease, background-color 0.2s ease;
	}
	.tag:hover {
		border-color: oklch(0.3848 0.141 273.69);
		background-color: rgba(47, 55, 141, 0.04);
	}

	.stat-number {
		font-size: 3rem;
		line-height: 1;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: oklch(0.3848 0.141 273.69);
	}
	.stat-label {
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: oklch(0.45 0.02 273.69);
		margin-top: 0.5rem;
	}

	.hero-grid {
		background-image:
			linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	.values-item {
		font-size: 1.125rem;
		font-weight: 500;
		color: oklch(0.3848 0.141 273.69);
	}
	.values-label {
		font-size: 0.8rem;
		font-weight: 400;
		color: oklch(0.50 0.10 273.69);
		margin-top: 0.15rem;
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl">
	<!-- Hero — dark navy, grid overlay, image right -->
	<section class="relative flex flex-col lg:flex-row items-center gap-10 px-6 py-20 lg:py-28 anim-hero bg-text hero-grid overflow-hidden">
		<div class="lg:w-1/2 z-10">
			<h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-5 text-white">
				Noi suntem FTB
			</h1>
			<p class="text-base lg:text-lg leading-relaxed text-white/70 mb-9 max-w-lg font-light">
				Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
				la un loc toate asociațiile de studenți și tineri basarabeni din
				România. Chiar dacă ca grup de inițiativă am existat de mai mult
				timp, statutul juridic l-am obținut pe 24 septembrie 2021.
			</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="/despre-noi"
					class="inline-block px-7 py-3.5 bg-cerry text-white font-medium text-sm no-underline tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
				>
					Află mai multe
				</a>
				<a
					href="/proiecte"
					class="inline-block px-7 py-3.5 border border-white/30 text-white font-medium text-sm no-underline tracking-widest uppercase hover:border-white/70 transition-colors duration-300"
				>
					Vezi proiecte
				</a>
			</div>
		</div>

		<div class="lg:w-1/2 flex justify-center z-10">
			<img
				src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png"
				class="w-2/3 lg:w-3/4 opacity-90"
				alt=""
			/>
		</div>
	</section>

	<!-- Stats section — clean numbers, oxford top border accent -->
	{#if data.info}
		<section class="px-6 py-24 anim-stats bg-bg border-t-2 border-oxford/15">
			<div class="max-w-5xl mx-auto">
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
					<div>
						<div class="stat-number">{parseInt(data.info.Nr_Org_Membre)}</div>
						<div class="stat-label">Organizații Membre</div>
					</div>
					<div>
						<div class="stat-number">{parseInt(data.info.Nr_Voluntari)}+</div>
						<div class="stat-label">Voluntari</div>
					</div>
					<div>
						<div class="stat-number">{parseInt(data.info.Nr_Parteneri)}</div>
						<div class="stat-label">Parteneri</div>
					</div>
					<div>
						<div class="stat-number">{parseInt(data.info.Nr_Evenimente)}</div>
						<div class="stat-label">Evenimente Anuale</div>
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Trust / values bar — oxford text, no icons -->
	<section class="px-6 py-14 anim-values border-b border-bg-alt bg-white">
		<div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-16 text-center">
			<div>
				<div class="values-item">{parseInt(data.info?.Nr_Org_Membre || '15')}+ organizații membre</div>
				<div class="values-label">în toată România</div>
			</div>
			<div>
				<div class="values-item">{data.membreStats.orase} centre universitare</div>
				<div class="values-label">din Iași până la Timișoara</div>
			</div>
			<div>
				<div class="values-item">{parseInt(data.info?.Nr_Voluntari || '300')}+ voluntari</div>
				<div class="values-label">implicați activ</div>
			</div>
		</div>
	</section>

	<!-- Membre section -->
	<section class="px-6 py-24 anim-membre bg-bg">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-3" style="color: oklch(0.3848 0.141 273.69);">
				Organizații Membre
			</h2>
			<p class="text-text-muted text-base font-light mb-8">
				{data.membreStats.total} de asociații în {data.membreStats.orase} de centre universitare
			</p>
			<div class="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
				{#each data.membreStats.oraseList as oras}
					<span class="tag">{oras}</span>
				{/each}
			</div>
			<a
				href="/membre"
				class="inline-block px-7 py-3.5 border border-oxford text-oxford font-medium text-sm no-underline tracking-widest uppercase hover:bg-oxford hover:text-white transition-colors duration-300"
			>
				Vezi toate organizațiile membre
			</a>
		</div>
	</section>

	<!-- Quick links — oxford top border, icons -->
	<section class="px-6 py-24 anim-links bg-white border-t border-bg-alt">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
			<a
				href="/echipa"
				class="card-hover flex flex-col p-8 border border-bg-alt no-underline bg-white border-t-2"
				style="border-top-color: oklch(0.3848 0.141 273.69);"
			>
				<i class="fa-solid fa-users text-oxford text-2xl mb-4"></i>
				<h3 class="font-bold text-text text-lg mb-2 tracking-tight">Echipă</h3>
				<p class="text-sm text-text-muted font-light leading-relaxed">Cunoaște echipa FTB</p>
			</a>
			<a
				href="/proiecte"
				class="card-hover flex flex-col p-8 border border-bg-alt no-underline bg-white border-t-2"
				style="border-top-color: oklch(0.3848 0.141 273.69);"
			>
				<i class="fa-solid fa-lightbulb text-oxford text-2xl mb-4"></i>
				<h3 class="font-bold text-text text-lg mb-2 tracking-tight">Proiecte</h3>
				<p class="text-sm text-text-muted font-light leading-relaxed">Descoperă proiectele noastre</p>
			</a>
			<a
				href="/noutati"
				class="card-hover flex flex-col p-8 border border-bg-alt no-underline bg-white border-t-2"
				style="border-top-color: oklch(0.3848 0.141 273.69);"
			>
				<i class="fa-regular fa-newspaper text-oxford text-2xl mb-4"></i>
				<h3 class="font-bold text-text text-lg mb-2 tracking-tight">Noutăți</h3>
				<p class="text-sm text-text-muted font-light leading-relaxed">Ultimele articole și anunțuri</p>
			</a>
		</div>
	</section>
</div>
