<script lang="ts">
	import { goto } from '$app/navigation';
	import RichTextEditor from './RichTextEditor.svelte';
	import MediaLibrary from './MediaLibrary.svelte';
	import { slugify } from '$lib/utils/slugify';

	interface PostData {
		id?: number;
		slug: string;
		title: string;
		content: string;
		excerpt: string;
		status: 'draft' | 'published';
		category: string;
		featuredImageUrl: string | null;
		featuredImageAlt: string | null;
		date: string;
	}

	interface Props {
		post?: PostData;
	}

	let { post }: Props = $props();

	const isNew = $derived(!post?.id);

	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let title = $state(post?.title ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let slug = $state(post?.slug ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let slugTouched = $state(!!post?.slug);
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let content = $state(post?.content ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let excerpt = $state(post?.excerpt ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let status = $state<'draft' | 'published'>(post?.status ?? 'draft');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let category = $state(post?.category ?? 'actualitati');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let featuredImageUrl = $state(post?.featuredImageUrl ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let featuredImageAlt = $state(post?.featuredImageAlt ?? '');
	// svelte-ignore state_referenced_locally — one-time init din datele articolului
	let date = $state(post?.date ?? toLocalInput(new Date()));

	let saving = $state(false);
	let error = $state('');
	let saved = $state(false);

	function toLocalInput(d: Date): string {
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}

	const slugPreview = $derived(slugTouched ? slug : slugify(title));

	async function uploadImage(file: File): Promise<string> {
		const form = new FormData();
		form.append('file', file);
		const resp = await fetch('/api/admin/media', { method: 'POST', body: form });
		if (!resp.ok) {
			const data = (await resp.json().catch(() => ({}))) as { error?: string };
			throw new Error(data.error ?? 'Upload eșuat');
		}
		const row = (await resp.json()) as { url: string };
		return row.url;
	}

	async function save() {
		error = '';
		saved = false;
		if (!title.trim()) {
			error = 'Titlul este obligatoriu.';
			return;
		}
		saving = true;
		try {
			const body = {
				title: title.trim(),
				slug: slugPreview,
				content,
				excerpt,
				status,
				category,
				featuredImageUrl: featuredImageUrl || null,
				featuredImageAlt: featuredImageAlt || null,
				date: new Date(date).toISOString()
			};
			const resp = isNew
				? await fetch('/api/admin/content/posts', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body)
					})
				: await fetch(`/api/admin/content/posts/${post!.id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body)
					});

			if (!resp.ok) {
				const data = (await resp.json().catch(() => ({}))) as { error?: string };
				error = data.error ?? `Salvarea a eșuat (${resp.status}).`;
				return;
			}

			const row = (await resp.json()) as { id: number };

			if (isNew) {
				await goto(`/admin/posts/${row.id}`, { replaceState: true });
			} else {
				saved = true;
				setTimeout(() => (saved = false), 2500);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Eroare la salvare.';
		} finally {
			saving = false;
		}
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		save();
	}}
	class="space-y-6"
	aria-label={isNew ? 'Formular articol nou' : 'Formular editare articol'}
>
	{#if error}
		<p class="rounded-lg bg-cerry/10 px-4 py-3 text-sm text-cerry" role="alert">{error}</p>
	{/if}
	{#if saved}
		<p class="rounded-lg bg-blue/10 px-4 py-3 text-sm text-blue" role="status">
			Salvat ✓
		</p>
	{/if}

	<div class="grid gap-6 lg:grid-cols-3">
		<div class="space-y-5 lg:col-span-2">
			<div>
				<label for="post-title" class="mb-1.5 block text-sm font-medium text-text">Titlu</label>
				<input
					id="post-title"
					type="text"
					bind:value={title}
					required
					class="w-full rounded-lg border border-bg-alt px-3.5 py-2.5 text-base font-medium focus:border-oxford focus:outline-2 focus:outline-oxford"
					placeholder="Titlul articolului"
				/>
			</div>

			<div>
				<span class="mb-1.5 block text-sm font-medium text-text">Conținut</span>
				<RichTextEditor bind:html={content} uploadImage={uploadImage} />
			</div>

			<div>
				<label for="post-excerpt" class="mb-1.5 block text-sm font-medium text-text">
					Rezumat (opțional)
				</label>
				<textarea
					id="post-excerpt"
					bind:value={excerpt}
					rows="3"
					class="w-full rounded-lg border border-bg-alt px-3.5 py-2.5 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
					placeholder="Scurtă descriere, afișată în liste și social media"
				></textarea>
			</div>
		</div>

		<div class="space-y-5">
			<div class="space-y-4 rounded-xl border border-bg-alt bg-white p-4">
				<div>
					<label for="post-status" class="mb-1.5 block text-sm font-medium text-text">Stare</label>
					<select
						id="post-status"
						bind:value={status}
						class="w-full rounded-lg border border-bg-alt px-3 py-2 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
					>
						<option value="draft">Schiță</option>
						<option value="published">Publicat</option>
					</select>
				</div>

				<div>
					<label for="post-date" class="mb-1.5 block text-sm font-medium text-text">Data publicării</label>
					<input
						id="post-date"
						type="datetime-local"
						bind:value={date}
						class="w-full rounded-lg border border-bg-alt px-3 py-2 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
					/>
				</div>

				<div>
					<label for="post-category" class="mb-1.5 block text-sm font-medium text-text">Categorie</label>
					<select
						id="post-category"
						bind:value={category}
						class="w-full rounded-lg border border-bg-alt px-3 py-2 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
					>
						<option value="actualitati">Actualități</option>
					</select>
				</div>

				<div>
					<label for="post-slug" class="mb-1.5 block text-sm font-medium text-text">Slug (URL)</label>
					<input
						id="post-slug"
						type="text"
						bind:value={slug}
						oninput={() => (slugTouched = true)}
						class="w-full rounded-lg border border-bg-alt px-3 py-2 font-mono text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
						placeholder={slugPreview || 'se generează din titlu'}
					/>
				</div>
			</div>

			<div class="space-y-3 rounded-xl border border-bg-alt bg-white p-4">
				<p class="text-sm font-medium text-text">Imagine principală</p>
				{#if featuredImageUrl}
					<img
						src={featuredImageUrl}
						alt={featuredImageAlt}
						class="aspect-video w-full rounded-lg object-cover"
					/>
					<button
						type="button"
						class="text-xs font-medium text-cerry hover:underline focus-visible:ring-2 focus-visible:ring-blue"
						onclick={() => (featuredImageUrl = '')}
					>
						Scoate imaginea
					</button>
				{:else}
					<MediaLibrary
						onPick={(item) => {
							featuredImageUrl = item.url;
							if (!featuredImageAlt) featuredImageAlt = item.alt;
						}}
					/>
				{/if}
				{#if featuredImageUrl}
					<div>
						<label for="post-image-alt" class="mb-1.5 block text-sm font-medium text-text">
							Text alternativ
						</label>
						<input
							id="post-image-alt"
							type="text"
							bind:value={featuredImageAlt}
							class="w-full rounded-lg border border-bg-alt px-3 py-2 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="sticky bottom-0 -mx-6 border-t border-bg-alt bg-bg/95 px-6 py-3 backdrop-blur lg:-mx-10 lg:px-10">
		<div class="flex items-center justify-between gap-4">
			<p class="text-sm text-text-muted">
				URL final: <span class="font-mono">/noutati/{slugPreview || '…'}</span>
			</p>
			<div class="flex gap-3">
				<a
					href="/admin/posts"
					class="rounded-lg border border-bg-alt bg-white px-4 py-2 text-sm font-medium text-text no-underline hover:bg-bg-alt focus-visible:ring-2 focus-visible:ring-blue"
				>
					Anulează
				</a>
				<button
					type="submit"
					disabled={saving}
					class="rounded-lg bg-oxford px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-oxford-light focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-50"
				>
					{saving ? 'Se salvează…' : isNew ? 'Creează articolul' : 'Salvează modificările'}
				</button>
			</div>
		</div>
	</div>
</form>
