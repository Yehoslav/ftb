<svelte:head>
<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.anim-hero { animation: fadeInUp 0.7s ease-out both; animation-delay: 0.1s; }
</style>
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl px-6 py-16">
	<div class="anim-hero mb-10">
		<h1 class="text-3xl lg:text-4xl font-bold tracking-tight text-text mb-2">Contact</h1>
		<div class="w-10 h-0.5 bg-blue mt-3 mb-4 rounded-sm" aria-hidden="true"></div>
	</div>

	<iframe
		class="mx-auto rounded-xl border border-bg-alt"
		style="border:none;width:100%;height:40rem"
		id="contact-form-wmvqqv"
		src="https://opnform.com/forms/contact-form-wmvqqv"
		title="Formular de contact"
	>
		Se încarcă
	</iframe>
	<script type="text/javascript" src="https://opnform.com/widgets/iframe.min.js"></script>
</div>
