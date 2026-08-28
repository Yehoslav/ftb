<script lang="ts">
	import type { PageProps } from "./$types";
	import logoIcon from "$lib/assets/FTB_logo_long_default-2_1.png";
	import {
		huburi,
		getHubBySlug,
		getEditieCurenta,
		etichetaStare,
		editii,
		type ProiectHub,
		type ProiectEditie,
	} from "$lib/data/proiecte";
	import type { MembruEchipa } from "$lib/data/echipa";

	let { data }: PageProps = $props();

	const dateOpts: Intl.DateTimeFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	function toWebp(srcSet: string | null | undefined): string | undefined {
		return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, ".webp$2");
	}

	/* Dashboard quick actions — the "where do you want to go" hub */
	const actions = [
		{
			href: "/ghiduri#admitere",
			title: "Admitere în România",
			desc: "Ghiduri pas-cu-pas pentru studii în România: înscriere, viză, acte de ședere.",
			icon: "fa-solid fa-graduation-cap",
			iconBg: "bg-blue-light text-blue",
			span: "sm:col-span-2 lg:col-span-2",
		},
		{
			href: "/proiecte",
			title: "Proiecte",
			desc: "Campanii și programe anuale: AdmiteRO, Târgul Universităților, Summit și altele.",
			icon: "fa-solid fa-lightbulb",
			iconBg: "bg-bg-alt text-orange",
			span: "",
		},
		{
			href: "/evenimente",
			title: "Evenimente",
			desc: "Ce urmează — activități și întâlniri pentru tinerii basarabeni.",
			icon: "fa-solid fa-calendar-plus",
			iconBg: "bg-bg-alt text-cerry",
			span: "",
		},
		{
			href: "/ghiduri#ghiduri",
			title: "Resurse & Ghiduri",
			desc: "Ghiduri de implicare civică, scriere de proiecte și finanțări pentru tineri.",
			icon: "fa-solid fa-handshake",
			iconBg: "bg-bg-alt text-blue",
			span: "sm:col-span-2 lg:col-span-2",
		},
		{
			href: "/noutati",
			title: "Noutăți",
			desc: "Articole, anunțuri și actualizări despre activitatea FTB România.",
			icon: "fa-regular fa-newspaper",
			iconBg: "bg-blue-light text-blue",
			span: "",
		},
		{
			href: "/organizatii-membre",
			title: "Organizații Membre",
			desc: "16+ asociații de studenți și tineri basarabeni din centrele universitare.",
			icon: "fa-solid fa-users",
			iconBg: "bg-bg-alt text-oxford",
			span: "",
		},
		{
			href: "/echipa",
			title: "Echipă",
			desc: "Cunoaște oamenii din spatele celor 16 asociații ale federației.",
			icon: "fa-solid fa-university",
			iconBg: "bg-bg-alt text-cerry",
			span: "",
		},
		{
			href: "/ghiduri#resurse-generale",
			title: "Rute de transport",
			desc: "Cum ajungi din Republica Moldova în România — autobuze, trenuri, microbuze.",
			icon: "fa-solid fa-location-dot",
			iconBg: "bg-blue-light text-blue",
			span: "",
		},
	] as const;

	const targulImg =
		"https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg";

	/* National partners & funders — placeholder names pending confirmation from colleagues */
	const partners: string[] = [
		"Agenția Națională pentru Tineret",
		"Ministerul Educației",
		"Guvernul Republicii Moldova",
		"Universitatea Babeș-Bolyai",
		"Fundacja / ONG partener",
	];

	/* Featured project — the flagship, currently AdmiteRO during admission season */
	const featuredProject: { hub: ProiectHub; editie: ProiectEditie; imagine?: string } | null = (() => {
		const hub = huburi.find((h) => h.slug === "admiteri");
		const editie = hub ? getEditieCurenta(hub.slug) : undefined;
		if (!hub || !editie) return null;
		return {
			hub,
			editie,
			imagine:
				"https://www.ftbromania.ro/wp-content/uploads/2022/08/Targul-universitatilor-1170x658.jpg",
		};
	})();

	/* Momentum — the other projects currently in progress or next up (excluding featured) */
	const otherProjects: Array<{ editie: ProiectEditie; hub: ProiectHub }> = editii
		.filter((e) => e.stare === "in-desfasurare" || e.stare === "planificat")
		.sort((a, b) => a.an - b.an)
		.map((e) => ({ editie: e, hub: getHubBySlug(e.proiectSlug) }))
		.filter((x): x is { editie: ProiectEditie; hub: ProiectHub } => x.hub !== undefined)
		.filter(
			(x, i, arr) => arr.findIndex((y) => y.hub.slug === x.hub.slug) === i
		)
		.filter((x) => x.hub.slug !== (featuredProject?.hub.slug ?? "__none__"))
		.slice(0, 3);

	/* Team data (reactive) for the "Despre noi" showcase layouts */
	const echipa = $derived(data.echipa ?? []);
	const board = $derived(echipa.filter((m) => m.categorie === "birou"));

	function initials(nume: string): string {
		return nume
			.split(" ")
			.map((w) => w[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}

	/* Modal — selected team member */
	let selected = $state<MembruEchipa | null>(null);
	let dialog = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (selected) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
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
		.anim-stats {
			animation: fadeInUp 0.6s ease-out both;
			animation-delay: 0.12s;
		}
		.anim-actions {
			animation: fadeInUp 0.6s ease-out both;
			animation-delay: 0.2s;
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
			box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
		}

		.action-arrow {
			transition: transform 0.2s ease;
		}
		.action-card:hover .action-arrow {
			transform: translateX(3px);
		}

		@media (prefers-reduced-motion: reduce) {
			.anim-hero, .anim-stats, .anim-actions, .anim-section {
				animation: none;
			}
			.card-hover:hover {
				transform: none;
			}
			.action-card:hover .action-arrow {
				transform: none;
			}
		}
	</style>
	<link
		rel="preload"
		as="image"
		href="https://ftbromania.ro/incubator/wp-content/uploads/2022/08/homepage_image.webp"
		fetchpriority="high"
	/>
</svelte:head>

<div class="mx-auto w-full">
	<!-- 1. Hero — who we are, in short -->
	<section
		class="relative overflow-hidden bg-oxford-dark text-white"
	>
		<div
			class="absolute inset-0 opacity-20"
			style:background-size="28px 28px"
			style:background-image="radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)"
		></div>
		<img
			src={logoIcon}
			alt=""
			aria-hidden="true"
			class="absolute w-[360px] opacity-[0.08] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-0 invert pointer-events-none"
		/>

		<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28 text-center">
			<span
				class="anim-hero inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sunglow"
			>
				Federația Tinerilor Basarabeni
			</span>
			<h1 class="anim-hero mt-6 text-4xl md:text-5xl font-bold leading-tight">
				Unim studenții și tinerii basarabeni din toată România
			</h1>
			<p class="anim-hero mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
				Suntem o federație care reunește asociațiile studențești și de tineret
				basarabene active în România — sprijinind admiterea, integrarea și
				implicarea civică a tinerilor.
			</p>
			<div class="anim-hero mt-8 flex flex-wrap justify-center gap-3">
				<a
					href="/ghiduri#admitere"
					class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-7 py-3 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Începe admiterea în România
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/despre-noi"
					class="inline-flex items-center rounded-lg border border-white/30 px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Despre noi
				</a>
			</div>
		</div>
	</section>

	<!-- 2. Audience — "unde pornești?" visitor match -->
	<section class="anim-actions bg-white py-14 md:py-16">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-8 text-center">
				<h2 class="text-2xl lg:text-3xl font-bold tracking-tight text-text">
					De unde pornești?
				</h2>
				<p class="mx-auto mt-2 max-w-xl text-text-muted text-sm font-light">
					Spune-ne cine ești și te îndrumăm exact acolo unde ai nevoie.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<a
					href="/ghiduri#admitere"
					class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5 no-underline"
				>
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-light text-blue">
						<i class="fa-solid fa-graduation-cap text-lg" aria-hidden="true"></i>
					</div>
					<h3 class="font-semibold text-text leading-snug">Elev / student</h3>
					<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">
						Vrei să studiezi în România? Începe de la ghidul de admitere.
					</p>
					<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
						Ghid de admitere
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</span>
				</a>

				<a
					href="/organizatii-membre"
					class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5 no-underline"
				>
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-bg-alt text-oxford">
						<i class="fa-solid fa-users text-lg" aria-hidden="true"></i>
					</div>
					<h3 class="font-semibold text-text leading-snug">Organizație studențească</h3>
					<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">
						Conduci o asociație locală? Alătură-te rețelei naționale și câștigă o voce comună.
					</p>
					<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
						Organizații membre
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</span>
				</a>

				<a
					href="/proiecte"
					class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5 no-underline"
				>
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-bg-alt text-cerry">
						<i class="fa-solid fa-handshake text-lg" aria-hidden="true"></i>
					</div>
					<h3 class="font-semibold text-text leading-snug">Vreau să mă implic</h3>
					<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">
						Ca voluntar sau ca tânăr care vrea să participe la proiecte.
					</p>
					<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
						Vezi proiectele
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</span>
				</a>

				<a
					href="/contact"
					class="card-hover group flex flex-col rounded-2xl border border-bg-alt bg-bg p-5 no-underline"
				>
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sunglow/20 text-sunglow">
						<i class="fa-solid fa-building-columns text-lg" aria-hidden="true"></i>
					</div>
					<h3 class="font-semibold text-text leading-snug">Partener / donator</h3>
					<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">
						Instituție națională, companie sau susținător — hai să colaborăm.
					</p>
					<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
						Contactează-ne
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</span>
				</a>
			</div>
		</div>
	</section>

	<!-- 3. Dashboard stats — quick proof points -->
	{#if data.info}
		{@const stats = [
			{
				val: parseInt(data.info.Nr_Org_Membre),
				label: "Organizații Membre",
				hint: "de studenți și tineri basarabeni, unite",
			},
			{
				val: parseInt(data.info.Nr_Voluntari),
				label: "Voluntari",
				suffix: "+",
				hint: "active în programe în fiecare an",
			},
			{
				val: parseInt(data.info.Nr_Parteneri),
				label: "Parteneri",
				hint: "instituții, universități și susținători",
			},
			{
				val: parseInt(data.info.Nr_Evenimente),
				label: "Evenimente Anuale",
				hint: "ateliere, forumuri și întâlniri",
			},
		]}
		<section class="anim-stats border-b border-bg-alt bg-bg">
			<div class="mx-auto max-w-5xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
				{#each stats as { val, label, suffix, hint }}
					<div class="text-center">
						<div class="text-3xl md:text-4xl font-bold text-oxford">
							{Number.isNaN(val) ? "—" : val}{suffix}
						</div>
						<div class="mt-1 text-sm font-semibold text-text">{label}</div>
						{#if hint}
							<div class="mt-1 mx-auto max-w-[14ch] text-xs text-text-muted leading-snug">{hint}</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- 4. Quick actions — the navigation hub -->
	<section class="anim-actions bg-white py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-10 text-center">
				<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
					Cu ce te putem ajuta?
				</h2>
				<p class="mx-auto mt-3 max-w-xl text-text-muted text-base font-light">
					Alege destinația potrivită — am organizat informația ca la un panou
					de plecări, ca să ajungi exact unde ai nevoie.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each actions as action}
					<a
						href={action.href}
						class="action-card card-hover group flex flex-col rounded-2xl border border-bg-alt bg-white p-5 no-underline {action.span}"
					>
						<div
							class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg {action.iconBg}"
						>
							<i class="{action.icon} text-lg" aria-hidden="true"></i>
						</div>
						<h3 class="font-semibold text-text leading-snug">{action.title}</h3>
						<p class="mt-1.5 flex-1 text-sm text-text-muted leading-relaxed">
							{action.desc}
						</p>
						<span
							class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue"
						>
							Mergi acolo
							<i
								class="action-arrow fa-solid fa-arrow-right text-xs"
								aria-hidden="true"
							></i>
						</span>
					</a>
				{/each}

				<!-- Real FTB photo tile → Târgul Universităților -->
				<a
					href="/proiecte/targul-universitatilor"
					class="action-card card-hover group relative overflow-hidden rounded-2xl border border-bg-alt sm:col-span-2 min-h-[220px] no-underline"
				>
					<img
						src={targulImg}
						alt="Târgul Universităților din România"
						class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
						decoding="async"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-oxford-dark/90 via-oxford-dark/40 to-transparent"
					></div>
					<div class="relative flex h-full min-h-[220px] flex-col justify-end p-5">
						<h3 class="font-bold text-white leading-snug">
							Târgul Universităților din România
						</h3>
						<p class="mt-1.5 text-sm text-white/80 leading-relaxed">
							Oferte educaționale și consiliere pentru absolvenții de liceu — ediție după ediție.
						</p>
						<span
							class="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sunglow"
						>
							Vezi proiectul
							<i
								class="action-arrow fa-solid fa-arrow-right text-xs"
								aria-hidden="true"
							></i>
						</span>
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- 5. Projects — featured + what's in progress -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="flex items-end justify-between mb-12">
				<div>
					<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
						Proiectele noastre
					</h2>
					<p class="text-text-muted text-sm font-light mt-2">
						Programe anuale și inițiative care contează
					</p>
				</div>
				<a
					href="/proiecte"
					class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
				>
					Toate proiectele
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>

			{#if featuredProject}
				{@const href = `/proiecte/${featuredProject.editie.proiectSlug}/${featuredProject.editie.slug}`}
				<article
					class="group relative overflow-hidden rounded-3xl bg-oxford-dark text-white"
				>
					{#if featuredProject.imagine}
						<img
							src={featuredProject.imagine}
							alt=""
							class="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
							loading="eager"
							decoding="async"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-oxford-dark via-oxford-dark/80 to-oxford-dark/30"
						></div>
					{/if}

					<div class="relative flex min-h-[420px] flex-col justify-end p-7 md:p-12">
						<div class="flex flex-wrap items-center gap-2">
							<span
								class="inline-flex items-center gap-2 rounded-full bg-sunglow px-3 py-1 text-xs font-semibold text-oxford"
							>
								<span class="relative flex h-2 w-2">
									<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-oxford opacity-60"></span>
									<span class="relative inline-flex h-2 w-2 rounded-full bg-oxford"></span>
								</span>
								{etichetaStare(featuredProject.editie.stare)}
							</span>
							<span
								class="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
							>
								{featuredProject.editie.perioada}
							</span>
						</div>

						<h2 class="mt-5 text-3xl lg:text-5xl font-bold tracking-tight">
							<a
								href={href}
								class="no-underline hover:text-sunglow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								{featuredProject.hub.titlu}
							</a>
						</h2>

						<p class="mt-4 max-w-2xl text-base lg:text-lg text-white/80 leading-relaxed">
							{featuredProject.editie.descriere}
						</p>

						<div class="mt-6 flex flex-wrap gap-1.5">
							{#each featuredProject.hub.domenii as domeniu}
								<span
									class="text-xs text-white/80 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full"
								>
									{domeniu}
								</span>
							{/each}
						</div>

						<div class="mt-8 flex flex-wrap gap-3">
							<a
								href={href}
								class="inline-flex items-center gap-2 rounded-lg bg-sunglow px-6 py-3 text-sm font-semibold text-oxford no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								Vezi ediția curentă
								<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
							</a>
							<a
								href="/proiecte/{featuredProject.hub.slug}"
								class="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								Despre {featuredProject.hub.titlu}
							</a>
						</div>
					</div>
				</article>
			{/if}

			{#if otherProjects.length > 0}
				<div class="mt-8 overflow-hidden rounded-2xl bg-oxford-dark text-white">
					<div class="grid md:grid-cols-[1fr_2fr]">
						<div class="flex flex-col justify-center gap-1 bg-oxford p-6 md:p-8">
							<span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sunglow">
								<span class="relative flex h-2 w-2">
									<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunglow opacity-75"></span>
									<span class="relative inline-flex h-2 w-2 rounded-full bg-sunglow"></span>
								</span>
								Acum & urmează
							</span>
							<h3 class="mt-3 text-2xl lg:text-3xl font-bold tracking-tight">
								Ce e în lucru
							</h3>
							<p class="mt-2 text-sm text-white/70 leading-relaxed">
								Și pe acestea le ridicăm acum — hai să te implici.
							</p>
						</div>

						<div class="divide-y divide-white/10">
							{#each otherProjects as { editie, hub }}
								<a
									href="/proiecte/{editie.proiectSlug}/{editie.slug}"
									class="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/5 no-underline"
								>
									<span
										class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white"
										style="background-color: {hub.culoare}"
									>
										<i class="fa-solid fa-calendar-plus text-lg" aria-hidden="true"></i>
									</span>
									<span class="min-w-0 flex-1">
										<span class="block truncate font-semibold text-white">
											{hub.titlu}
										</span>
										<span class="block truncate text-sm text-white/60">
											{editie.perioada}
										</span>
									</span>
									<span
										class="hidden sm:inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold
											{editie.stare === 'in-desfasurare' ? 'bg-sunglow text-oxford' : 'bg-white/15 text-white'}"
									>
										{etichetaStare(editie.stare)}
									</span>
									<i class="fa-solid fa-arrow-right text-sm text-white/50" aria-hidden="true"></i>
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<div class="mt-12 text-center sm:hidden">
				<a
					href="/proiecte"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline"
				>
					Toate proiectele
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
			</div>
		</div>
	</section>

	<!-- 6. Latest news — featured + compact list -->
	{#if data.posts.length > 0}
		{@const featured = data.posts[0]}
		{@const rest = data.posts.slice(1)}
		<section class="anim-section bg-bg py-16 md:py-20">
			<div class="mx-auto max-w-5xl px-6">
				<div class="flex items-end justify-between mb-12">
					<div>
						<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Ultimele noutăți
						</h2>
						<p class="text-text-muted text-sm font-light mt-2">
							Povești, anunțuri și momente de la FTB
						</p>
					</div>
					<a
						href="/noutati"
						class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors"
					>
						Vezi toate
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</a>
				</div>

				<div class="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
					<!-- Featured story -->
					{#if featured}
						{@const furl = `/noutati/${featured.slug}`}
						<article class="group">
							{#if featured.featuredImage?.node?.sourceUrl}
								<a href={furl} class="block aspect-[16/9] overflow-hidden rounded-2xl" tabindex="-1">
									<picture>
										<source
											type="image/webp"
											srcset={toWebp(featured.featuredImage.node.srcSet)}
											sizes="(max-width: 900px) 100vw, 600px"
										/>
										<img
											class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
											src={featured.featuredImage.node.sourceUrl}
											srcset={featured.featuredImage.node.srcSet ?? undefined}
											sizes="(max-width: 900px) 100vw, 600px"
											width={featured.featuredImage.node.mediaDetails?.width ?? undefined}
											height={featured.featuredImage.node.mediaDetails?.height ?? undefined}
											alt=""
											loading="lazy"
											decoding="async"
										/>
									</picture>
								</a>
							{/if}
							<time class="mt-6 block text-xs uppercase tracking-widest text-text-muted">
								{new Date(featured.date).toLocaleString("ro-RO", dateOpts)}
							</time>
							<h3 class="mt-3 text-2xl lg:text-3xl font-bold text-text leading-snug tracking-tight">
								<a
									href={furl}
									class="no-underline hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
								>
									{featured.title}
								</a>
							</h3>
							{#if featured.excerpt}
								<p class="mt-4 max-w-prose text-base text-text-muted leading-relaxed">
									{featured.excerpt.replace(/(<([^>]+)>)/gi, "").trim()}
								</p>
							{/if}
							<a
								href={furl}
								class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-oxford no-underline hover:text-blue transition-colors"
							>
								Citește articolul
								<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
							</a>
						</article>
					{/if}

					<!-- Headline list -->
					{#if rest.length > 0}
						<div class="flex flex-col">
							<p class="mb-4 border-b border-bg-alt pb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
								Mai recente
							</p>
							<ol class="flex flex-col divide-y divide-bg-alt">
								{#each rest as post}
									{@const url = `/noutati/${post.slug}`}
									<li class="py-5 first:pt-0 last:pb-0">
										<time class="text-xs uppercase tracking-widest text-text-muted">
											{new Date(post.date).toLocaleString("ro-RO", dateOpts)}
										</time>
										<h4 class="mt-2 text-lg font-semibold text-text leading-snug">
											<a
												href={url}
												class="no-underline hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
											>
												{post.title}
											</a>
										</h4>
										{#if post.excerpt}
											<p class="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
												{post.excerpt.replace(/(<([^>]+)>)/gi, "").trim()}
											</p>
										{/if}
									</li>
								{/each}
							</ol>
							<div class="mt-auto pt-5 sm:hidden">
								<a
									href="/noutati"
									class="inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline"
								>
									Vezi toate noutățile
									<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
								</a>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<!-- 7. Despre noi — mission -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-4xl px-6 text-center">
			<span class="mx-auto inline-block h-1.5 w-12 rounded-full bg-cerry" aria-hidden="true"></span>
			<h2 class="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-text">
				Cine suntem
			</h2>
			<p class="mx-auto mt-6 max-w-2xl text-base text-text-muted leading-relaxed">
				Federația Tinerilor Basarabeni reunește asociațiile studențești și de
				tineret basarabene active în România, oferindu-le sprijin, resurse și o
				voce comună în societatea românească. Din 2021 construim o comunitate
				care-i ajută pe tinerii basarabeni să studieze, să se integreze și să se
				implice — de la primii pași ai admisiei până la proiecte cu impact civic.
			</p>
			<dl class="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-bg-alt pt-8">
				<div>
					<dt class="text-3xl font-bold tabular-nums text-cerry">17</dt>
					<dd class="mt-1 text-sm text-text-muted">asociații membre</dd>
				</div>
				<div>
					<dt class="text-3xl font-bold tabular-nums text-oxford">16+</dt>
					<dd class="mt-1 text-sm text-text-muted">centre universitare</dd>
				</div>
				<div>
					<dt class="text-3xl font-bold tabular-nums text-blue">2021</dt>
					<dd class="mt-1 text-sm text-text-muted">anul înființării</dd>
				</div>
			</dl>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					href="/despre-noi"
					class="inline-flex items-center gap-2 rounded-lg bg-oxford px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
				>
					Mai multe despre noi
					<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
				</a>
				<a
					href="/echipa"
					class="inline-flex items-center rounded-lg border border-bg-alt px-5 py-2.5 text-sm font-medium text-oxford no-underline transition-colors hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
				>
					Toată echipa
				</a>
			</div>
		</div>
	</section>

	<!-- 8. Trust — partners & funders -->
	<section class="anim-section border-t border-bg-alt bg-white py-12 md:py-14">
		<div class="mx-auto max-w-5xl px-6">
			<p class="text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
				Parteneri instituționali și naționali
			</p>
			<ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
				{#each partners as partner}
					<li>
						<span
							class="block select-none rounded-lg border border-bg-alt bg-bg px-4 py-2 text-sm font-semibold text-text-muted"
							title="Logo {{partner}} — de înlocuit"
						>
							{partner}
						</span>
					</li>
				{/each}
			</ul>
			<p class="mt-6 text-center text-xs text-text-muted">
				Ca federație, colaborăm cu instituții naționale și ajungem la universități și
				primării prin asociațiile noastre membre. (logo-uri — date de confirmat)
			</p>
		</div>
	</section>

	<!-- 9. Team — LAYOUT A: Portrait tiles -->
	{#if board.length > 0}
		<section class="anim-section bg-bg py-16 md:py-20">
			<div class="mx-auto max-w-6xl px-6">
				<div class="mb-10 flex items-end justify-between">
					<div>
						<p class="text-xs font-semibold uppercase tracking-widest text-text-muted">Layout A</p>
						<h2 class="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Conducerea federației
						</h2>
					</div>
					<a href="/echipa" class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue no-underline hover:text-oxford transition-colors">
						Toată echipa
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</a>
				</div>

				<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{#each board as member}
						<li>
							<button
								type="button"
								onclick={() => (selected = member)}
								aria-haspopup="dialog"
								class="card-hover group flex w-full flex-col items-center overflow-hidden rounded-2xl bg-white text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford cursor-pointer no-underline"
							>
								<div class="relative w-full aspect-square overflow-hidden">
									{#if member.foto}
										<img
											src={member.foto}
											alt={member.nume}
											class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											loading="lazy"
											decoding="async"
										/>
									{:else}
										<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oxford to-blue text-5xl font-bold text-white transition-transform duration-500 group-hover:scale-105">
											{initials(member.nume)}
										</div>
									{/if}
								</div>
								<div class="w-full px-3 py-4">
									<p class="font-semibold text-text leading-snug">{member.nume}</p>
									<p class="mt-0.5 text-sm text-text-muted leading-snug">{member.rol}</p>
								</div>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<!-- Member info modal -->
	{#if selected}
		{@const m = selected}
		<dialog
			bind:this={dialog}
			class="m-auto w-full max-w-md rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-oxford-dark/50 backdrop:backdrop-blur-sm open:animate-[fadeInUp_.25s_ease-out]"
			onclose={() => (selected = null)}
			onclick={(e) => e.target === dialog && (selected = null)}
		>
			<div class="relative">
				<div class="relative w-full aspect-[4/3] overflow-hidden">
					{#if m.foto}
						<img src={m.foto} alt={m.nume} class="h-full w-full object-cover" loading="lazy" decoding="async" />
					{:else}
						<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oxford to-blue text-7xl font-bold text-white">
							{initials(m.nume)}
						</div>
					{/if}
					<button
						type="button"
						onclick={() => (selected = null)}
						aria-label="Închide"
						class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg leading-none text-text shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						×
					</button>
				</div>
				<div class="p-6">
					<p class="text-sm font-medium text-cerry">{m.rol}</p>
					<h3 class="mt-1 text-2xl font-bold tracking-tight text-text">{m.nume}</h3>

					{#if m.descriere}
						<p class="mt-4 text-base text-text-muted leading-relaxed">{m.descriere}</p>
					{:else}
						<p class="mt-4 text-base text-text-muted leading-relaxed">
							Membru al biroului de conducere al Federației Tinerilor Basarabeni.
						</p>
					{/if}

					{#if m.oras || m.email || m.socials}
						<dl class="mt-6 space-y-3 border-t border-bg-alt pt-5 text-sm">
							{#if m.oras}
								<div class="flex items-center gap-2 text-text-muted">
									<i class="fa-solid fa-location-dot w-4 text-blue" aria-hidden="true"></i>
									<span>{m.oras}</span>
								</div>
							{/if}
							{#if m.email}
								<div class="flex items-center gap-2 text-text-muted">
									<i class="fa-solid fa-building-columns w-4 text-oxford" aria-hidden="true"></i>
									<a href={`mailto:${m.email}`} class="no-underline hover:text-blue transition-colors">{m.email}</a>
								</div>
							{/if}
							{#if m.socials?.length}
								<div class="flex items-center gap-2">
									{#each m.socials as social}
										<a
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center justify-center rounded-full bg-bg-alt px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-blue-light hover:text-blue"
										>
											{social.label}
										</a>
									{/each}
								</div>
							{/if}
						</dl>
					{/if}

					<a
						href="/echipa"
						class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-oxford no-underline hover:text-blue transition-colors"
					>
						Vezi echipa completă
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</a>
				</div>
			</div>
		</dialog>
	{/if}

	<!-- 9. Support & newsletter -->
	<section class="anim-section bg-bg py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<div class="grid gap-10 lg:grid-cols-2 lg:gap-12">
				<!-- Support -->
				<div class="rounded-2xl bg-white p-7 md:p-9">
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sunglow/20 text-sunglow">
						<i class="fa-solid fa-handshake text-lg" aria-hidden="true"></i>
					</div>
					<h2 class="text-2xl font-bold tracking-tight text-text">Sprijină-ne</h2>
					<p class="mt-3 text-base text-text-muted leading-relaxed">
						Fiecare proiect al FTB pornește de la oameni care cred în tinerii
						basarabeni. Poți contribui ca voluntar, partener sau susținător.
					</p>
				<div class="mt-6 flex flex-wrap gap-4">
					<button
						type="button"
						disabled
						title="Sistem de donații în pregătire"
						class="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-oxford px-5 py-2.5 text-sm font-semibold text-white opacity-60"
					>
						Donează
						<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
					</button>
					<a
						href="/proiecte"
						class="inline-flex items-center rounded-lg border border-bg-alt px-5 py-2.5 text-sm font-medium text-oxford no-underline transition-colors hover:bg-bg-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
					>
						Devino voluntar
					</a>
				</div>
				<p class="mt-4 text-xs text-text-muted">
					(buton de donație — de activat când decidem un mecanism de plată)
				</p>
				</div>

				<!-- Newsletter -->
				<div class="rounded-2xl bg-white p-7 md:p-9">
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-light text-blue">
						<i class="fa-regular fa-newspaper text-lg" aria-hidden="true"></i>
					</div>
					<h2 class="text-2xl font-bold tracking-tight text-text">Ține pasul cu noi</h2>
					<p class="mt-3 text-base text-text-muted leading-relaxed">
						Proiecte noi, evenimente și anunțuri importante — direct în inbox,
						o dată la ceva timp.
					</p>
					<form
						class="mt-6"
						onsubmit={(e) => {
							e.preventDefault();
						}}
						aria-label="Înscriere la newsletter"
					>
						<label for="newsletter-email" class="sr-only">Adresa de e-mail</label>
						<div class="flex flex-col gap-3 sm:flex-row">
							<input
								id="newsletter-email"
								type="email"
								required
								placeholder="adresa@email.ro"
								class="w-full rounded-lg border border-bg-alt bg-bg px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxford"
							/>
							<button
								type="submit"
								class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cerry px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-cerry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerry"
							>
								Mă abonez
							</button>
						</div>
					</form>
					<p class="mt-4 text-xs text-text-muted">
						(necesită conectare la un instrument de newsletter)
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- 10. CTA — get involved -->
	<section class="anim-section bg-oxford py-16 md:py-20 text-white">
		<div class="mx-auto max-w-2xl px-6 text-center">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
				Vrei să te implici?
			</h2>
			<p class="mx-auto max-w-md text-base font-light text-white/70 leading-relaxed mb-8">
				Fie că ești student basarabean în România sau vrei să susții cauza
				noastră, suntem deschiși colaborărilor.
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
					href="/proiecte"
					class="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Vezi proiectele
				</a>
			</div>
		</div>
	</section>
</div>
