<script lang="ts">
    import logoIcon from "$lib/assets/FTB_logo_long_default-2_1.png";
    import Placeholder from "$lib/components/Placeholder.svelte";

    const timeline = [
        {
            title: "Cine suntem noi?",
            text:
                "FTB România este o federație care reunește asociațiile studențești și de tineret basarabene active în România, oferindu-le sprijin, resurse și o voce comună în societatea românească.",
            dot: "var(--color-sunglow)",
        },
        {
            title: "Scurt istoric",
            text:
                "Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate asociațiile de studenți și tineri basarabeni din România. Chiar dacă ca grup de inițiativă am existat de mai mult timp, statutul juridic l-am dobândit pe 24 septembrie 2021.",
            dot: "var(--color-sunglow)",
            bold: "24 septembrie 2021",
        },
        {
            title: "Prezent",
            text:
                "Federația are 17 asociații membre din cele mai mari centre universitare din România: Alba-Iulia, Bacău, Brașov, București, Cluj-Napoca, Craiova, Galați, Iași, Petroșani, Ploiești, Sibiu, Suceava, Târgoviște, Târgu Mureș și Timișoara.",
            dot: "var(--color-sunglow)",
            bold: "17 asociații membre",
        },
    ];
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
            animation-delay: 0.1s;
        }
        .anim-sections {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.2s;
        }
        .anim-mission {
            animation: fadeInUp 0.7s ease-out both;
            animation-delay: 0.3s;
        }
    </style>
</svelte:head>

<section
    class="relative overflow-hidden py-[80px] min-h-[380px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue via-oxford to-oxford"
>
    <div
        class="absolute inset-0 opacity-20"
        style:background-size="28px 28px"
        style:background-image="radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)"
    ></div>
    <img
        src={logoIcon}
        alt=""
        aria-hidden="true"
        class="absolute w-[320px] opacity-[0.07] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-0 invert pointer-events-none"
    />

    <div class="relative z-10 px-6 max-w-xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Despre noi
        </h1>
        <p class="text-white/75 text-sm md:text-base mb-7 leading-relaxed">
            Federația Tinerilor Basarabeni — o comunitate care unește studenții
            moldoveni din toată România.
        </p>
    </div>
</section>

