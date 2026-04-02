<script lang="ts">
import Counter from "./Counter.svelte"

let counters = {
    'organizatii': 18,
    'voluntari' : 750,
    'parteneri' : 16,
    'proiecte': 15
}

</script>

<div class="lg:w-300 border-x-1 border-olive-200 *:border-olive-200 m-auto">

    <!-- INFO: Card -->
    <div class="border-b-1 py-8 flex flex-row items-center">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold">Noi suntem FTB</h1>

            Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate asociațiile de studenți și tineri basarabeni din România. Chiar dacă ca grup de inițiativă am existat de mai mult timp, statutul juridic l-am obținut pe 24 septembrie 2021. În prezent federația are 17 asociații membre din cele mai mari centre universitare din România: Alba-Iulia, Bacău, Brașov, București, Cluj-Napoca, Craiova, Galați, Iași, Petroșani, Ploiești, Sibiu, Suceava, Târgoviște, Târgu Mureș și Timișoara.
        </div>

        <div class="w-1/2 flex justify-center">
            <img src="https://www.ftbromania.ro/wp-content/uploads/2022/08/Homepage-image-1.png" class="w-2/3" alt="">

        </div>

    </div>

    <div class="py-16 flex flex-row items-center">

        <Counter values={counters} duration="3000" random="false" minspeed="50" let:counterResult>
        </Counter>

    </div>
</div>
