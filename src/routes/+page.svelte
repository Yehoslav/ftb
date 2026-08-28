<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Membru } from "$lib/data/membre";
    import logoIcon from "$lib/assets/FTB_logo_long_default-2_1.png"

    let { data }: PageProps = $props();

    const dateOpts: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    function toWebp(
        srcSet: string | null | undefined,
    ): string | undefined {
        return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, ".webp$2");
    }

    const bentoItems = [
        {
            type: "card",
            id: "transport",
            title: "Rute de transport",
            desc:
                "Află cele mai bune rute între Moldova și orașele universitare din România.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <rect x="4" y="12" width="32" height="20" rx="4" stroke="#2f7dc8" strokeWidth="2.2" />
        <circle cx="12" cy="32" r="3" stroke="#2f7dc8" strokeWidth="2" />
        <circle cx="28" cy="32" r="3" stroke="#2f7dc8" strokeWidth="2" />
        <path d="M4 20h32" stroke="#2f7dc8" strokeWidth="2" />
        <path d="M14 12V8M26 12V8" stroke="#2f7dc8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    `,
            href: "https://www.ftbromania.ro",
            span: "col",
        },
        {
            type: "card",
            id: "admitere",
            title: "Admitere RO",
            desc:
                "Ghid complet pentru înscrierea la studii în România.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" rx="4" stroke="#253680" strokeWidth="2.2" />
        <path d="M13 14h14M13 20h10M13 26h7" stroke="#253680" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="30" r="6" fill="#f0c93a" />
        <path d="M28 30l1.5 1.5L33 28" stroke="#253680" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    `,
            href: "/admitere",
            internal: true,
            span: "col",
        },
        {
            type: "photo",
            id: "photo1",
            src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&auto=format",
            alt: "Tineri cu mâinile unite",
            span: "row",
        },
        {
            type: "photo",
            id: "photo2",
            src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=600&h=400&fit=crop&auto=format",
            alt: "Studenți la curs",
            span: "col",
        },
        {
            type: "card",
            id: "parteneriate",
            title: "Parteneriate",
            desc:
                "Organizații și instituții partenere care susțin tinerii moldoveni.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <path d="M8 20c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12S8 26.627 8 20z" stroke="#253680" strokeWidth="2.2" />
        <path d="M14 20h12M20 14v12" stroke="#253680" strokeWidth="2" strokeLinecap="round" />
      </svg>
    `,
            href: "https://www.ftbromania.ro",
            span: "col",
        },
        {
            type: "card",
            id: "platforme",
            title: "Platforme",
            desc:
                "Resurse digitale utile pentru studenții internaționali.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <rect x="4" y="8" width="32" height="22" rx="3" stroke="#253680" strokeWidth="2.2" />
        <path d="M14 30l-2 4M26 30l2 4M10 34h20" stroke="#253680" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="19" r="5" stroke="#2f7dc8" strokeWidth="2" />
      </svg>
    `,
            href: "https://www.ftbromania.ro",
            span: "col",
        },
        {
            type: "card",
            id: "traineri",
            title: "Traineri",
            desc:
                "Facilitatori și mentori care te pregătesc pentru procesul de admitere.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="14" r="6" stroke="#253680" strokeWidth="2.2" />
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#253680" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M28 20l4 4-4 4" stroke="#2f7dc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    `,
            href: "https://www.ftbromania.ro",
            span: "col",
        },
        {
            type: "photo",
            id: "photo3",
            src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format",
            alt: "Workshop tineri",
            span: "row",
        },
        {
            type: "card",
            id: "urmeaza",
            title: "Ce urmează",
            desc:
                "Evenimente, proiecte și activități planificate de FTB România.",
            icon: `
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10" aria-hidden="true">
        <rect x="6" y="8" width="28" height="26" rx="3" stroke="#253680" strokeWidth="2.2" />
        <path d="M14 6v4M26 6v4M6 18h28" stroke="#253680" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="27" r="3" fill="#f0c93a" />
      </svg>
    `,
            href: "https://www.ftbromania.ro",
            span: "col",
        },
    ];

    const quickLinks = [
        {
            href: "/noutati",
            label: "Noutăți",
            icon: "fa-regular fa-newspaper",
            desc: "Ultimele articole și anunțuri",
color: "#253680",
        },
        {
            href: "/echipa",
            label: "Echipă",
            icon: "fa-solid fa-users",
            desc: "Cunoaște echipa FTB",
color: "#2f7dc8",
        },
        {
            href: "/proiecte",
            label: "Proiecte",
            icon: "fa-solid fa-lightbulb",
            desc: "Descoperă proiectele noastre",
color: "#e8963e",
        },
    ] as const;

    const services = [
        {
            icon: "fa-solid fa-graduation-cap",
            title: "Sprijin pentru admitere",
            desc:
                "Informații și asistență pentru înscrierea la universități, licee și școli profesionale din România.",
        },
        {
            icon: "fa-solid fa-scale-balanced",
            title: "Asistență juridică",
            desc:
                "Ghidare privind obținerea vizei de studii, actelor de ședere temporară și documentației necesare.",
        },
        {
            icon: "fa-solid fa-handshake",
            title: "Integrare socială",
            desc:
                "Evenimente și programe care conectează studenții basarabeni și facilitează adaptarea în România.",
        },
        {
            icon: "fa-solid fa-seedling",
            title: "Implicare civică",
            desc:
                "Proiecte de voluntariat și oportunități de dezvoltare personală și profesională pentru tineri.",
        },
    ] as const;

    const resourceTags = [
        {
            label: "Admitere România",
            href: "/ghiduri#admitere",
            color: "bg-oxford/10 text-oxford border-oxford/20",
        },
        {
            label: "Viză studii",
            href: "/ghiduri#admitere",
            color: "bg-blue/10 text-blue border-blue/20",
        },
        {
            label: "Ghiduri utile",
            href: "/ghiduri#ghiduri",
            color: "bg-blue/10 text-blue border-blue/20",
        },
        {
            label: "Cursuri română",
            href: "/ghiduri#resurse-generale",
            color: "bg-orange/10 text-orange border-orange/20",
        },
    ] as const;
