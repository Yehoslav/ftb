<script lang="ts">
    import type { Snippet } from 'svelte';
    import { isPlaceholdersEnabled } from '$lib/stores/placeholders';

    interface Props {
        /** What this block should contain, shown to editors when the toggle is on. */
        label: string;
        /** Optional id for jump-to / anchor navigation between unfinished blocks. */
        id?: string;
        /** Emphasis tone for the highlight. Defaults to neutral blue. */
        tone?: 'info' | 'warning' | 'content';
        /** The sample content (how the block should look once filled in). */
        children: Snippet;
    }

    let { label, id = undefined, tone = 'info', children }: Props = $props();

    const enabled = $derived(isPlaceholdersEnabled());

    const tones = {
        info: 'border-blue/60',
        warning: 'border-orange/70',
        content: 'border-oxford/60'
    } as const;

    const chipTones = {
        info: 'bg-blue text-white',
        warning: 'bg-orange text-white',
        content: 'bg-oxford text-white'
    } as const;
</script>

{#if enabled}
    <div class="mdx-block mb-6" id={id}>
        <div
            class="rounded-xl border-2 border-dashed {tones[tone]} bg-blue/5 px-4 py-3"
            data-placeholder="true"
        >
            <div class="mb-3 flex items-center gap-2">
                <span
                    class="inline-flex items-center gap-1.5 rounded-full {chipTones[tone]} px-3 py-1 text-xs font-bold uppercase tracking-widest"
                >
                    <!-- TODO icon -->
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    Conținut preconizat
                </span>
                <p class="text-sm font-medium text-text">{label}</p>
            </div>
            <!-- Sample / how-it-should-look content -->
            <div class="mx-[-0.5rem] mb-[-0.5rem]">
                {@render children?.()}
            </div>
        </div>
    </div>
{:else}
    {@render children?.()}
{/if}
