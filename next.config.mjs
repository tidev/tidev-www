import mdx from '@next/mdx';

const withMDX = mdx();

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
	env: {
		SITE_URL: 'https://tidev.io/'
	},
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
});

export default nextConfig;

