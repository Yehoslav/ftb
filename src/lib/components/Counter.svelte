<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
    children?: Snippet;
    values: Record<string, number>;
    duration?: string;
    random?: string;
    minspeed?: string;
}

let { values, duration = '5000', random = 'false', minspeed = '20' }: Props = $props();
let counterResult = $state<Record<string, number>>({});
let init = $state(true);
let timers: Record<string, ReturnType<typeof setInterval>> = {};

$effect(() => {
    const dur = parseInt(duration) || 5000;
    const minsp = parseInt(minspeed) || 20;
    const isRandom = random === 'true';
    for (const [key, value] of Object.entries(values)) {
        let step = 1;
        const max = value;
        let randomMax = Math.floor(max / 2);
        let randomMin = 0;
        while ((dur / (max / step)) < minsp) {
            step++;
        }
        counterResult[key] = 0;
        timers[key] = setInterval(() => {
            if (counterResult[key] < max) {
                if (isRandom) {
                    randomMin = Math.floor(counterResult[key] / 2);
                    counterResult[key] = getRandomInt(randomMin, randomMax);
                    randomMax += step;
                }
                counterResult[key] += step;
            } else {
                counterResult[key] = max;
                clearInterval(timers[key]);
            }
        }, dur / (max / step));
    }
    init = true;
});

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
</script>

{#if init}

    <div class="flex flex-row justify-between w-full text-2xl font-bold">
        <div class="flex flex-col items-center">{counterResult.organizatii} <span>organizații membre</span></div>
        <div class="flex flex-col items-center"><span>{counterResult.voluntari}+</span> <span>voluntari</span></div>
        <div class="flex flex-col items-center">{counterResult.parteneri} <span>parteneri</span></div>
        <div class="flex flex-col items-center">{counterResult.proiecte} <span>evenimente anuale</span></div>
    </div>

{/if}
