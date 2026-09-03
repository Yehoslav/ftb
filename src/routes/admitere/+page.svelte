<script lang="ts">
	import type { PageProps } from './$types';
	import { getCategorieBySlug } from '$lib/data/resurse';

	let { data }: PageProps = $props();

	// svelte-ignore state_referenced_locally — one-time init din datele serverului
	const hub = data.hub ?? undefined;
	// svelte-ignore state_referenced_locally — one-time init din datele serverului
	const editie = data.editie ?? undefined;
	const resurse = getCategorieBySlug('admitere')?.items ?? [];

	const pasi = [
		{
			nr: '01',
			titlu: 'Alege unde vrei să studiezi',
			desc: 'Orientare în oferta educațională a universităților din România — la Târgul Universităților sau online.',
			href: '/proiecte/targul-universitatilor',
			cta: 'Explorează ofertele',
			icon: 'fa-solid fa-graduation-cap'
		},
		{
			nr: '02',
			titlu: 'Aplică la facultatea aleasă',
			desc: 'Etapele înscrierii la universitate pentru cetățenii moldoveni — termene, dosar, documente.',
			href: '/ghiduri/inscrie-te-la-universitate',
			cta: 'Ghidul de înscriere',
			icon: 'fa-solid fa-building-columns'
		},
		{
			nr: '03',
			titlu: 'Obține viza de studii',
			desc: 'Documente, termene și procedura de aplicare pentru viza de studii în România.',
			href: '/ghiduri/aplica-pentru-viza-de-studii',
			cta: 'Ghidul pentru viză',
			icon: 'fa-solid fa-location-dot'
		},
		{
			nr: '04',
			titlu: 'Rezolvă actele de ședere',
			desc: 'Pas-cu-pas pentru obținerea actelor de ședere temporară, după ce ajungi în România.',
			href: '/ghiduri/aplica-pentru-acte-de-sedere-temporara',
			cta: 'Ghidul actelor de ședere',
			icon: 'fa-solid fa-scale-balanced'
		}
	];

	function pasNext(i: number): { href: string; label: string } {
		const next = pasi[i + 1];
		if (next) {
			return { href: next.href, label: `Pasul următor: ${next.titlu}` };
		}
		return { href: '/student-in-romania', label: 'După admitere: Student în România' };
	}
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
		.anim-hero {
			animation: fadeInUp 0.6s ease-out both;
			animation-delay: 0.05s;
		}
		.anim-section {
			animation: fadeInUp 0.6s ease-out both;
			animation-delay: 0.05s;
		}
		.card-hover {
			transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
		}
		.card-hover:hover {
			transform: translateY(-3px);
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
		}
		@media (prefers-reduced-motion: reduce) {
			.anim-hero,
			.anim-section {
				animation: none;
			}
			.card-hover:hover {
				transform: none;
			}
		}
	</style>
</svelte:head>

