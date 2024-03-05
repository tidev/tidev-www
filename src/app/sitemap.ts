import { findContent } from '@/lib/content';

export default async function sitemap() {
	const { SITE_URL } = process.env;
	const posts = await findContent('posts');

	return [
		{ url: SITE_URL },
		{ url: `${SITE_URL}blog` },
		...posts.map(({ slug }) => ({ url: `${SITE_URL}blog/${slug}` })),
		{ url: `${SITE_URL}code-of-conduct` },
		{ url: `${SITE_URL}contribute` },
		{ url: `${SITE_URL}donate` },
		{ url: `${SITE_URL}legal` }
	];
}