<section class="py-0 bg-oxford">
    <div class="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-start">
        <div class="relative">
            <div class="absolute left-[7px] top-3 bottom-3 w-px bg-white/15"></div>

            <div class="flex flex-col gap-10">
                {#each timeline as item}
                    <div class="relative pl-8">
                        <div
                            class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-oxford"
                            style:background={item.dot}
                        ></div>
                        <h3 class="text-lg md:text-xl font-bold text-white mb-2">
                            {item.title}
                        </h3>
                        <p class="text-white/65 text-sm leading-relaxed">
                            {#if item.bold}
                                {#each item.text.split(item.bold) as part, i}
                                    {@const textLength = item.text.split(item.bold).length}
                                    <span>
                                        {part}
                                        {#if i < textLength - 1}
                                            <strong class="text-white font-semibold">{item.bold}</strong>
                                        {/if}
                                    </span>
                                {/each}
                            {:else}
                                {item.text}
                            {/if}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <Placeholder
            label="Fotografii reale din activitatea FTB — de adăugat"
            tone="content"
        >
            <div class="grid grid-cols-2 gap-3 h-80 md:h-auto">
                <div
                    class="rounded-2xl overflow-hidden bg-oxford/80 row-span-2 md:row-span-1"
                >
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop&auto=format"
                        alt=""
                        class="w-full h-full object-cover opacity-90"
                    />
                </div>
                <div class="rounded-2xl overflow-hidden bg-oxford/80">
                    <img
                        src="https://images.unsplash.com/photo-1684699691208-561fb64a8078?w=400&h=300&fit=crop&auto=format"
                        alt=""
                        class="w-full h-full object-cover opacity-90"
                    />
                </div>
                <div class="rounded-2xl overflow-hidden bg-oxford/80">
                    <img
                        src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&auto=format"
                        alt=""
                        class="w-full h-full object-cover opacity-90"
                    />
                </div>
            </div>
        </Placeholder>
    </div>
</section>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16 anim-hero">
    <div class="anim-sections space-y-14 max-w-3xl">
        <section>
            <h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">
                S-o luăm de la capăt!
            </h2>
            <div class="space-y-4 text-text leading-relaxed">
                <p>
                    Totul a început în luna martie 2017, la Iași, unde ne-am
                    întâlnit cu mai mulți tineri din diferite organizații de
                    studenți și elevi basarabeni din România. Atunci am
                    conștientizat că împreună putem duce reprezentarea tinerilor
                    basarabeni la alt nivel și să fim o voce importantă la nivel
                    național.
                </p>
                <p>
                    Chiar dacă anterior au mai existat inițiative de acest gen,
                    am decis să o luăm de la capăt, pentru că în acel moment
                    liderii organizațiilor de basarabeni din fiecare oraș din
                    România s-au schimbat și am fost nevoiți să punem din nou
                    bazele a ceea ce înseamnă azi Federația Tinerilor
                    Basarabeni.
                </p>
            </div>
        </section>

        <section>
            <h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">
                Primii pași
            </h2>
            <div class="space-y-4 text-text leading-relaxed">
                <p>
                    Timp de doi ani am organizat împreună mai multe activități
                    importante pentru tinerii din Republica Moldova, mai ales
                    Târgul Universităților din România și Campania AdmiteRO,
                    care au fost organizate și anterior anului 2017 de grupurile
                    de inițiativă de basarabeni. Noi practic am preluat și am
                    continuat, prin intermediul acestora, să ajutăm tinerii din
                    Republica Moldova să acceseze studiile în România.
                </p>
            </div>
        </section>

        <section>
            <h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">
                Înființarea legală
            </h2>
            <div class="space-y-4 text-text leading-relaxed">
                <p>
                    Timp de 2 ani nu am avut o federație înființată legal la
                    nivel național, doar un grup de inițiativă format din 15
                    asociații de basarabeni din România. În primăvara anului
                    2019 ne-am întâlnit la Bacău, unde am decis că este momentul
                    potrivit să ne coalizăm și să creăm una.
                </p>
                <p>
                    Au fost doi ani dificili până ne-am înființat legal. O dată
                    cu venirea pandemiei, în anul 2020, lucrurile au început să
                    meargă mai greu și în 2021 am fost nevoiți iarăși să o luăm
                    de la capăt. Totuși, nu am renunțat și am continuat să facem
                    demersurile necesare, astfel încât pe 24 septembrie 2021 am
                    primit, de la Tribunalul București, decizia finală de
                    înființare a Federației Tinerilor Basarabeni.
                </p>
            </div>
        </section>
    </div>

    <section
        class="anim-mission mt-16 rounded-xl bg-bg-alt border border-bg-alt p-8 lg:p-10 max-w-3xl"
    >
        <div class="w-8 h-0.5 bg-blue mb-4 rounded-sm" aria-hidden="true"></div>
        <h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">
            Misiunea noastră
        </h2>
        <p class="text-text leading-relaxed">
            Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
            la un loc toate asociațiile de studenți și tineri basarabeni din
            România. Ne dedicăm sprijinirii tinerilor basarabeni în procesul de
            integrare academică, profesională și socială în România, promovând
            în același timp valorile culturale și identitatea românească.
        </p>
    </section>

    <section class="anim-mission mt-8 rounded-xl border border-bg-alt bg-white p-6 max-w-3xl">
        <p class="text-sm text-text-muted leading-relaxed">
            Pentru datele organizaționale (structură, conducere, transparență),
            vezi
            <a href="/org" class="text-blue no-underline hover:text-oxford transition-colors">
                pagina Organizație
            </a>.
        </p>
    </section>
</div>
