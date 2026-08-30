<script lang="ts">
    import {
        isPlaceholdersEnabled,
        setPlaceholdersEnabled
    } from '$lib/stores/placeholders';

    let enabled = $state(isPlaceholdersEnabled());

    let count = $state(0);

    $effect(() => {
        if (enabled) {
            count = document.querySelectorAll('[data-placeholder]').length;
        } else {
            count = 0;
        }
    });

    function onToggle() {
        setPlaceholdersEnabled(!enabled);
        enabled = isPlaceholdersEnabled();
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

<div class="fixed bottom-5 right-5 z-60 flex items-center gap-2">
    {#if enabled && count > 0}
        <button
            type="button"
            onclick={goToNext}
            aria-label="Sari la următorul conținut de completat"
            class="flex h-9 items-center gap-1.5 rounded-lg border border-blue/40 bg-white/95 px-3 py-2 text-xs font-medium text-oxford shadow-lg backdrop-blur transition-colors hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
            <span class="tabular-nums">{count}</span>
        </button>
    {/if}

    <button
        type="button"
        onclick={onToggle}
        aria-pressed={enabled}
        aria-label={enabled ? 'Ascunde indicatorii de conținut lipsă' : 'Arată indicatorii de conținut lipsă'}
        class="flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs shadow-lg backdrop-blur transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue
            {enabled
                ? 'border-blue/40 bg-white/95 text-oxford'
                : 'border-bg-alt bg-white/80 text-text-muted/70 hover:text-text'}"
    >
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        <span>TODO {enabled ? 'on' : 'off'}</span>
    </button>
</div>
