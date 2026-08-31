import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';
import { resurseCategorii } from '$lib/data/resurse';
import { evenimente } from '$lib/data/evenimente';
import { huburi, editii } from '$lib/data/proiecte';

export async function GET() {
	const staticPages = [
		{ loc: '/', priority: '1.0' },
		{ loc: '/admitere', priority: '0.9' },
		{ loc: '/despre-noi', priority: '0.8' },
		{ loc: '/proiecte', priority: '0.8' },
		{ loc: '/organizatii-studentesti', priority: '0.8' },
		{ loc: '/org', priority: '0.8' },
		{ loc: '/org/structura-organizatie', priority: '0.7' },
		{ loc: '/org/transparenta', priority: '0.6' },
		{ loc: '/org/manual', priority: '0.5' },
		{ loc: '/noutati', priority: '0.9' },
		{ loc: '/evenimente', priority: '0.7' },
		{ loc: '/contact', priority: '0.6' },
		{ loc: '/ghiduri', priority: '0.7' }
	];

	const manualPages = [
		{ loc: '/org/manual/nou-in-bc', priority: '0.5' },
		{ loc: '/org/manual/organizare-evenimente', priority: '0.5' },
		{ loc: '/org/manual/sabloane', priority: '0.5' }
	];

	const ghiduriPages = resurseCategorii.flatMap((cat) =>
		cat.items.map((item) => ({
			loc: `/ghiduri/${item.slug}`,
			priority: '0.6'
		}))
	);

	const evenimentePages = evenimente.map((ev) => ({
		loc: `/evenimente/${ev.slug}`,
		priority: '0.6'
	}));

	const editiiPeProiect = new Map<string, number>();
	for (const editie of editii) {
		editiiPeProiect.set(editie.proiectSlug, (editiiPeProiect.get(editie.proiectSlug) ?? 0) + 1);
	}

	const proiectePages = [
		...huburi.map((hub) => ({
			loc: `/proiecte/${hub.slug}`,
			priority: '0.6'
		})),
		...editii.map((editie) => ({
			loc: `/proiecte/${editie.proiectSlug}/${editie.slug}`,
			priority: '0.5'
		})),
		...huburi
			.filter((hub) => (editiiPeProiect.get(hub.slug) ?? 0) > 1)
			.map((hub) => ({
				loc: `/proiecte/${hub.slug}/arhiva`,
				priority: '0.4'
			}))
	];

	const query = `query SitemapPosts {
		posts(where: { categoryName: "actualitati" }, first: 100) {
			nodes { slug modified }
		}
	}`;

	let newsPages: Array<{ loc: string; priority: string; lastmod?: string }> = [];

	try {
		const result = await queryWP<PostsQueryResult>(query);
		newsPages = result.posts.nodes.map((post) => ({
			loc: `/noutati/${post.slug}`,
			priority: '0.6'
		}));
	} catch {
		// WP offline — sitemap still works for static pages
	}

	const urls = [
		...staticPages,
		...manualPages,
		...ghiduriPages,
		...evenimentePages,
		...proiectePages,
		...newsPages
	]
		.map(
			(p) => `  <url>
    <loc>https://ftbromania.ro${p.loc}</loc>
    <priority>${p.priority}</priority>
   </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
