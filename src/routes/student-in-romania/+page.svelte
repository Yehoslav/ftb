<script lang="ts">
	import type { PageProps } from './$types';
	import { getResursaBySlug, type ResurseItem } from '$lib/data/resurse';
	import Placeholder from '$lib/components/Placeholder.svelte';

	let { data }: PageProps = $props();

	const ghiziStudenti = [
		'aplica-pentru-acte-de-sedere-temporara',
		'rute-transport',
		'romanian-courses',
		'viziteaza-romania'
	]
		.map((slug) => getResursaBySlug(slug))
		.filter((g): g is ResurseItem => g !== undefined);

	// svelte-ignore state_referenced_locally — one-time init din datele serverului
	const evenimenteVitoare = data.evenimenteVitoare;

	const orase = $derived(
		[...new Set(data.membri.map((m) => m.oras).filter(Boolean))].sort((a, b) =>
			a.localeCompare(b, 'ro')
		)
	);

	const dateOpts: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};

	const ghiziIcons: Record<string, string> = {
		'aplica-pentru-acte-de-sedere-temporara': 'fa-solid fa-scale-balanced',
		'rute-transport': 'fa-solid fa-location-dot',
		'romanian-courses': 'fa-solid fa-building-columns',
		'viziteaza-romania': 'fa-solid fa-seedling'
	};
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
	<section class="relative overflow-hidden bg-oxford text-white">
		<div
			class="absolute inset-0 opacity-20"
			style:background-size="28px 28px"
			style:background-image="radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)"
		></div>
		<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
			<span
				class="anim-hero inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sunglow"
			>
				Viața de student • România
			</span>
			<h1 class="anim-hero mt-6 text-4xl md:text-5xl font-bold leading-tight">
				Student în România
			</h1>
			<p class="anim-hero mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
				Ai ajuns și te-ai înscris? Aici găsești tot ce ține de viața ta de student:
				actele de ședere, transport, limba română, comunitatea din orașul tău și cum
				te poți implica.
			</p>
			<div class="anim-hero mt-8 flex flex-wrap justify-center gap-3">
				<a
					href="#ghiduri"
					class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-7 py-3 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Ghidurile practice
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/organizatii-studentesti"
					class="inline-flex items-center rounded-lg border border-white/30 px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Comunitatea pe orașe
				</a>
			</div>
		</div>
	</section>

	<!-- Practical guides -->
	<section id="ghiduri" class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-12 text-center">
				<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
					Ghiduri practice pentru viața de student
				</h2>
				<p class="mx-auto mt-3 max-w-xl text-text-muted text-base font-light leading-relaxed">
					Documente, transport, limba și lucrurile de zi cu zi — după ce ai ajuns.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{#each ghiziStudenti as ghid}
					<a
						href="/ghiduri/{ghid.slug}"
						class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5 no-underline"
					>
						<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-light text-blue">
							<i class="{ghiziIcons[ghid.slug] ?? 'fa-solid fa-lightbulb'} text-lg" aria-hidden="true"></i>
						</div>
						<h3 class="font-semibold text-text leading-snug group-hover:text-oxford transition-colors">
							{ghid.title}
						</h3>
						<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">{ghid.description}</p>
						<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
							Citește ghidul
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Community by city / Help in my city -->
	<section class="anim-section border-t border-bg-alt bg-bg py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
						Comunitatea din orașul tău
					</h2>
					<p class="text-text-muted text-sm font-light mt-2">
						Descoperă asociațiile studențești basarabene din centrul universitar în care ești.
					</p>
				</div>
				<a
					href="/organizatii-studentesti"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
				>
					Toate organizațiile
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each orase as oras}
					<a
						href="/organizatii-studentesti?oras={encodeURIComponent(oras)}"
						class="inline-flex items-center gap-1.5 rounded-full border border-bg-alt bg-white px-4 py-2 text-sm font-medium text-text no-underline transition-colors hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
					>
						<i class="fa-solid fa-location-dot text-xs text-blue" aria-hidden="true"></i>
						{oras}
					</a>
				{/each}
			</div>

			<!-- Help in my city — broader city-support concept, details pending confirmation -->
			<Placeholder
				label="Ajutor în orașul meu — ghid de sprijin local per oraș (date de confirmat cu colegii)"
				tone="warning"
			>
				<div class="mt-10 rounded-2xl border border-bg-alt bg-white p-6 md:p-8">
					<span
						class="inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange"
					>
						În dezvoltare
					</span>
					<h3 class="mt-3 text-xl font-bold tracking-tight text-text">
						Ajutor în orașul meu
					</h3>
					<p class="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
						Pe lângă asociațiile membre, vrem să-ți oferim un ghid de sprijin local pentru
						fiecare oraș universitar — ce ai de rezolvat când ajungi, unde găsești ajutor și
						cine te poate îndruma pas cu pas.
					</p>
					<p class="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
						Detaliile acestui program sunt în pregătire și se adaugă după confirmarea datelor
						cu colegii. Între timp, începe cu
						<a href="/organizatii-studentesti" class="text-blue no-underline hover:text-oxford transition-colors">
							asociațiile din orașul tău
						</a>.
					</p>
				</div>
			</Placeholder>
		</div>
	</section>

	<!-- Involvement -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
						Implică-te
					</h2>
					<p class="text-text-muted text-sm font-light mt-2">
						Proiecte și evenimente la care poți participa ca student.
					</p>
				</div>
				<a
					href="/proiecte"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
				>
					Toate proiectele
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<!-- Demo opportunity — form tested, real data pending -->
				<Placeholder
					label="Oportunitate demonstrativă — formă de testat; datele reale se confirmă cu colegii"
					tone="warning"
				>
					<article class="flex h-full flex-col rounded-2xl border border-bg-alt bg-bg p-6">
						<div class="flex items-center gap-2">
							<span class="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
								Exemplu demonstrativ
							</span>
						</div>
						<h3 class="mt-3 text-lg font-bold tracking-tight text-text">
							Voluntar într-un proiect FTB (exemplu)
						</h3>
						<dl class="mt-4 space-y-2.5 text-sm">
							<div class="flex items-start justify-between gap-4 border-b border-bg-alt pb-2.5">
								<dt class="text-text-muted">Disponibilitate</dt>
								<dd class="font-medium text-text">Înscrieri deschise — de confirmat</dd>
							</div>
							<div class="flex items-start justify-between gap-4 border-b border-bg-alt pb-2.5">
								<dt class="text-text-muted">Eligibilitate</dt>
								<dd class="font-medium text-text">Studenți basarabeni în România</dd>
							</div>
							<div class="flex items-start justify-between gap-4 border-b border-bg-alt pb-2.5">
								<dt class="text-text-muted">Locație</dt>
								<dd class="font-medium text-text">Orașele FTB sau remote</dd>
							</div>
							<div class="flex items-start justify-between gap-4 border-b border-bg-alt pb-2.5">
								<dt class="text-text-muted">Angajament</dt>
								<dd class="font-medium text-text">~4–6 ore/săptămână</dd>
							</div>
							<div class="flex items-start justify-between gap-4">
								<dt class="text-text-muted">Termen</dt>
								<dd class="font-medium text-text">De confirmat</dd>
							</div>
						</dl>
						<a
							href="/contact"
							class="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-oxford px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
						>
							Aplică
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</a>
						<p class="mt-3 text-xs text-text-muted leading-relaxed">
							Aceasta este o oportunitate demonstrativă, folosită pentru a testa forma. Nu
							presupune o înscriere reală.
						</p>
					</article>
				</Placeholder>

				<!-- Upcoming events -->
				<div class="flex h-full flex-col">
					<h3 class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
						<i class="fa-solid fa-calendar-plus text-blue" aria-hidden="true"></i>
						Evenimente viitoare
					</h3>
					<div class="flex flex-1 flex-col divide-y divide-bg-alt rounded-2xl border border-bg-alt bg-white">
						{#each evenimenteVitoare as ev}
							<a
								href="/evenimente/{ev.slug}"
								class="flex items-center gap-3 px-4 py-4 no-underline transition-colors hover:bg-bg-alt/50"
							>
								<span class="min-w-0 flex-1">
									<span class="block truncate font-semibold text-text">{ev.title}</span>
									<span class="block truncate text-sm text-text-muted">
										{ev.location} • {new Date(ev.date).toLocaleString('ro', dateOpts)}
									</span>
								</span>
								<i class="fa-solid fa-arrow-right text-sm text-blue" aria-hidden="true"></i>
							</a>
						{/each}
					</div>
					<a
						href="/evenimente"
						class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
					>
						Toate evenimentele
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- News -->
	{#if data.posts.length > 0}
		<section class="anim-section border-t border-bg-alt bg-bg py-16 md:py-20">
			<div class="mx-auto max-w-6xl px-6">
				<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Știri pentru studenți
						</h2>
						<p class="text-text-muted text-sm font-light mt-2">
							Ultimele anunțuri și noutăți de la FTB.
						</p>
					</div>
					<a
						href="/noutati"
						class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
					>
						Toate noutățile
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</a>
				</div>

				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.posts as post}
						<a
							href="/noutati/{post.slug}"
							class="card-hover group block rounded-xl border border-bg-alt bg-white p-5 no-underline"
						>
							<time class="text-xs uppercase tracking-widest text-text-muted">
								{new Date(post.date).toLocaleString('ro', dateOpts)}
							</time>
							<h3 class="mt-2 font-semibold text-text leading-snug group-hover:text-oxford transition-colors">
								{post.title}
							</h3>
							{#if post.excerpt}
								<p class="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
									{post.excerpt.replace(/(<([^>]+)>)/gi, '').trim()}
								</p>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- CTA -->
	<section class="bg-oxford py-16 md:py-20 text-white">
		<div class="mx-auto max-w-2xl px-6 text-center">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
				Ai o întrebare despre viața de student?
			</h2>
			<p class="mx-auto max-w-md text-base font-light text-white/70 leading-relaxed mb-8">
				Scrie-ne — asociațiile noastre din toate centrele universitare te pot îndruma.
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
