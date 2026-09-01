<script lang="ts">
	import type { PageProps } from './$types';
	import Placeholder from '$lib/components/Placeholder.svelte';

	let { data }: PageProps = $props();

	const quickLinks = [
		{
			href: '/org/structura-organizatie',
			title: 'Structura organizației',
			desc: 'Conducere, membri și rețeaua de asociații după statut.'
		},
		{
			href: '/org/transparenta',
			title: 'Transparență',
			desc: 'Identitate legală, finanțe, rapoarte anuale și politici.'
		},
		{
			href: '/org/manual',
			title: 'Manual',
			desc: 'Proceduri și roluri pentru membri și voluntari.'
		}
	];

	const deCeParteneri = [
		'Acces la rețeaua de asociații studențești basarabene din toată România',
		'Implicare directă în procesul de admitere și integrare a tinerilor din Republica Moldova',
		'Proiecte educaționale, culturale și civice cu beneficiari reali'
	];

	const exempleImpact = $derived([
		{ label: 'Asociații membre', value: data.stats.membre },
		{ label: 'Orașe universitare', value: data.stats.orase },
		{ label: 'Membri ai biroului', value: data.stats.birou }
	]);
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-hero   { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
		.anim-section { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.12s; }
		@media (prefers-reduced-motion: reduce) {
			.anim-hero, .anim-section { animation: none; }
		}
	</style>
</svelte:head>

<div class="mx-auto w-full">
	<!-- Hero — terse professional identity -->
	<section class="relative overflow-hidden bg-oxford-dark text-white">
		<div
			class="absolute inset-0 opacity-20"
			style:background-size="28px 28px"
			style:background-image="radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)"
		></div>
		<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
			<span
				class="anim-hero inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sunglow"
			>
				Organizație
			</span>
			<h1 class="anim-hero mt-6 text-4xl md:text-5xl font-bold leading-tight">
				Federație la O privire
			</h1>
			<p class="anim-hero mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
				Federația Tinerilor Basarabeni este o federație care reunește asociațiile
				studențești și de tineret basarabene active în România. Aici găsiți
				structura, transparența și rezultatele organizației.
			</p>
			<div class="anim-hero mt-8 flex flex-wrap justify-center gap-3">
				<a
					href="/org/structura-organizatie"
					class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-6 py-3 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Structura organizației
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/org/transparenta"
					class="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Transparență
				</a>
			</div>
		</div>
	</section>

	<!-- Stats — real, from existing data sources -->
	<section class="border-b border-bg-alt bg-bg">
		<div class="mx-auto grid max-w-4xl grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-10">
			{#each exempleImpact as { label, value }}
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-oxford">{value}</div>
					<div class="mt-1 text-sm font-semibold text-text">{label}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Quick links -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">În această secțiune</p>
			<h2 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-text">
				Caută în organizație
			</h2>
			<div class="mt-8 grid gap-4 md:grid-cols-3">
				{#each quickLinks as { href, title, desc }}
					<a
						href={href}
						class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-6 no-underline"
					>
						<h3 class="font-semibold text-text leading-snug group-hover:text-oxford transition-colors">{title}</h3>
						<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">{desc}</p>
						<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
							Deschide
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Parteneriate — SECTION of /org (per IA guardrail) -->
	<section id="parteneriate" class="anim-section scroll-mt-24 border-t border-bg-alt bg-bg py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">Parteneriate</p>
			<h2 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-text">
				Hai să colaborăm
			</h2>
			<p class="mt-4 max-w-2xl text-base text-text-muted leading-relaxed">
				Fie că reprezinți o instituție, o companie sau o organizație care susține
				cauza noastră, îți prezentăm cu ce poți contribui la comunitatea noastră.
			</p>
			<ul class="mt-8 grid gap-3 sm:grid-cols-1 max-w-2xl">
				{#each deCeParteneri as item}
					<li class="flex items-start gap-3 rounded-xl border border-bg-alt bg-white p-4 text-sm text-text leading-relaxed">
						<i class="fa-solid fa-check mt-0.5 text-cerry" aria-hidden="true"></i>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-lg bg-oxford px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
				>
					Propunere de parteneriat
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>

			<!-- Current / past partners — honest pending state, no fabricated names -->
			<div class="mt-10">
				<Placeholder label="Parteneri actuali și trecuți — de completat după confirmarea datelor de către colegi" tone="warning">
					<p class="text-sm text-text-muted leading-relaxed">
						Lista partenerilor și finanțatorilor actuali și din trecut va apărea aici.
					</p>
				</Placeholder>
			</div>
		</div>
	</section>

	<!-- Impact — SECTION of /org, demo-labelled samples -->
	<section class="anim-section border-t border-bg-alt bg-white py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">Impact</p>
			<h2 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-text">
				Rezultate
			</h2>
			<p class="mt-4 max-w-2xl text-base text-text-muted leading-relaxed">
				Rezultatele agregate ale activității noastre — raportate pe perioade, pe
				proiecte și cu metodologia. Mai jos vezi doar exemplul de structură.
			</p>

			<Placeholder
				label="Raport de impact — exemple demonstrative. Datele reale se vor valida cu colegii înainte de publicare."
				tone="content"
			>
				<div class="mt-4 rounded-2xl border border-bg-alt bg-bg p-6">
					<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">Exemplu demonstrativ</p>
					<dl class="mt-4 grid gap-4 sm:grid-cols-3">
						<div>
							<dt class="text-sm text-text-muted">Beneficiari în perioada</dt>
							<dd class="text-2xl font-bold text-oxford">—</dd>
						</div>
						<div>
							<dt class="text-sm text-text-muted">Evenimente organizate</dt>
							<dd class="text-2xl font-bold text-oxford">—</dd>
						</div>
						<div>
							<dt class="text-sm text-text-muted">Voluntari implicați</dt>
							<dd class="text-2xl font-bold text-oxford">—</dd>
						</div>
					</dl>
				</div>
			</Placeholder>

			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href="/proiecte"
					class="inline-flex items-center gap-2 rounded-lg bg-oxford px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
				>
					Vezi proiectele
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>
		</div>
	</section>

	<!-- Cross-link — warm audience overview -->
	<section class="border-t border-bg-alt bg-bg py-10">
		<div class="mx-auto max-w-5xl px-6">
			<p class="text-sm text-text-muted leading-relaxed">
				Cauți o prezentare mai caldă, orientată spre studenți? Vezi
				<a href="/despre-noi" class="text-blue no-underline hover:text-oxford transition-colors">Despre noi</a>.
			</p>
		</div>
	</section>
</div>
