<script lang="ts">
import './layout.css';
import { page } from '$app/state';
import type { LayoutProps } from './$types';
import favicon from '$lib/assets/favicon.svg';

let { children }: LayoutProps = $props();

let header: HTMLElement | undefined = $state();
let lastScrollPosition = $state(0);
let show = $state(false)
</script>

<svelte:window onscroll={()=>{
    var currentScrollposition = window.pageYOffset || document.documentElement.scrollTop; //Get current scroll position
    if (currentScrollposition < lastScrollPosition) {
        show = false
    }else{ 
        show = true
    }
    lastScrollPosition = currentScrollposition;
}} />

<svelte:head>
    <link rel="icon" href={favicon} />
    <script defer src="/fa/js/fontawesome.js"></script>
    <script defer src="/fa/js/brands.js"></script>
    <script defer src="/fa/js/solid.js"></script>
</svelte:head>

<header bind:this={header} class:scrolled={show} class="bg-white w-full p-4 border-b-1 border-olive-200">
    <div class="flex flex-row justify-between lg:w-300 m-auto">
        <a class="block" href="/">FTB România</a>
        <nav>
            {#if page.url.pathname !== "/"}
                <a class="py-2 px-4 hover:bg-olive-100" href="/">Acasă</a>
            {/if}
            <a class="py-2 px-4 hover:bg-olive-100" href="/noutati">Noutăți</a>
            <a class="py-2 px-4 hover:bg-olive-100" href="/contact">Contact</a>
        </nav>
    </div>
</header>

<!-- INFO: Stilizarea conținutului principal o voi face prin componentă -->
<main style="margin-top: {header?.offsetHeight ?? 0}px;">
    {@render children()}
</main>

<footer class="w-full p-4 border-t-1 border-olive-200">
    <div class="flex flex-row justify-between lg:w-300 m-auto">
        <div class="flex flex-col w-[30ch] gap-4">
            <h1 class="text-xl font-bold">
                <a href="/">FTB România</a>
            </h1>
            <div>
                Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate asociațiile de studenți și tineri basarabeni din România 
            </div>

            <div class="flex flex-row *:flex *:text-2xl *:items-center *:justify-center *:w-12 *:h-12 *:hover:bg-olive-100">

                <a aria-label="Facebook" class="" href="https://www.facebook.com/ftbromania.ro" target="_blank">
                    <i class="fa-brands fa-facebook"></i></a>


                <a aria-label="Telegram" class="" href="https://t.me/admitereromania" target="_blank">
                    <i class="fa-brands fa-telegram"></i></a>


                <a aria-label="YouTube" class="" href="https://www.youtube.com/@ftbromania5490" target="_blank">
                    <i class="fa-brands fa-youtube"></i></a>


                <a aria-label="Instagram" class="" href="https://instagram.com/ftbromania.ro?igshid=MzRlODBiNWFlZA==" target="_blank">
                    <i class="fa-brands fa-instagram"></i></a>

            </div>
        </div>

        <div>
        </div>
    </div>
</footer>

<style>

.scrolled {
    transform: translate(0,-100%)
}

header {
    top: 0;
    position: fixed;
    transition: 0.5s ease
}
</style>