</script>

<svelte:head>
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .anim-hero {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.05s;
        }
        .anim-stats {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.15s;
        }
        .anim-mission {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.25s;
        }
        .anim-news {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.35s;
        }
        .anim-membre {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.45s;
        }
        .anim-links {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.55s;
        }

        .card-hover {
            transition:
                transform 0.3s ease,
                box-shadow 0.3s ease,
                border-color 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }

        .tag {
            display: inline-flex;
            padding: 0.35rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            border: 1px solid var(--color-bg-alt);
            color: var(--color-text-muted);
            transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .tag:hover {
            border-color: var(--color-oxford);
            background-color: color-mix(
                in oklch,
                var(--color-oxford) 4%,
                transparent
            );
        }

        .hero-img-shadow {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            border-radius: 8px;
        }

        .hero-main {
            filter: blur(32px);
            transform: scale(1.1);
            transition: filter 0.4s ease-out, transform 0.4s ease-out;
        }
        .hero-main.loaded {
            filter: blur(0);
            transform: scale(1);
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
    <!-- Hero -->
    <section
        class="relative overflow-hidden py-[80px] min-h-[380px] flex flex-col items-center justify-center text-center"
        style:background="linear-gradient(160deg, #2f7dc8 0%, #253680 55%, #1a2660 100%)"
      >
        <div
            class="absolute inset-0 opacity-20"
            style:background-size='28px 28px' 
            style:background-image='radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)'
        />
        <img
            src={logoIcon}
            alt=""
            aria-hidden="true"
            class="absolute w-[320px] opacity-[0.07] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-0 invert pointer-events-none"
        />

        <div class="relative z-10 px-6 max-w-xl mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Admitere în România
            </h1>
            <p class="text-white/75 text-sm md:text-base mb-7 leading-relaxed">
                Află informații despre oportunitățile de studii în România
            </p>
            <a
                href="/admitere"
                class="inline-block font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style:background="#f0c93a" style:color="#253680"
            >
                Accesează pagina
            </a>
        </div>
    </section>

    <section class="bg-[#f0f2f8] py-10 px-4 md:px-8">
        <div class="max-w-5xl mx-auto">
            <div
                class="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]"
            >
                <!-- {/* Row 1: card | card | photo (spans 2 rows) */} -->
                {@render BentoCard(bentoItems[0])}
                {@render BentoCard(bentoItems[1])}
                <div class="row-span-2 rounded-2xl overflow-hidden bg-gray-200">
                    <img
                        src={bentoItems[2].src}
                        alt={bentoItems[2].alt}
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- {/* Row 2: photo (spans 2 cols) | card */} -->
                <div class="col-span-1 rounded-2xl overflow-hidden bg-gray-200">
                    <img
                        src={bentoItems[3].src}
                        alt={bentoItems[3].alt}
                        class="w-full h-full object-cover"
                    />
                </div>
                {@render BentoCard(bentoItems[4])}

                <!-- {/* Row 3: card | card | photo (spans 2 rows on md) */} -->
                {@render BentoCard(bentoItems[5])}
                {@render BentoCard(bentoItems[6])}
                <div
                    class="row-span-2 rounded-2xl overflow-hidden bg-gray-200 hidden md:block"
                >
                    <img
                        src={bentoItems[7].src}
                        alt={bentoItems[7].alt}
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- {/* Row 4: card spans 2 */} -->
                <div class="col-span-2 md:col-span-2">
                    {@render BentoCard(bentoItems[8], true)}
                </div>
            </div>
        </div>
    </section>

    <!-- Impact / Stats -->
    {#if data.info}
        {@const         stats = [
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
        <section class="bg-[#253680] py-12">
            <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {#each stats as { val, label, suffix }}
                    <div class="text-center">
                        <div class="text-3xl md:text-4xl font-bold text-[#f0c93a] mb-1">{val}{suffix}</div>
                        <div class="text-white/60 text-sm">{label}</div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- What We Do -->
    <section class="px-6 py-20 anim-mission bg-white">
        <div class="max-w-5xl mx-auto">
            <h2
                class="text-3xl lg:text-4xl font-bold text-center tracking-tight mb-4 text-text"
            >
                Ce facem
            </h2>
            <p
                class="text-text-muted text-center text-base font-light mb-12 max-w-lg mx-auto"
            >
                Susținem tinerii basarabeni la fiecare pas — de la admitere până
                la integrarea profesională.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {#each services as { icon, title, desc }}
                    <div
                        class="card-hover flex gap-5 p-6 rounded-xl bg-bg border border-bg-alt"
                    >
                        <div
                            class="w-11 h-11 rounded-lg bg-blue-light flex items-center justify-center shrink-0 mt-0.5"
                        >
                            <i class="{icon} text-blue text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-text mb-1.5">
                                {title}
                            </h3>
                            <p class="text-sm text-text-muted leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Latest News -->
    {#if data.posts.length > 0}
        <section class="px-6 py-20 anim-news bg-bg">
            <div class="max-w-5xl mx-auto">
                <div class="flex items-end justify-between mb-10">
                    <div>
                        <h2
                            class="text-3xl lg:text-4xl font-bold tracking-tight text-text"
                        >
                            Ultimele noutăți
                        </h2>
                        <p class="text-text-muted text-sm font-light mt-2">
                            Actualizări și anunțuri de la FTB
                        </p>
                    </div>
                    <a
                        href="/noutati"
                        class="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue no-underline hover:text-blue-muted transition-colors"
                    >
                        Vezi toate
                        <i class="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {#each data.posts as post}
                        {@const url = `/noutati/${post.slug}`}
                        <article
                            class="card-hover bg-white rounded-xl border border-bg-alt overflow-hidden"
                        >
                            {#if                         post.featuredImage?.node
                            ?.sourceUrl}
                                <a
                                    href={url}
                                    class="block aspect-[16/9] overflow-hidden"
                                    tabindex="-1"
                                >
                                    <picture>
                                        <source
                                            type="image/webp"
                                            srcset={toWebp(
                                                post.featuredImage
                                                .node
                                                .srcSet,
                                            )}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        <img
                                            class="w-full h-full object-cover transition duration-500 hover:scale-105"
                                            src={post
                                            .featuredImage
                                            .node
                                            .sourceUrl}
                                            srcset={post
                                                .featuredImage
                                                .node
                                                .srcSet ??
                                                undefined}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            width={post
                                                .featuredImage
                                                .node
                                                .mediaDetails
                                                ?.width ??
                                                undefined}
                                            height={post
                                                .featuredImage
                                                .node
                                                .mediaDetails
                                                ?.height ??
                                                undefined}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </picture>
                                </a>
                            {/if}
                            <div class="p-5">
                                <time class="text-xs text-text-muted">
                                    {
                                    new Date(
                                        post.date,
                                    ).toLocaleString(
                                            "ro-RO",
                                            dateOpts,
                                        )
                                    }
                                </time>
                                <h3
                                    class="font-semibold text-text mt-1.5 leading-snug"
                                >
                                    <a
                                        href={url}
                                        class="no-underline hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                                    >
                                        {
                                        post
                                        .title
                                        }
                                    </a>
                                </h3>
                            </div>
                        </article>
                    {/each}
                </div>
                <div class="mt-8 text-center sm:hidden">
                    <a
                        href="/noutati"
                        class="inline-flex items-center gap-1 text-sm font-medium text-blue no-underline hover:text-blue-muted transition-colors"
                    >
                        Vezi toate noutățile
                        <i class="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                </div>
            </div>
        </section>
    {/if}

    <!-- Member Organizations -->
    <section class="px-6 py-20 anim-membre bg-white">
        <div class="max-w-3xl mx-auto text-center">
            <div
                class="w-10 h-0.5 bg-blue mx-auto mb-5 rounded-sm"
                aria-hidden="true"
            >
            </div>
            <h2
                class="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-text"
            >
                Organizații Membre
            </h2>
            <p
                class="text-text-muted text-base font-light mb-8 max-w-lg mx-auto"
            >
                {data.membreStats.total} de asociații în {
                data.membreStats.orase
                } de centre universitare din România
            </p>
            <div class="flex flex-wrap justify-center gap-2 mb-10">
                <div class="flex gap-4 overflow-x-auto pb-4" style="scrollbar-width:none; -ms-overflow-style:none;">
                    {#each data.membri as org}
                        {@render OrgCard(org)}
                    {/each}
                </div>
            </div>


            <a
                href="/organizatii-membre"
                class="inline-flex items-center px-7 py-3.5 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue transition-colors duration-300"
            >
                Vezi toate organizațiile membre
            </a>
        </div>
    </section>

    <!-- Quick Links -->
    <section class="py-16 px-6">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-[#253680] mb-8 text-center">Explorează resursele noastre</h2>
            <div class="grid md:grid-cols-3 gap-5">
                {#each quickLinks as { href, label, color, desc }}
                    <a
                        href={href}
                        class="group block p-6 rounded-2xl border border-[#e0e0e6] bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <div class="w-2 h-2 rounded-full mb-4" style:background={color} />
                        <h3 class="font-bold text-[#253680] mb-2">{label}</h3>
                        <p class="text-sm text-[#8a8a8a] leading-relaxed">{desc}</p>
                        <div class="mt-4 text-xs text-[#253680] font-semibold flex items-center gap-1 transition-gap duration-150">
                            Află mai mult
                            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-6 py-20 bg-oxford text-white">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Vrei să te implici?
            </h2>
            <p
                class="text-white/70 text-base font-light mb-8 max-w-md mx-auto leading-relaxed"
            >
                Fie că ești student basarabean în România sau vrei să susții
                cauza noastră, suntem deschiși colaborărilor.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a
                    href="/contact"
                    class="inline-flex items-center px-7 py-3.5 rounded-lg bg-blue text-white font-medium text-sm no-underline tracking-wider hover:brightness-110 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
                >
                    Contactează-ne
                </a>
                <a
                    href="/despre-noi"
                    class="inline-flex items-center px-7 py-3.5 rounded-lg border border-white/30 text-white font-medium text-sm no-underline tracking-wider hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
                >
                    Află mai multe
                </a>
            </div>
        </div>
    </section>
</div>

{#snippet BentoCard(item, wide = false)}
    <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        class="block h-full"
    >
        <div
            class={`w-full h-full bg-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                wide ? "flex-row items-center gap-6" : ""
            }`}
        >
            <div>{@html item.icon}</div>
            <div class={wide ? "flex-1" : ""}>
                <h3
                    class="font-bold text-[#253680] text-sm md:text-base leading-tight mb-1"
                >
                    {item.title}
                </h3>
                <p
                    class="text-[#8a8a8a] text-xs leading-relaxed line-clamp-3"
                >
                    {item.desc}
                </p>
            </div>
            {#if wide}
                <div
                    class="shrink-0 text-xs font-semibold text-[#2f7dc8] flex items-center gap-1"
                >
                    Descoperă
                    <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path
                            d="M2 6h8M6 2l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            {/if}
        </div>
    </a>
{/snippet}

{#snippet OrgCard(org: Membru)}

    <div class="flex-shrink-0 w-56 bg-white rounded-2xl border border-[#e0e0e6] p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow duration-200">
        <div class="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden" style="background:#f4f6fb">
            {#if org.logo}
                <img
                    src={org.logo}
                    alt={org.abreviere}
                    class="w-full h-full object-contain p-1"
                    loading="lazy"
                />
            {:else}
                <svg viewBox="0 0 64 64" class="w-12 h-12">
                    <circle cx="32" cy="32" r="24" fill="#253680" opacity="0.15" />
                    <text
                        x="32"
                        y="35"
                        text-anchor="middle"
                        font-size={org.abreviere.length > 3 ? '9' : '11'}
                        font-weight="800"
                        fill="white"
                        font-family="Rubik, sans-serif"
                    >
                        {org.abreviere}
                    </text>
                </svg>
            {/if}
        </div>
        <p class="text-xs text-[#253680] font-semibold text-center leading-snug">{org.nume}</p>
        <p class="text-[10px] text-[#8a8a8a]">{org.oras}</p>
    </div>

{/snippet}
