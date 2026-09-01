<script lang="ts">
import { page } from '$app/state';

const is404 = $derived(page.status === 404);
const title = $derived(is404 ? 'Pagină negăsită' : 'Eroare');
const heading = $derived(is404 ? '404' : 'Oops!');
const message = $derived(
	is404
		? 'Pagina pe care o cauți nu există sau a fost mutată.'
		: page.error?.message ?? 'A apărut o eroare neașteptată.'
);
</script>

<svelte:head>
<title>{title} — FTB România</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
	<h1 class="text-7xl lg:text-9xl font-bold text-oxford/10 tracking-tight select-none">
		{heading}
	</h1>
	<p class="text-xl lg:text-2xl font-semibold text-text mb-4">
		{is404 ? 'Pagină negăsită' : 'Ceva nu a mers bine'}
	</p>
	<p class="text-text-muted text-base max-w-md mb-10 leading-relaxed">
		{message}
	</p>
	<div class="flex flex-wrap justify-center gap-4">
		<a
			href="/"
			class="inline-flex items-center px-6 py-3 rounded-lg bg-blue text-white font-medium text-sm no-underline hover:brightness-110 transition-all duration-300"
		>
			Mergi la pagina principală
		</a>
		<a
			href="/noutati"
			class="inline-flex items-center px-6 py-3 rounded-lg border border-blue text-blue font-medium text-sm no-underline hover:bg-blue hover:text-white transition-all duration-300"
		>
			Vezi noutățile
		</a>
	</div>
</div>
