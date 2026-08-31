<script lang="ts">
	import Placeholder from '$lib/components/Placeholder.svelte';
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.anim-hero { animation: fadeInUp 0.6s ease-out both; animation-delay: 0.05s; }
		@media (prefers-reduced-motion: reduce) { .anim-hero { animation: none; } }
	</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero">
		<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">
			<a href="/org" class="no-underline hover:text-oxford transition-colors text-blue">Organizație</a>
		</p>
		<h1 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Transparență</h1>
		<p class="text-text-muted mt-2 mb-4 max-w-2xl leading-relaxed">
			Identitatea legală, finanțele, rapoartele anuale și politicile federației.
			Documentele oficiale sunt publicate aici după verificare și aprobare.
		</p>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>
	</div>

	<div class="anim-hero space-y-10">
		<!-- Legal identity -->
		<section class="rounded-2xl border border-bg-alt bg-white p-6 lg:p-8">
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-2">Identitate legală</h2>
			<p class="text-sm text-text-muted leading-relaxed">
				Statutul, datele de înregistrare și documentele constitutive.
			</p>

			<div class="mt-6 grid gap-3 sm:grid-cols-2">
				<div class="rounded-xl bg-bg border border-bg-alt p-4">
					<p class="text-sm font-semibold text-text">Denumire</p>
					<p class="text-sm text-text-muted mt-1">Federația Tinerilor Basarabeni</p>
				</div>
				<div class="rounded-xl bg-bg border border-bg-alt p-4">
					<p class="text-sm font-semibold text-text">Înființare legală</p>
					<p class="text-sm text-text-muted mt-1">24 septembrie 2021</p>
				</div>
			</div>

			<Placeholder
				label="Documente legale (statut, înregistrare, ROOF) — de publicat după clasificare și aprobare"
				id="legal-docs"
				tone="content"
			>
				<ul class="mt-3 space-y-2 text-sm text-text-muted">
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-file-lines text-blue" aria-hidden="true"></i>
						Statut — de publicat
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-file-lines text-blue" aria-hidden="true"></i>
						Act de înregistrare — de publicat
					</li>
				</ul>
			</Placeholder>
		</section>

		<!-- Financials -->
		<section class="rounded-2xl border border-bg-alt bg-white p-6 lg:p-8">
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-2">Finanțe</h2>
			<p class="text-sm text-text-muted leading-relaxed">
				Bugetul și situațiile financiare pe ani de activitate.
			</p>
			<Placeholder
				label="Situații financiare pe ani — de publicat după aprobare"
				id="financiar"
				tone="content"
			>
				<ul class="mt-3 space-y-2 text-sm text-text-muted">
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-file-invoice text-blue" aria-hidden="true"></i>
						Raport financiar — de publicat
					</li>
				</ul>
			</Placeholder>
		</section>

		<!-- Annual reports -->
		<section class="rounded-2xl border border-bg-alt bg-white p-6 lg:p-8">
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-2">Rapoarte anuale</h2>
			<p class="text-sm text-text-muted leading-relaxed">
				Arhiva rapoartelor de activitate și a proceselor verbale.
			</p>
			<Placeholder
				label="Rapoarte anuale + arhiva proceselor verbale — de publicat după clasificare și verificare informațiilor"
				id="rapoarte"
				tone="content"
			>
				<ul class="mt-3 space-y-2 text-sm text-text-muted">
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-file-arrow-down text-blue" aria-hidden="true"></i>
						Arhiva proceselor verbale — de publicat
					</li>
				</ul>
			</Placeholder>
		</section>

		<!-- Policies -->
		<section class="rounded-2xl border border-bg-alt bg-white p-6 lg:p-8">
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-2">Politici</h2>
			<p class="text-sm text-text-muted leading-relaxed">
				Politicile de reglementare internă ale organizației.
			</p>
			<Placeholder
				label="Politici interne (cod de conduită, regulament de admitere a membrilor) — de publicat după aprobare"
				id="politici"
				tone="content"
			>
				<ul class="mt-3 space-y-2 text-sm text-text-muted">
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-scale-balanced text-blue" aria-hidden="true"></i>
						Regulament de admitere a membrilor — de publicat
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-scale-balanced text-blue" aria-hidden="true"></i>
						Cod de conduită — de publicat
					</li>
				</ul>
			</Placeholder>
		</section>
	</div>
</div>
