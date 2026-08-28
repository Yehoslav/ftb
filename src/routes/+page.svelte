<script lang="ts">
	import type { PageProps } from "./$types";
	import logoIcon from "$lib/assets/FTB_logo_long_default-2_1.png";
	import { huburi } from "$lib/data/proiecte";

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
		},
		{
			href: "/proiecte",
			title: "Proiecte",
			desc: "Campanii și programe Anuale: AdmiteRO, Târgul Universităților, Summit și altele.",
			icon: "fa-solid fa-lightbulb",
			iconBg: "bg-bg-alt text-orange",
		},
		{
			href: "/evenimente",
			title: "Evenimente",
			desc: "Ce urmează — activități și întâlniri pentru tinerii basarabeni din România.",
			icon: "fa-solid fa-calendar-plus",
			iconBg: "bg-bg-alt text-cerry",
		},
		{
			href: "/ghiduri#ghiduri",
			title: "Resurse & Ghiduri",
			desc: "Ghiduri de implicare civică, scriere de proiecte și finanțări pentru tineri.",
			icon: "fa-solid fa-handshake",
			iconBg: "bg-bg-alt text-blue",
		},
		{
			href: "/noutati",
			title: "Noutăți",
			desc: "Articole, anunțuri și actualizări despre activitatea FTB România.",
			icon: "fa-regular fa-newspaper",
			iconBg: "bg-blue-light text-blue",
		},
		{
			href: "/organizatii-membre",
			title: "Organizații Membre",
			desc: "16+ asociații de studenți și tineri basarabeni din centrele universitare.",
			icon: "fa-solid fa-users",
			iconBg: "bg-bg-alt text-oxford",
		},
		{
			href: "/echipa",
			title: "Echipă",
			desc: "Cunoaște oamenii din spatele celor 16 asociații ale federației.",
			icon: "fa-solid fa-university",
			iconBg: "bg-bg-alt text-cerry",
		},
		{
			href: "/ghiduri#resurse-generale",
			title: "Rute de transport",
			desc: "Cum ajungi din Republica Moldova în România — autobuze, trenuri, microbuze.",
			icon: "fa-solid fa-location-dot",
			iconBg: "bg-blue-light text-blue",
		},
	] as const;

	const services = [
		{
			icon: "fa-solid fa-graduation-cap",
			title: "Sprijin pentru admitere",
			desc: "Informații și asistență pentru înscrierea la universități, licee și școli profesionale din România.",
		},
		{
			icon: "fa-solid fa-scale-balanced",
			title: "Asistență pentru acte legale",
			desc: "Ghidare privind obținerea vizei de studii, actelor de ședere temporară și documentației necesare.",
		},
		{
			icon: "fa-solid fa-handshake",
			title: "Integrare socială",
			desc: "Evenimente și programe care conectează studenții basarabeni și facilitează adaptarea în România.",
		},
		{
			icon: "fa-solid fa-seedling",
			title: "Implicare civică",
			desc: "Proiecte de voluntariat și oportunități de dezvoltare personală și profesională pentru tineri.",
		},
	] as const;

	const proiecteRich = [
		huburi.find((h) => h.slug === "admiteri"),
		huburi.find((h) => h.slug === "summitul-tinerilor"),
		huburi.find((h) => h.slug === "ziua-nationala"),
		huburi.find((h) => h.slug === "save-ukraine"),
	].filter((h) => h !== undefined);
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

	<!-- 2. Dashboard stats — quick proof points -->
	{#if data.info}
		{@const stats = [
			{
				val: parseInt(data.info.Nr_Org_Membre),
				label: "Organizații Membre",
			},
			{
				val: parseInt(data.info.Nr_Voluntari),
				label: "Voluntari",
				suffix: "+",
			},
			{ val: parseInt(data.info.Nr_Parteneri), label: "Parteneri" },
			{
				val: parseInt(data.info.Nr_Evenimente),
				label: "Evenimente Anuale",
			},
		]}
		<section class="anim-stats border-b border-bg-alt bg-bg">
			<div class="mx-auto max-w-4xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
				{#each stats as { val, label, suffix }}
					<div class="text-center">
						<div class="text-3xl md:text-4xl font-bold text-oxford">
							{Number.isNaN(val) ? "—" : val}{suffix}
						</div>
						<div class="mt-1 text-sm text-text-muted">{label}</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- 3. Quick actions — the navigation hub -->
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
						class="action-card card-hover group flex flex-col rounded-2xl border border-bg-alt bg-white p-5 no-underline"
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
			</div>
		</div>
	</section>

	<!-- 4. What we do — mission reinforcement -->
	<section class="anim-section bg-bg py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text text-center">
				Ce facem
			</h2>
			<p class="mx-auto mt-3 mb-12 max-w-lg text-center text-text-muted text-base font-light">
				Susținem tinerii basarabeni la fiecare pas — de la admitere până la
				integrarea profesională.
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each services as { icon, title, desc }}
					<div class="card-hover flex gap-5 p-6 rounded-xl bg-white border border-bg-alt">
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue"
						>
							<i class="{icon} text-lg" aria-hidden="true"></i>
						</div>
						<div>
							<h3 class="font-semibold text-text mb-1.5">{title}</h3>
							<p class="text-sm text-text-muted leading-relaxed">{desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 5. Projects preview -->
	<section class="anim-section bg-white py-16 md:py-20">
		<div class="mx-auto max-w-5xl px-6">
			<div class="flex items-end justify-between mb-10">
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

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
				{#each proiecteRich as hub}
					<a
						href="/proiecte/{hub.slug}"
						class="card-hover rounded-2xl border border-bg-alt bg-bg p-6 no-underline flex flex-col"
					>
						<span
							class="mb-4 inline-block h-1.5 w-12 rounded-full"
							style="background-color: {hub.culoare}"
							aria-hidden="true"
						></span>
						<h3 class="font-bold text-text leading-snug">{hub.titlu}</h3>
						<p class="mt-2 flex-1 text-sm text-text-muted leading-relaxed line-clamp-3">
							{hub.descriere}
						</p>
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each hub.domenii as domeniu}
								<span
									class="text-xs text-text-muted bg-white border border-bg-alt px-2.5 py-0.5 rounded-full"
								>
									{domeniu}
								</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>

			<div class="mt-8 text-center sm:hidden">
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

	<!-- 6. Latest news -->
	{#if data.posts.length > 0}
		<section class="anim-section bg-bg py-16 md:py-20">
			<div class="mx-auto max-w-5xl px-6">
				<div class="flex items-end justify-between mb-10">
					<div>
						<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Ultimele noutăți
						</h2>
						<p class="text-text-muted text-sm font-light mt-2">
							Actualizări și anunțuri de la FTB
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
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{#each data.posts as post}
						{@const url = `/noutati/${post.slug}`}
						<article class="card-hover bg-white rounded-xl border border-bg-alt overflow-hidden">
							{#if post.featuredImage?.node?.sourceUrl}
								<a href={url} class="block aspect-[16/9] overflow-hidden" tabindex="-1">
									<picture>
										<source
											type="image/webp"
											srcset={toWebp(post.featuredImage.node.srcSet)}
											sizes="(max-width: 768px) 100vw, 400px"
										/>
										<img
											class="w-full h-full object-cover transition duration-500 hover:scale-105"
											src={post.featuredImage.node.sourceUrl}
											srcset={post.featuredImage.node.srcSet ?? undefined}
											sizes="(max-width: 768px) 100vw, 400px"
											width={post.featuredImage.node.mediaDetails?.width ?? undefined}
											height={post.featuredImage.node.mediaDetails?.height ?? undefined}
											alt=""
											loading="lazy"
											decoding="async"
										/>
									</picture>
								</a>
							{/if}
							<div class="p-5">
								<time class="text-xs text-text-muted">
									{new Date(post.date).toLocaleString("ro-RO", dateOpts)}
								</time>
								<h3 class="font-semibold text-text mt-1.5 leading-snug">
									<a
										href={url}
										class="no-underline hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
									>
										{post.title}
									</a>
								</h3>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- 7. CTA — get involved -->
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
