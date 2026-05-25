<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateOpts: Intl.DateTimeFormatOptions = {
		month: 'long', day: 'numeric', year: 'numeric'
	};

	function toWebp(srcSet: string | null | undefined): string | undefined {
		return srcSet?.replace(/\.(jpe?g|png)(\s|,)/gi, '.webp$2');
	}


	const quickLinks = [
		{ href: '/noutati', label: 'Noutăți', icon: 'fa-regular fa-newspaper', desc: 'Ultimele articole și anunțuri' },
		{ href: '/echipa', label: 'Echipă', icon: 'fa-solid fa-users', desc: 'Cunoaște echipa FTB' },
		{ href: '/proiecte', label: 'Proiecte', icon: 'fa-solid fa-lightbulb', desc: 'Descoperă proiectele noastre' }
	] as const;

	const services = [
		{
			icon: 'fa-solid fa-graduation-cap',
			title: 'Sprijin pentru admitere',
			desc: 'Informații și asistență pentru înscrierea la universități, licee și școli profesionale din România.'
		},
		{
			icon: 'fa-solid fa-scale-balanced',
			title: 'Asistență juridică',
			desc: 'Ghidare privind obținerea vizei de studii, actelor de ședere temporară și documentației necesare.'
		},
		{
			icon: 'fa-solid fa-handshake',
			title: 'Integrare socială',
			desc: 'Evenimente și programe care conectează studenții basarabeni și facilitează adaptarea în România.'
		},
		{
			icon: 'fa-solid fa-seedling',
			title: 'Implicare civică',
			desc: 'Proiecte de voluntariat și oportunități de dezvoltare personală și profesională pentru tineri.'
		}
	] as const;

	const resourceTags = [
		{ label: 'Admitere România', href: '#', color: 'bg-oxford/10 text-oxford border-oxford/20' },
		{ label: 'Viză studii', href: '#', color: 'bg-blue-light text-blue border-blue/20' },
		{ label: 'Ghiduri utile', href: '#', color: 'bg-blue/10 text-blue border-blue/20' },
		{ label: 'Cursuri română', href: '#', color: 'bg-orange/10 text-orange border-orange/20' }
	] as const;
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero    { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.05s; }
	.anim-stats   { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.15s; }
	.anim-mission { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.25s; }
	.anim-news    { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.35s; }
	.anim-membre  { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.45s; }
	.anim-links   { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.55s; }

	.card-hover {
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
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
		background-color: color-mix(in oklch, var(--color-oxford) 4%, transparent);
	}

	.hero-img-shadow {
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
		border-radius: 8px;
	}
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl">
	<!-- Hero -->
	<section class="flex flex-col lg:flex-row items-center gap-10 px-6 py-16 lg:py-24 anim-hero">
		<div class="lg:w-1/2 z-10">
			<p class="text-oxwood text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-oxford">
				Federația Tinerilor Basarabeni
			</p>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-text tracking-tight">
				Noi suntem <span class="text-blue">FTB</span>
			</h1>
			<p class="text-base lg:text-lg leading-relaxed text-text-muted mb-8 max-w-xl">
				Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
				la un loc toate asociațiile de studenți și tineri basarabeni din
				România. Oferim sprijin pentru integrarea academică, profesională și socială.
			</p>
			<div class="flex flex-wrap gap-3 mb-8">
				<a
					href="/despre-noi"
					class="inline-flex items-center px-6 py-3 rounded-lg bg-blue text-white font-medium text-sm no-underline hover:brightness-110 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue transition-all duration-300"
			>
				Află mai multe
			</a>
			<a
				href="/proiecte"
				class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline hover:bg-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue transition-all duration-300"
				>
					Vezi proiecte
				</a>
			</div>
			<div class="flex flex-wrap gap-2" aria-label="Resurse rapide">
				{#each resourceTags as { label, href, color }}
					<a
						{href}
						class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border no-underline transition-colors duration-200 {color}"
					>
						{label}
					</a>
				{/each}
			</div>
		</div>

		<div class="lg:w-1/2 flex justify-center z-10">
			<img
				src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png"
				class="w-2/3 lg:w-4/5 hero-img-shadow"
				alt="Tineri basarabeni reuniți la un eveniment FTB"
				loading="eager"
				decoding="async"
			/>
		</div>
	</section>

	<!-- Impact / Stats -->
	{#if data.info}
		{@const stats = [
			{ val: parseInt(data.info.Nr_Org_Membre), label: 'Organizații Membre' },
			{ val: parseInt(data.info.Nr_Voluntari), label: 'Voluntari', suffix: '+' },
			{ val: parseInt(data.info.Nr_Parteneri), label: 'Parteneri' },
			{ val: parseInt(data.info.Nr_Evenimente), label: 'Evenimente Anuale' }
		]}
		<section class="px-6 py-16 anim-stats border-t border-bg-alt bg-bg">
			<div class="max-w-5xl mx-auto">
				<p class="text-center text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-10">
					Impactul nostru în cifre
				</p>
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
					{#each stats as { val, label, suffix }}
						<div class="py-4">
							<div class="text-4xl lg:text-5xl font-bold text-blue tracking-tight">
								{val}{suffix ?? ''}
							</div>
							<div class="text-sm font-medium tracking-[0.12em] uppercase text-text-muted mt-3">{label}</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- What We Do -->
	<section class="px-6 py-20 anim-mission bg-white">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-3xl lg:text-4xl font-bold text-center tracking-tight mb-4 text-text">
				Ce facem
			</h2>
			<p class="text-text-muted text-center text-base font-light mb-12 max-w-lg mx-auto">
				Susținem tinerii basarabeni la fiecare pas — de la admitere până la integrarea profesională.
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each services as { icon, title, desc }}
					<div class="card-hover flex gap-5 p-6 rounded-xl bg-bg border border-bg-alt">
						<div class="w-11 h-11 rounded-lg bg-blue-light flex items-center justify-center shrink-0 mt-0.5">
							<i class="{icon} text-blue text-lg"></i>
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

	<!-- Latest News -->
	{#if data.posts.length > 0}
		<section class="px-6 py-20 anim-news bg-bg">
			<div class="max-w-5xl mx-auto">
				<div class="flex items-end justify-between mb-10">
					<div>
						<h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-text">
							Ultimele noutăți
						</h2>
						<p class="text-text-muted text-sm font-light mt-2">Actualizări și anunțuri de la FTB</p>
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
									{new Date(post.date).toLocaleString('ro-RO', dateOpts)}
								</time>
								<h3 class="font-semibold text-text mt-1.5 leading-snug">
									<a href={url} class="no-underline hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
										{post.title}
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
			<div class="w-10 h-0.5 bg-blue mx-auto mb-5 rounded-sm" aria-hidden="true"></div>
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-text">
				Organizații Membre
			</h2>
			<p class="text-text-muted text-base font-light mb-8 max-w-lg mx-auto">
				{data.membreStats.total} de asociații în {data.membreStats.orase} de centre universitare din România
			</p>
			<div class="flex flex-wrap justify-center gap-2 mb-10">
				{#each data.membreStats.oraseList as oras}
					<span class="tag">{oras}</span>
				{/each}
			</div>
			<a
				href="/membre"
				class="inline-flex items-center px-7 py-3.5 rounded-lg border border-blue text-blue font-medium text-sm no-underline tracking-wider hover:bg-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue transition-colors duration-300"
			>
				Vezi toate organizațiile membre
			</a>
		</div>
	</section>

	<!-- Quick Links -->
	<section class="px-6 py-20 anim-links bg-bg border-t border-bg-alt">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
			{#each quickLinks as { href, label, icon, desc }}
				<a
					{href}
					class="flex flex-col items-center text-center p-8 rounded-xl bg-white border border-bg-alt no-underline card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
				>
					<div class="w-12 h-12 rounded-full bg-blue-light flex items-center justify-center mb-4">
						<i class="{icon} text-blue text-xl"></i>
					</div>
					<h3 class="font-semibold text-text text-lg mb-1">{label}</h3>
					<p class="text-sm text-text-muted font-light">{desc}</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section class="px-6 py-20 bg-oxford text-white">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
				Vrei să te implici?
			</h2>
			<p class="text-white/70 text-base font-light mb-8 max-w-md mx-auto leading-relaxed">
				Fie că ești student basarabean în România sau vrei să susții cauza noastră,
				suntem deschiși colaborărilor.
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
