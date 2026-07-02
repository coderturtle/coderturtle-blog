import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { entrySlug } from '../lib/logs';

export async function GET(context) {
	const entries = (await getCollection('logs', (entry) => !entry.data.draft)).sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime()
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: entries.map((entry) => ({
			title: entry.data.title,
			description: entry.data.summary,
			pubDate: entry.data.date,
			link: `/projects/${entry.data.project.id}/log/${entrySlug(entry.id)}/`,
		})),
	});
}
