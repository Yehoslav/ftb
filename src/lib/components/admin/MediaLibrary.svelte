<script lang="ts">
	import { onMount } from 'svelte';

	interface MediaItem {
        id: number;
        wpId: number | null;
        filename: string;
        url: string;
        alt: string;
        mimeType: string;
        type: string;
        width: number | null;
        height: number | null;
    }

    interface Props {
        onPick?: (media: MediaItem) => void;
    }

    let { onPick }: Props = $props();

    let items = $state<MediaItem[]>([]);
    let loading = $state(true);
    let uploading = $state(false);
    let error = $state("");
    let filter = $state<"all" | "image" | "document" | "video">("all");
    let fileInput: HTMLInputElement | undefined;
    let dragOver = $state(false);

    const filtered = $derived(filter === "all" ? items : items.filter((i) => i.type === filter));

    async function load() {
        loading = true;
        try {
            const resp = await fetch("/api/admin/media");
            if (resp.ok) {
                const data = (await resp.json()) as { items: MediaItem[] };
                items = data.items;
            }
        } finally {
            loading = false;
        }
    }

    async function upload(files: FileList | File[]) {
        error = "";
        uploading = true;
        try {
            for (const file of Array.from(files)) {
                const form = new FormData();
                form.append("file", file);
                const resp = await fetch("/api/admin/media", { method: "POST", body: form });
                if (!resp.ok) {
                    const data = (await resp.json().catch(() => ({}))) as { error?: string };
                    error = data.error ?? `Upload eșuat (${resp.status}) pentru ${file.name}`;
                    continue;
                }
                await load();
            }
        } finally {
            uploading = false;
        }
    }

    function onChosen(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        if (input.files?.length) upload(input.files);
        input.value = "";
    }

    function onDrop(event: DragEvent) {
        event.preventDefault();
        dragOver = false;
        if (event.dataTransfer?.files.length) upload(event.dataTransfer.files);
    }

    async function copyUrl(item: MediaItem) {
        await navigator.clipboard.writeText(item.url);
    }

    onMount(() => {
        load();
    });
</script>

<div class="@container space-y-4">
    <div
        class="rounded-lg border-2 border-dashed p-4 text-center transition-colors @md:p-6 {dragOver
            ? 'border-blue bg-blue/5'
            : 'border-bg-alt bg-bg'}"
        role="region"
        aria-label="Zonă upload fișiere"
        ondragover={(e) => {
            e.preventDefault();
            dragOver = true;
        }}
        ondragleave={() => (dragOver = false)}
        ondrop={onDrop}
    >
        <p class="mb-3 text-sm text-text-muted">
            Trage fișiere aici sau selectează-le. Imagini, documente PDF/Word, video (max 25 MB).
        </p>
        <button
            type="button"
            class="rounded-lg bg-oxford px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-oxford-light focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-50"
            disabled={uploading}
            onclick={() => fileInput?.click()}
        >
            {uploading ? "Se încarcă…" : "Încarcă fișier"}
        </button>
        {#if error}
            <p class="mt-3 text-sm text-cerry" role="alert">{error}</p>
        {/if}
        <input
            bind:this={fileInput}
            type="file"
            multiple
            class="hidden"
            onchange={onChosen}
            aria-label="Selectează fișiere pentru upload"
        />
    </div>

    <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrează după tip">
        {#each [["all", "Toate"], ["image", "Imagini"], ["document", "Documente"], ["video", "Video"]] as [value, label]}
            <button
                type="button"
                class="rounded-full px-3 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue {filter === value ? 'bg-oxford text-white' : 'bg-bg text-text hover:bg-bg-alt'}"
                aria-pressed={filter === value}
                onclick={() => (filter = value as typeof filter)}
            >
                {label}
            </button>
        {/each}
    </div>

    {#if loading}
        <p class="text-sm text-text-muted">Se încarcă biblioteca media…</p>
    {:else if filtered.length === 0}
        <p class="text-sm text-text-muted">Niciun fișier încărcat.</p>
    {:else}
        <ul class="grid grid-cols-2 gap-3 @sm:grid-cols-3 @2xl:grid-cols-4" role="list">
            {#each filtered as item (item.id)}
                <li class="overflow-hidden rounded-lg border border-bg-alt bg-white">
                    {#if item.type === "image"}
                        <img src={item.url} alt={item.alt} class="h-32 w-full object-cover" loading="lazy" />
                    {:else}
                        <div class="flex h-32 w-full items-center justify-center bg-bg-alt text-3xl" aria-hidden="true">
                            {item.type === "video" ? "▶" : "📄"}
                        </div>
                    {/if}
                    <div class="space-y-1.5 p-2.5">
                        <p class="truncate text-xs font-medium" title={item.filename}>{item.filename}</p>
                        <div class="flex flex-wrap gap-1.5">
                            {#if onPick}
                                <button
                                    type="button"
                                    class="rounded bg-blue px-2 py-1 text-xs font-medium text-white hover:bg-blue/90 focus-visible:ring-2 focus-visible:ring-blue"
                                    onclick={() => onPick(item)}
                                >
                                    Inserează
                                </button>
                            {/if}
                            <button
                                type="button"
                                class="rounded bg-bg-alt px-2 py-1 text-xs font-medium text-text hover:bg-bg focus-visible:ring-2 focus-visible:ring-blue"
                                onclick={() => copyUrl(item)}
                            >
                                Copiază URL
                            </button>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
