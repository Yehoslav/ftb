<script lang="ts">
    import logoMonochrome from "$lib/assets/Vector-4.png"

	const quickLinks = [
		{ href: '/despre-noi', label: 'Despre noi' },
		{ href: '/admitere', label: 'Admitere' },
		{ href: '/proiecte', label: 'Proiecte' },
		{ href: '/organizatii-studentesti', label: 'Organizații studențești' },
		{ href: '/org', label: 'Organizație' },
		{ href: '/org/transparenta', label: 'Transparență' },
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

<footer class="bg-oxford-dark text-white border-t border-white/10">
    <div class="max-w-screen-xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div class="flex flex-col gap-6">
            <img src={logoMonochrome} alt="FTB Romania" class="h-10 w-fit object-contain mb-4" />
            <p class="text-white/60 text-sm leading-relaxed">
                Federația Tinerilor Basarabeni — unind studenții moldoveni din toată România.
            </p>
            <div class="flex gap-2">
                {#each socials as { href, label, icon }}
                    <a
                        {href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center w-10 h-10 rounded text-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <i class={icon}></i>
                    </a>
                {/each}
            </div>
        </div>
        <div>
            <h3 class="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">Navigare</h3>
            <div class="flex flex-col gap-2">

                {#each quickLinks as { href, label }}
                    <a href={href} class="text-sm text-white/70 hover:text-white transition-colors duration-150">
                        {label}
                    </a>
                {/each}
            </div>
        </div>
        <div>
            <h3 class="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">Contact</h3>
            <p class="text-sm text-white/70 mb-1">contact@ftbromania.ro</p>
            <p class="text-sm text-white/70">ftbromania.ro</p>
        </div>
    </div>
    <div class="border-t border-white/10 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} FTB Romania. Toate drepturile rezervate.
    </div>
</footer>
