<script lang="ts">
    import Counter from './Counter.svelte';

    let counters = {
        organizatii: 18,
        voluntari: 750,
        parteneri: 16,
        proiecte: 15,
    };

    const { data } = $props();

    async function get(path: string) {
        return await fetch(`/api/${path}`, { method: 'get' }).then((d) =>
            d.json(),
        );
    }
</script>

<div class="m-auto border-x-1 border-olive-200 *:border-olive-200 lg:w-300">
    <!-- INFO: Card -->
    <div class="flex flex-row items-center text-accent border-b-1 py-8 bg-linear-to-r from-primary to-secondary">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold">Noi suntem FTB</h1>

            Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna
            la un loc toate asociațiile de studenți și tineri basarabeni din
            România. Chiar dacă ca grup de inițiativă am existat de mai mult
            timp, statutul juridic l-am obținut pe 24 septembrie 2021. În
            prezent federația are 17 asociații membre din cele mai mari centre
            universitare din România: Alba-Iulia, Bacău, Brașov, București,
            Cluj-Napoca, Craiova, Galați, Iași, Petroșani, Ploiești, Sibiu,
            Suceava, Târgoviște, Târgu Mureș și Timișoara.
        </div>

        <div class="flex w-1/2 justify-center">
            <img
                src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png"
                class="w-2/3"
                alt=""
            />
        </div>
    </div>

    <div class="flex flex-row items-center py-16">
        {#await get('info')}
            <div class="flex flex-row">
                Încărcăm informații despre asociație
            </div>
        {:then info}
            <Counter
                values={{
                    organizatii: parseInt(info.Nr_Org_Membre),
                    voluntari: info.Nr_Voluntari,
                    parteneri: info.Nr_Parteneri,
                    proiecte: info.Nr_Evenimente,
                }}
                duration="3000"
                random="false"
                minspeed="50"
                let:counterResult
            ></Counter>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>

    <div class="flex flex-row items-center py-16">
        {#await get('asociatii')}
            <div class="flex flex-row">Încărcăm asociațiile membre</div>
        {:then asociatii}
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nume</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Abreviere</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Judet</th>
                    </tr>
                </thead>
                <tbody class="divide-1">
                    {#each asociatii as asoc}
                        {@const nume = asoc.Nume}
                        {@const abbr = asoc.Abreviere}
                        {@const jude = asoc.Judet}
                        <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{nume}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{abbr}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{jude}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</div>
