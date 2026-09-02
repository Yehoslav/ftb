<script lang="ts">
	import { goto } from '$app/navigation';

	let username = $state('');
	let appPassword = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		loading = true;
		try {
			const resp = await fetch('/api/admin/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, appPassword })
			});
			if (!resp.ok) {
				const data = (await resp.json().catch(() => ({}))) as { error?: string };
				error = data.error ?? 'Autentificarea a eșuat. Verifică datele și încearcă din nou.';
				return;
			}
			await goto('/admin');
		} catch {
			error = 'Nu am putut contacta serverul. Încearcă din nou.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Autentificare — FTB Admin</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-bg px-4">
	<div class="w-full max-w-md">
		<div class="mb-8 text-center">
			<a href="/admin" class="text-2xl font-bold text-oxford no-underline">FTB Admin</a>
			<p class="mt-2 text-sm text-text-muted">
				Conectează-te cu contul tău de WordPress și o parolă de aplicație.
			</p>
		</div>

		<form
			onsubmit={handleSubmit}
			class="space-y-5 rounded-xl border border-bg-alt bg-white p-6 shadow-sm"
			aria-label="Formular autentificare"
		>
			{#if error}
				<p class="rounded-lg bg-cerry/10 px-4 py-3 text-sm text-cerry" role="alert">{error}</p>
			{/if}

			<div>
				<label for="login-username" class="mb-1.5 block text-sm font-medium text-text">
					Utilizator WordPress
				</label>
				<input
					id="login-username"
					type="text"
					bind:value={username}
					required
					autocomplete="username"
					class="w-full rounded-lg border border-bg-alt px-3.5 py-2.5 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
				/>
			</div>

			<div>
				<label for="login-password" class="mb-1.5 block text-sm font-medium text-text">
					Parolă de aplicație
				</label>
				<input
					id="login-password"
					type="password"
					bind:value={appPassword}
					required
					autocomplete="current-password"
					class="w-full rounded-lg border border-bg-alt px-3.5 py-2.5 text-sm focus:border-oxford focus:outline-2 focus:outline-oxford"
				/>
				<p class="mt-2 text-xs text-text-muted">
					O poți genera din WordPress → Profil → Parole de aplicație.
				</p>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="w-full rounded-lg bg-oxford px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-oxford-light focus-visible:ring-2 focus-visible:ring-blue disabled:opacity-50"
			>
				{loading ? 'Se conectează…' : 'Conectare'}
			</button>
		</form>
	</div>
</div>
