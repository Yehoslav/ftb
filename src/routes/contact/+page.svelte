<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const email = 'contact@ftbromania.ro';
	const isCorrection = $derived(data.contactContext?.intent === 'informatii-invechite');
	const subject = $derived(
		isCorrection
			? `Semnalare informații învechite${data.contactContext?.ghid ? ` — ${data.contactContext.ghid}` : ''}`
			: 'Mesaj de pe ftbromania.ro'
	);
	const emailHref = $derived(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
</script>

<svelte:head>
	<style>
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		.contact-hero { animation: fadeInUp 0.6s ease-out both; }
		.contact-body { animation: fadeInUp 0.6s 0.1s ease-out both; }
		@media (prefers-reduced-motion: reduce) {
			.contact-hero, .contact-body { animation: none; }
		}
	</style>
</svelte:head>

<div class="w-full">
	<section class="relative overflow-hidden bg-oxford-dark text-white">
		<div
			class="absolute inset-0 opacity-20"
			style:background-size="28px 28px"
			style:background-image="radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)"
		></div>
		<div class="contact-hero relative mx-auto max-w-5xl px-6 py-16 md:py-20">
			<p class="text-xs font-semibold uppercase tracking-[0.22em] text-sunglow">Contact</p>
			<h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
				Hai să vorbim despre ce putem face împreună.
			</h1>
			<p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
				Întrebări despre studenție, o propunere de colaborare sau o informație de
				corectat? Alege canalul potrivit și scrie-ne direct.
			</p>
		</div>
	</section>

	<section class="contact-body bg-bg py-12 md:py-16" aria-labelledby="contact-options">
		<div class="mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
			<div>
				<h2 id="contact-options" class="text-2xl font-bold tracking-tight text-text">
					Cum ne contactezi acum
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-text-muted">
					Formularul propriu este în curs de pregătire. Până atunci, răspundem prin
					e-mail și pe canalele comunității.
				</p>

				{#if isCorrection}
					<div class="mt-6 rounded-xl border border-sunglow bg-sunglow/10 p-4">
						<div class="flex items-start gap-3">
							<i class="fa-solid fa-flag mt-0.5 text-orange" aria-hidden="true"></i>
							<div>
								<h3 class="font-semibold text-text">Semnalezi o informație învechită</h3>
								<p class="mt-1 text-sm leading-relaxed text-text-muted">
									Subiectul mesajului va include
									{data.contactContext?.ghid ? `ghidul „${data.contactContext.ghid}”` : 'referința ghidului'}.
									Te rugăm să menționezi ce informație trebuie verificată și sursa corectă,
									dacă o ai.
								</p>
							</div>
						</div>
					</div>
				{/if}

				<div class="mt-6 space-y-3">
					<a
						href={emailHref}
						class="group flex items-center gap-4 rounded-xl border border-bg-alt bg-white p-4 no-underline transition-colors hover:border-blue/40 hover:bg-blue-light/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
					>
						<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
							<i class="fa-solid fa-envelope" aria-hidden="true"></i>
						</span>
						<span class="min-w-0 flex-1">
							<span class="block text-xs font-semibold uppercase tracking-widest text-text-muted">E-mail</span>
							<span class="mt-1 block truncate font-semibold text-text">{email}</span>
						</span>
						<i class="fa-solid fa-arrow-right text-sm text-blue transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
					</a>

					<a
						href="https://t.me/admitereromania"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 rounded-xl border border-bg-alt bg-white p-4 no-underline transition-colors hover:border-blue/40 hover:bg-blue-light/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
					>
						<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
							<i class="fa-brands fa-telegram text-lg" aria-hidden="true"></i>
						</span>
						<span class="min-w-0 flex-1">
							<span class="block text-xs font-semibold uppercase tracking-widest text-text-muted">Comunitate</span>
							<span class="mt-1 block font-semibold text-text">Admitere România pe Telegram</span>
						</span>
						<i class="fa-solid fa-arrow-up-right-from-square text-sm text-blue" aria-hidden="true"></i>
					</a>
				</div>

				<div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
					<a class="font-medium text-blue no-underline hover:text-oxford" href="https://www.facebook.com/ftbromania.ro" target="_blank" rel="noopener noreferrer">Facebook</a>
					<a class="font-medium text-blue no-underline hover:text-oxford" href="https://instagram.com/ftbromania.ro" target="_blank" rel="noopener noreferrer">Instagram</a>
					<a class="font-medium text-blue no-underline hover:text-oxford" href="https://www.youtube.com/@ftbromania5490" target="_blank" rel="noopener noreferrer">YouTube</a>
				</div>
			</div>

			<div class="rounded-2xl border border-bg-alt bg-white p-6 shadow-sm md:p-8">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<p class="text-xs font-semibold uppercase tracking-widest text-blue">Formular online</p>
						<h2 class="mt-2 text-2xl font-bold tracking-tight text-text">Scrie-ne aici</h2>
					</div>
					<span class="rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold text-cerry-dark">
						În pregătire
					</span>
				</div>

				<p id="form-status" class="mt-4 rounded-lg bg-bg px-4 py-3 text-sm leading-relaxed text-text-muted">
					Aceasta este structura viitorului formular. Câmpurile nu trimit încă mesaje;
					folosește adresa de e-mail din stânga.
				</p>

				<form class="mt-6" aria-describedby="form-status">
					<fieldset disabled class="space-y-5 opacity-70">
						<legend class="sr-only">Previzualizarea formularului de contact</legend>
						<div>
							<label for="contact-name" class="mb-1.5 block text-sm font-medium text-text">Nume</label>
							<input id="contact-name" name="name" autocomplete="name" class="w-full rounded-lg border border-bg-alt bg-bg px-4 py-3 text-text" />
						</div>
						<div>
							<label for="contact-email" class="mb-1.5 block text-sm font-medium text-text">E-mail</label>
							<input id="contact-email" name="email" type="email" autocomplete="email" class="w-full rounded-lg border border-bg-alt bg-bg px-4 py-3 text-text" />
						</div>
						<div>
							<label for="contact-topic" class="mb-1.5 block text-sm font-medium text-text">Subiect</label>
							<select id="contact-topic" name="topic" class="w-full rounded-lg border border-bg-alt bg-bg px-4 py-3 text-text">
								<option selected={!isCorrection}>Întrebare despre studenție</option>
								<option selected={isCorrection}>Informație de corectat</option>
								<option>Parteneriat sau colaborare</option>
								<option>Alt subiect</option>
							</select>
						</div>
						<div>
							<label for="contact-message" class="mb-1.5 block text-sm font-medium text-text">Mesaj</label>
							<textarea id="contact-message" name="message" rows="5" class="w-full resize-y rounded-lg border border-bg-alt bg-bg px-4 py-3 text-text"></textarea>
						</div>
						<button type="submit" class="inline-flex items-center gap-2 rounded-lg bg-oxford px-6 py-3 text-sm font-semibold text-white">
							Trimite mesajul
							<i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	</section>
</div>
