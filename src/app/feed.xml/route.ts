import RSS from 'rss';
import { findContent, PageMeta } from '@/lib/content';

export async function GET() {
	const { SITE_URL = 'https://tidev.io/' } = process.env;

	const feed = new RSS({
		title: 'TiDev Blog',
		description: 'TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK.',
		site_url: SITE_URL,
		feed_url: `${SITE_URL}feed.xml`
	});

	const posts = await findContent('posts');
	for (const post of posts) {
		if (!post.title || !post.date || !post) {
			continue;
		}

		feed.item({
			title: post.title,
			guid: `${SITE_URL}blog/${post.slug}`,
			url: `${SITE_URL}blog/${post.slug}`,
			date: post.date,
			description: post.teaser,
			author: post.author
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8',
		}
	});
}