<div class="mx-auto w-full">
	<!-- Hero -->
	<section class="relative overflow-hidden bg-oxford-dark text-white">
		<div
			class="absolute inset-0 opacity-20"
			style:background-size="28px 28px"
			style:background-image="radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)"
		></div>
		<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
			<span
				class="anim-hero inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sunglow"
			>
				Admitere • Studii în România
			</span>
			<h1 class="anim-hero mt-6 text-4xl md:text-5xl font-bold leading-tight">
				Admitere în România
			</h1>
			<p class="anim-hero mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
				Tot ce trebuie să știi ca să-ți continui studiile în România — de la alegerea
				facultății și înscriere, până la viză și actele de ședere.
			</p>
			<div class="anim-hero mt-8 flex flex-wrap justify-center gap-3">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-7 py-3 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Întreabă-ne direct
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/ghiduri#admitere"
					class="inline-flex items-center rounded-lg border border-white/30 px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Ghidurile complete
				</a>
			</div>
		</div>
	</section>

	<!-- Settled-student pointer -->
	<section class="border-b border-bg-alt bg-white">
		<div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
			<div class="flex items-center gap-3">
				<i class="fa-solid fa-graduation-cap text-blue text-lg" aria-hidden="true"></i>
				<p class="text-sm text-text">
					<span class="font-semibold">Ești deja student?</span>
					<span class="text-text-muted">
						Treci direct la resursele pentru viața de student în România.
					</span>
				</p>
			</div>
			<a
				href="/student-in-romania"
				class="inline-flex items-center gap-1.5 rounded-lg border border-blue/30 px-4 py-2 text-sm font-medium text-blue no-underline transition-colors hover:bg-blue-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
			>
				Începe aici
				<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
			</a>
		</div>
	</section>

	<!-- Period + status -->
	{#if editie}
		<section class="border-b border-bg-alt bg-bg">
			<div class="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-6 py-4 text-center">
				<span
					class="inline-flex items-center gap-2 rounded-full bg-white border border-bg-alt px-4 py-1.5 text-sm font-medium text-text"
				>
					<i class="fa-solid fa-calendar-plus text-blue" aria-hidden="true"></i>
					{editie.titlu} • {editie.perioada}
				</span>
			</div>
		</section>
	{/if}

	<!-- Steps -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-12 text-center">
				<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
					Patru pași până la facultate
				</h2>
				<p class="mx-auto mt-3 max-w-xl text-text-muted text-base font-light leading-relaxed">
					Fiecare pas are un ghid pas-cu-pas. Ți-l punem la dispoziție — tu doar urmezi.
				</p>
			</div>

			<ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each pasi as pas, i}
					<li class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5">
						<a href={pas.href} class="flex flex-1 flex-col no-underline">
							<div class="mb-4 flex items-center justify-between">
								<span class="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-lg text-blue">
									<i class="{pas.icon}" aria-hidden="true"></i>
								</span>
								<span class="text-3xl font-bold text-bg-alt">{pas.nr}</span>
							</div>
							<h3 class="font-semibold text-text leading-snug">{pas.titlu}</h3>
							<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">{pas.desc}</p>
							<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
								{pas.cta}
								<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
							</span>
						</a>
						<div class="mt-4 border-t border-bg-alt pt-3">
							<a
								href={pasNext(i).href}
								class="inline-flex items-center gap-1.5 text-xs font-medium text-oxford no-underline transition-colors hover:text-blue"
							>
								{pasNext(i).label}
								<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
							</a>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Resources -->
	<section class="anim-section border-t border-bg-alt bg-bg py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
						Resursele complete
					</h2>
					<p class="text-text-muted text-sm font-light mt-2">
						Ghiduri detaliate pentru fiecare etapă a admiterii
					</p>
				</div>
				<a
					href="/ghiduri"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
				>
					Toate ghidurile
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{#each resurse as item}
					<a
						href="/ghiduri/{item.slug}"
						class="card-hover group block rounded-xl border border-bg-alt bg-white p-5 no-underline"
					>
						<h3 class="font-semibold text-text group-hover:text-oxford transition-colors">
							{item.title}
						</h3>
						<p class="text-sm text-text-muted mt-2 leading-relaxed">{item.description}</p>
						<span class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue">
							Citește mai mult
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- How FTB helps -->
	{#if hub && editie}
		<section class="anim-section bg-white py-16 md:py-20">
			<div class="mx-auto max-w-6xl px-6">
				<div class="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 items-start">
					<div>
						<span class="inline-block rounded-full bg-blue-light px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue">
							Campania AdmiteRO
						</span>
						<h2 class="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Hai să te ducem până la capăt
						</h2>
						<p class="mt-5 text-base text-text-muted leading-relaxed">
							{hub.descriere}
						</p>
						<p class="mt-4 text-base text-text-muted leading-relaxed">
							{editie.descriere}
						</p>
						<div class="mt-7 flex flex-wrap gap-4">
							<a
								href="/proiecte/admiteri/admitere-{editie.an}"
								class="inline-flex items-center gap-2 rounded-lg bg-oxford px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
							>
								Vezi ediția curentă
								<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
							</a>
							<a
								href="/proiecte/admiteri"
								class="inline-flex items-center rounded-lg border border-bg-alt px-6 py-3 text-sm font-medium text-oxford no-underline transition-colors hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
							>
								Despre AdmiteRO
							</a>
						</div>
					</div>

					{#if editie.statistici.length > 0}
						<dl class="rounded-2xl border border-bg-alt bg-bg p-7 md:p-9">
							<h3 class="text-sm font-semibold uppercase tracking-widest text-text-muted mb-5">
								Echipa ediției curente, în cifre
							</h3>
							{#each editie.statistici as stat}
								<div class="flex items-baseline justify-between gap-6 border-b border-bg-alt py-3.5 last:border-b-0 last:pb-0">
									<dt class="text-sm text-text-muted leading-snug">{stat.label}</dt>
									<dd class="text-lg font-bold text-oxford tabular-nums whitespace-nowrap">{stat.value}</dd>
								</div>
							{/each}
						</dl>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<!-- CTA -->
	<section class="bg-oxford py-16 md:py-20 text-white">
		<div class="mx-auto max-w-2xl px-6 text-center">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
				Ai întrebări despre admitere?
			</h2>
			<p class="mx-auto max-w-md text-base font-light text-white/70 leading-relaxed mb-8">
				Scrie-ne — răspundem prin asociațiile noastre din toate centrele universitare.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-7 py-3.5 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Contactează-ne
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/organizatii-studentesti"
					class="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Asociațiile pe orașe
				</a>
			</div>
		</div>
	</section>
</div>