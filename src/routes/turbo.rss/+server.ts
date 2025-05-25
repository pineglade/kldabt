import { type Data, getData } from '@/data';
import {
	BASE_URL,
	CONTENTS,
	DESCRIPTION,
	PROJECT_NAME,
	TITLES
} from '@/lib/constants';
import { html } from '@/lib/mark-template';
import { minifyInternal } from '@/lib/minify';

const prerender = true;

let data: Data | null = null;

async function GET() {
	if (!data) {
		data = await getData();
	}

	const body = minifyInternal(`
		<?xml version="1.0" encoding="UTF-8" ?>
		<rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru" version="2.0">
			<channel>
				<title>${PROJECT_NAME}</title>
				<link>${BASE_URL}</link>
				<description>${DESCRIPTION}</description>
				<language>ru</language>
				${CONTENTS.map(mapPage).join('')}
			</channel>
		</rss>
	`);

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

function mapPage(page: string) {
	return `
		<item turbo="true">
			<turbo:extendedHtml>true</turbo:extendedHtml>
			<link>${BASE_URL}${page}</link>
			<turbo:content>
				<![CDATA[
					${html`
						<header><h1>${TITLES[page]}</h1></header>
					`}${data![page]}
				]]>
			</turbo:content>
			<pubDate>Tue, 10 Dec 2024 19:00:00 +0300</pubDate>
		</item>
	`;
}

export { GET, prerender };
