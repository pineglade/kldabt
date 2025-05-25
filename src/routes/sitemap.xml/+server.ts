import { ALL_PAGES, BASE_URL } from '@/lib/constants';
import { minifyInternal } from '@/lib/minify';

const prerender = true;

function GET() {
	const body = minifyInternal(`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
			${ALL_PAGES.map(mapPage).join('')}
		</urlset>
	`);

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

function mapPage(page: string) {
	return `<url><loc>${BASE_URL}${page}</loc></url>`;
}

export { GET, prerender };
