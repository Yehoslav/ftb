import { queryWP } from '$lib/server/wp';
import type { PostsQueryResult } from '$lib/types/wp';
import { resurseCategorii } from '$lib/data/resurse';

export async function GET() {
	const staticPages = [
		{ loc: '/', priority: '1.0' },
		{ loc: '/despre-noi', priority: '0.8' },
		{ loc: '/echipa', priority: '0.7' },
		{ loc: '/proiecte', priority: '0.8' },
		{ loc: '/organizatii-membre', priority: '0.8' },
		{ loc: '/noutati', priority: '0.9' },
		{ loc: '/evenimente', priority: '0.7' },
		{ loc: '/contact', priority: '0.6' },
		{ loc: '/ghiduri', priority: '0.7' }
	];

	const ghiduriPages = resurseCategorii.flatMap((cat) =>
		cat.items.map((item) => ({
			loc: `/ghiduri/${item.slug}`,
			priority: '0.6'
		}))
	);

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

	const urls = [...staticPages, ...ghiduriPages, ...newsPages]
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
