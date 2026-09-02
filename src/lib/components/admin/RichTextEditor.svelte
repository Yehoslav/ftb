<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import Image from "@tiptap/extension-image";
    import Placeholder from "@tiptap/extension-placeholder";
    import { Table } from "@tiptap/extension-table";
    import { TableRow } from "@tiptap/extension-table-row";
    import { TableHeader } from "@tiptap/extension-table-header";
    import { TableCell } from "@tiptap/extension-table-cell";
    import Youtube from "@tiptap/extension-youtube";

    interface Props {
        content?: string;
        html?: string;
        placeholder?: string;
        uploadImage?: (file: File) => Promise<string>;
    }

    let {
        content = "",
        html = $bindable(""),
        placeholder = "Scrie aici…",
        uploadImage
    }: Props = $props();

    let element: HTMLDivElement | undefined;
    let editor = $state<Editor | null>(null);
    let tick = $state(0);
    let fileInput: HTMLInputElement | undefined;

    function insertImages(files: File[]) {
        if (!uploadImage || !editor) return;
        for (const file of files) {
            if (!file.type.startsWith("image/")) continue;
            uploadImage(file)
                .then((url) => {
                    editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
                })
                .catch(() => {
                    alert("Upload-ul imaginii a eșuat. Încearcă din nou.");
                });
        }
    }

    onMount(() => {
        const e = new Editor({
            element: element!,
            extensions: [
                StarterKit.configure({
                    link: { openOnClick: false },
                    codeBlock: false
                }),
                Image.configure({ inline: false, allowBase64: false }),
                Placeholder.configure({ placeholder }),
                Table.configure({ resizable: true }),
                TableRow,
                TableHeader,
                TableCell,
                Youtube.configure({ controls: true, nocookie: true })
            ],
            content,
            editorProps: {
                attributes: {
                    class: "rte-content",
                    "aria-label": "Conținut articol"
                },
                handlePaste: (_view, event) => {
                    const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
                        f.type.startsWith("image/")
                    );
                    if (files.length === 0 || !uploadImage) return false;
                    insertImages(files);
                    return true;
                },
                handleDrop: (_view, event, _slice, moved) => {
                    if (moved) return false;
                    const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
                        f.type.startsWith("image/")
                    );
                    if (files.length === 0 || !uploadImage) return false;
                    insertImages(files);
                    return true;
                }
            },
            onUpdate: ({ editor: ed }) => {
                html = ed.getHTML();
            }
        });
        e.on("transaction", () => {
            tick++;
        });
        editor = e;
    });

    onDestroy(() => {
        editor?.destroy();
        editor = null;
    });

    function setLink() {
        if (!editor) return;
        const prev = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("URL link:", prev ?? "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }

    function addYoutube() {
        if (!editor) return;
        const src = window.prompt("Link YouTube:", "https://www.youtube.com/watch?v=");
        if (!src) return;
        editor.commands.setYoutubeVideo({ src, width: 640, height: 360 });
    }

    function addImageClick() {
        fileInput?.click();
    }

    function onFileChosen(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        if (files.length) insertImages(files);
        input.value = "";
    }

    interface Btn {
        label: string;
        title: string;
        run: () => void;
        active?: () => boolean;
    }

    const groups: Btn[][] = [
        [
            { label: "B", title: "Îngroșat", run: () => editor?.chain().focus().toggleBold().run(), active: () => !!editor?.isActive("bold") },
            { label: "I", title: "Inclinat", run: () => editor?.chain().focus().toggleItalic().run(), active: () => !!editor?.isActive("italic") },
            { label: "S", title: "Tăiat", run: () => editor?.chain().focus().toggleStrike().run(), active: () => !!editor?.isActive("strike") }
        ],
        [
            { label: "H2", title: "Titlu 2", run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: () => !!editor?.isActive("heading", { level: 2 }) },
            { label: "H3", title: "Titlu 3", run: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: () => !!editor?.isActive("heading", { level: 3 }) },
            { label: "H4", title: "Titlu 4", run: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(), active: () => !!editor?.isActive("heading", { level: 4 }) }
        ],
        [
            { label: "•", title: "Listă cu puncte", run: () => editor?.chain().focus().toggleBulletList().run(), active: () => !!editor?.isActive("bulletList") },
            { label: "1.", title: "Listă numerotată", run: () => editor?.chain().focus().toggleOrderedList().run(), active: () => !!editor?.isActive("orderedList") },
            { label: "❝", title: "Citat", run: () => editor?.chain().focus().toggleBlockquote().run(), active: () => !!editor?.isActive("blockquote") }
        ],
        [
            { label: "Link", title: "Link", run: setLink, active: () => !!editor?.isActive("link") },
            { label: "Img", title: "Imagine", run: addImageClick },
            { label: "YT", title: "Videoclip YouTube", run: addYoutube },
            { label: "—", title: "Linie orizontală", run: () => editor?.chain().focus().setHorizontalRule().run() }
        ],
        [
            { label: "⊞", title: "Inserează tabel", run: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
            { label: "+R", title: "Adaugă rând", run: () => editor?.chain().focus().addRowAfter().run() },
            { label: "+C", title: "Adaugă coloană", run: () => editor?.chain().focus().addColumnAfter().run() },
            { label: "−R", title: "Șterge rând", run: () => editor?.chain().focus().deleteRow().run() },
            { label: "−C", title: "Șterge coloană", run: () => editor?.chain().focus().deleteColumn().run() },
            { label: "⊠", title: "Șterge tabel", run: () => editor?.chain().focus().deleteTable().run() }
        ],
        [
            { label: "↶", title: "Refă pas înapoi", run: () => editor?.chain().focus().undo().run() },
            { label: "↷", title: "Refă", run: () => editor?.chain().focus().redo().run() }
        ]
    ];
</script>

<div class="rte rounded-lg border border-bg-alt bg-white">
    {#if editor && tick >= 0}
        <div class="flex flex-wrap gap-0.5 border-b border-bg-alt bg-bg p-1.5" role="toolbar" aria-label="Formatare text">
            {#each groups as group, gi}
                {#if gi > 0}
                    <span class="mx-1 w-px self-stretch bg-bg-alt" aria-hidden="true"></span>
                {/if}
                {#each group as btn}
                    <button
                        type="button"
                        class="min-w-8 rounded px-2 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-40 aria-[pressed=true]:bg-oxford aria-[pressed=true]:text-white hover:bg-bg-alt"
                        title={btn.title}
                        aria-label={btn.title}
                        aria-pressed={btn.active?.() ?? false}
                        disabled={!editor}
                        onclick={btn.run}
                    >
                        {btn.label}
                    </button>
                {/each}
            {/each}
        </div>
    {/if}

    <div bind:this={element}></div>

    <input
        bind:this={fileInput}
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        onchange={onFileChosen}
        aria-label="Încarcă imagini"
    />
</div>

<style>
    .rte :global(.rte-content) {
        min-height: 22rem;
        padding: 1rem 1.25rem;
        outline: none;
        font-size: 0.95rem;
        line-height: 1.7;
    }

    .rte :global(.rte-content p.is-editor-empty:first-child)::before {
        content: attr(data-placeholder);
        color: oklch(0.45 0.02 273.69);
        pointer-events: none;
        float: left;
        height: 0;
    }

    .rte :global(.rte-content h2) {
        font-size: 1.5em;
        font-weight: 700;
        margin: 1.2em 0 0.5em;
    }

    .rte :global(.rte-content h3) {
        font-size: 1.25em;
        font-weight: 700;
        margin: 1em 0 0.4em;
    }

    .rte :global(.rte-content h4) {
        font-size: 1.1em;
        font-weight: 700;
        margin: 1em 0 0.4em;
    }

    .rte :global(.rte-content ul),
    .rte :global(.rte-content ol) {
        padding-left: 1.5em;
        margin: 0.6em 0;
    }

    .rte :global(.rte-content ul) {
        list-style: disc;
    }

    .rte :global(.rte-content ol) {
        list-style: decimal;
    }

    .rte :global(.rte-content blockquote) {
        border-left: 4px solid oklch(0.3848 0.141 273.69);
        padding-left: 1em;
        margin: 0.8em 0;
        color: oklch(0.45 0.02 273.69);
    }

    .rte :global(.rte-content a) {
        color: oklch(0.5349 0.1375 247.85);
        text-decoration: underline;
    }

    .rte :global(.rte-content img) {
        max-width: 100%;
        height: auto;
        border-radius: 0.375rem;
    }

    .rte :global(.rte-content hr) {
        margin: 1.5em 0;
        border-color: oklch(0.94 0.01 90);
    }

    .rte :global(.rte-content table) {
        border-collapse: collapse;
        margin: 0.8em 0;
        width: 100%;
    }

    .rte :global(.rte-content td),
    .rte :global(.rte-content th) {
        border: 1px solid oklch(0.94 0.01 90);
        padding: 0.4em 0.6em;
        min-width: 3em;
        position: relative;
    }

    .rte :global(.rte-content th) {
        background: oklch(0.97 0.01 90);
        font-weight: 600;
    }

    .rte :global(.rte-content .selectedCell)::after {
        content: "";
        position: absolute;
        inset: 0;
        background: oklch(0.5349 0.1375 247.85 / 0.12);
        pointer-events: none;
    }

    .rte :global(.rte-content iframe) {
        max-width: 100%;
        border-radius: 0.375rem;
    }
</style>
