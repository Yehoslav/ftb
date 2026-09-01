<script lang="ts">
    import {
        isPlaceholdersEnabled,
        isSectionLabelsEnabled,
        togglePlaceholders,
        toggleSectionLabels
    } from '$lib/stores/devToggles.svelte';

    let open = $state(false);

    let placeholders = $state(isPlaceholdersEnabled());
    let sectionLabels = $state(isSectionLabelsEnabled());

    let count = $state(0);

    $effect(() => {
        if (placeholders) {
            count = document.querySelectorAll('[data-placeholder]').length;
        } else {
            count = 0;
        }
    });

    function onTogglePlaceholders() {
        togglePlaceholders();
        placeholders = isPlaceholdersEnabled();
    }

    function onToggleSectionLabels() {
        toggleSectionLabels();
        sectionLabels = isSectionLabelsEnabled();
    }

    function onEscape() {
        open = false;
    }

    function goToNext() {
        const blocks = document.querySelectorAll<HTMLElement>('[data-placeholder]');
        const current = document.querySelector<HTMLElement>('[data-placeholder-jump]');
        const currentIndex = current ? Array.from(blocks).indexOf(current) : -1;
        const next = blocks[currentIndex + 1] ?? blocks[0];
        if (next) {
            next.scrollIntoView({ behavior: 'smooth', block: 'center' });
            next.setAttribute('data-placeholder-jump', 'true');
            next.animate(
                [
                    { boxShadow: '0 0 0 0 rgba(16,113,184,0)' },
                    { boxShadow: '0 0 0 6px rgba(16,113,184,0.5)' },
                    { boxShadow: '0 0 0 0 rgba(16,113,184,0)' }
                ],
                { duration: 1200 }
            );
        }
    }
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && onEscape()} />

<div class="fixed bottom-5 right-5 z-60 flex flex-col items-end gap-2">
    {#if open}
        <div
            class="w-64 rounded-xl border border-bg-alt bg-white shadow-xl"
            role="menu"
            aria-label="Meniu de dezvoltare"
        >
            <div class="border-b border-bg-alt px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-widest text-text-muted">Meniu dezvoltare</p>
            </div>

            <div class="p-2">
                <!-- Placeholders toggle -->
                <div class="flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                    <div class="min-w-0">
                        <p class="text-sm font-medium text-text">Conținut lipsă</p>
                        <p class="text-xs text-text-muted">Afișează blocurile în curs de completare</p>
                    </div>
                    <div class="flex shrink-0 items-center gap-2">
                        {#if placeholders && count > 0}
                            <button
                                type="button"
                                onclick={goToNext}
                                aria-label="Sari la următorul conținut de completat"
                                class="flex h-8 w-8 items-center justify-center rounded-md border border-blue/40 text-blue transition-colors hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                            >
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                                <span class="sr-only">Următorul ({count})</span>
                            </button>
                        {/if}
                        <button
                            type="button"
                            role="menuitemcheckbox"
                            aria-checked={placeholders}
                            aria-label="Comută evidențierea conținutului lipsă"
                            onclick={onTogglePlaceholders}
                            class="relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue {placeholders ? 'bg-blue' : 'bg-bg-alt'}"
                        >
                            <span
                                class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform {placeholders ? 'translate-x-[1.375rem]' : 'translate-x-0.5'}"
                                aria-hidden="true"
                            ></span>
                        </button>
                    </div>
                </div>

                <!-- Section labels toggle (homepage comments) -->
                <div class="flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                    <div class="min-w-0">
                        <p class="text-sm font-medium text-text">Etichete secțiuni</p>
                        <p class="text-xs text-text-muted">Comentarii de design pe pagină</p>
                    </div>
                    <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={sectionLabels}
                        aria-label="Comută etichetele secțiunilor"
                        onclick={onToggleSectionLabels}
                        class="relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue {sectionLabels ? 'bg-blue' : 'bg-bg-alt'}"
                    >
                        <span
                            class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform {sectionLabels ? 'translate-x-[1.375rem]' : 'translate-x-0.5'}"
                            aria-hidden="true"
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    {/if}

    <!-- Launcher -->
    <button
        type="button"
        aria-label={open ? 'Închide meniul de dezvoltare' : 'Deschide meniul de dezvoltare'}
        aria-expanded={open}
        onclick={() => (open = !open)}
        class="flex h-10 items-center gap-1 rounded-lg border shadow-lg backdrop-blur transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue
            {open
                ? 'border-blue/40 bg-white/95 text-oxford'
                : 'border-bg-alt bg-white/80 text-text-muted/70 hover:text-text'}"
    >
        <span class="pl-3 font-mono text-xs italic">
            <span class="inline sm:hidden">xs</span>
            <span class="hidden sm:inline md:hidden">sm</span>
            <span class="hidden md:inline lg:hidden">md</span>
            <span class="hidden lg:inline xl:hidden">lg</span>
            <span class="hidden xl:inline">xl</span>
        </span>
        <!-- wrench/settings icon -->
        <span class="flex h-10 w-9 items-center justify-center">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </span>
    </button>
</div>
