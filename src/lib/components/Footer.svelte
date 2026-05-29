<script lang="ts">
	const quickLinks = [
		{ href: '/despre-noi', label: 'Despre Noi' },
		{ href: '/echipa', label: 'Echipă' },
		{ href: '/proiecte', label: 'Proiecte' },
		{ href: '/organizatii-membre', label: 'Membre' },
		{ href: '/noutati', label: 'Noutăți' },
		{ href: '/contact', label: 'Contact' }
	];

	const legalLinks = [
		{ href: '/privacy-policy-2', label: 'Politica de confidențialitate' },
		{ href: '/cookie-policy-eu', label: 'Cookie-uri' },
		{ href: '/disclaimer', label: 'Disclaimer' }
	];

	const socials = [
		{
			href: 'https://www.facebook.com/ftbromania.ro',
			label: 'Facebook',
			icon: 'fa-brands fa-facebook'
		},
		{
			href: 'https://t.me/admitereromania',
			label: 'Telegram',
			icon: 'fa-brands fa-telegram'
		},
		{
			href: 'https://www.youtube.com/@ftbromania5490',
			label: 'YouTube',
			icon: 'fa-brands fa-youtube'
		},
		{
			href: 'https://instagram.com/ftbromania.ro?igshid=MzRlODBiNWFlZA==',
			label: 'Instagram',
			icon: 'fa-brands fa-instagram'
		}
	];
</script>

<footer class="border-t border-bg-alt bg-white">
	<div class="mx-auto w-full max-w-screen-xl px-4 py-10">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="flex flex-col gap-3">
				<a href="/" class="font-bold text-xl text-oxford no-underline">FTB România</a>
				<p class="text-sm text-text-muted leading-relaxed">
					Federația Tinerilor Basarabeni s-a înființat din dorința de a aduna la un loc toate
					asociațiile de studenți și tineri basarabeni din România.
				</p>
			</div>

			<div>
				<h3 class="font-semibold text-sm uppercase tracking-wider text-text-muted mb-3">
					Link-uri rapide
				</h3>
				<ul class="flex flex-col gap-2">
					{#each quickLinks as { href, label }}
						<li>
							<a {href} class="text-sm text-text hover:text-oxford no-underline transition-colors">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-semibold text-sm uppercase tracking-wider text-text-muted mb-3">
					Social
				</h3>
				<div class="flex gap-2">
					{#each socials as { href, label, icon }}
						<a
							{href}
							aria-label={label}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-center w-10 h-10 rounded text-lg text-text-muted hover:text-oxford hover:bg-bg-alt transition-colors"
						>
							<i class={icon}></i>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-8 pt-6 border-t border-bg-alt flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
			<p>&copy; {new Date().getFullYear()} FTB România</p>
			<div class="flex gap-4">
				{#each legalLinks as { href, label }}
					<a {href} class="hover:text-oxford no-underline transition-colors">{label}</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
