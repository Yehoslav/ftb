<script lang="ts">
</script>

<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero    { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
	.anim-sections { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.2s; }
	.anim-mission { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.3s; }
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16 anim-hero">
	<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Despre Noi</h1>
	<div class="w-10 h-0.5 bg-blue mt-3 mb-10 rounded-sm" aria-hidden="true"></div>

	<div class="anim-sections space-y-14 max-w-3xl">
		<section>
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">S-o luăm de la capăt!</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Totul a început în luna martie 2017, la Iași, unde ne-am întâlnit cu mai mulți tineri
					din diferite organizații de studenți și elevi basarabeni din România. Atunci am
					conștientizat că împreună putem duce reprezentarea tinerilor basarabeni la alt nivel și
					să fim o voce importantă la nivel național.
				</p>
				<p>
					Chiar dacă anterior au mai existat inițiative de acest gen, am decis să o luăm de la
					capăt, pentru că în acel moment liderii organizațiilor de basarabeni din fiecare oraș
					din România s-au schimbat și am fost nevoiți să punem din nou bazele a ceea ce înseamnă
					azi Federația Tinerilor Basarabeni.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">Primii pași</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Timp de doi ani am organizat împreună mai multe activități importante pentru tinerii
					din Republica Moldova, mai ales Târgul Universităților din România și Campania
					AdmiteRO, care au fost organizate și anterior anului 2017 de grupurile de inițiativă
					de basarabeni. Noi practic am preluat și am continuat, prin intermediul acestora,
					să ajutăm tinerii din Republica Moldova să acceseze studiile în România.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">Înființarea legală</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Timp de 2 ani nu am avut o federație înființată legal la nivel național, doar un grup
					de inițiativă format din 15 asociații de basarabeni din România. În primăvara anului
					2019 ne-am întâlnit la Bacău, unde am decis că este momentul potrivit să ne coalizăm
					și să creăm una.
				</p>
				<p>
					Au fost doi ani dificili până ne-am înființat legal. O dată cu venirea pandemiei, în
					anul 2020, lucrurile au început să meargă mai greu și în 2021 am fost nevoiți iarăși
					să o luăm de la capăt. Totuși, nu am renunțat și am continuat să facem demersurile
					necesare, astfel încât pe 24 septembrie 2021 am primit, de la Tribunalul București,
					decizia finală de înființare a Federației Tinerilor Basarabeni.
				</p>
			</div>
		</section>
	</div>

	<section class="anim-mission mt-16 rounded-xl bg-bg-alt border border-bg-alt p-8 lg:p-10 max-w-3xl">
		<div class="w-8 h-0.5 bg-blue mb-4 rounded-sm" aria-hidden="true"></div>
		<h2 class="text-xl lg:text-2xl font-bold text-text tracking-tight mb-4">Misiunea noastră</h2>
		<p class="text-text leading-relaxed">
			Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate
			asociațiile de studenți și tineri basarabeni din România. Ne dedicăm sprijinirii
			tinerilor basarabeni în procesul de integrare academică, profesională și socială în
			România, promovând în același timp valorile culturale și identitatea românească.
		</p>
	</section>
</div>
