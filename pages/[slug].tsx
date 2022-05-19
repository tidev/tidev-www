import DefaultErrorPage from 'next/error';
import fs from 'fs';
import globby from 'globby';
import Head from 'next/head';
import matter from 'gray-matter';
import md from 'markdown-it';
import path from 'path';

export default function Page({ page }) {
	if (!page) {
		return <DefaultErrorPage statusCode={404} />;
	}

	const { content, data } = page;
	const html = md({
		html: true,
		linkify: true
	}).render(content);

	return (
		<div className='prose mx-auto'>
			<Head>
				<title>{data.title} - TiDev</title>
			</Head>
			<h1>{data.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}

export async function getStaticProps({ params }) {
	const files = await globby([
		'./pages/**/*.md'
	]);

	for (const file of files) {
		const { name: slug } = path.parse(file);
		if (slug === params.slug) {
			const { content, data } = matter(fs.readFileSync(file, 'utf-8'));
			return {
				props: {
					page: {
						content,
						data
					}
				}
			}
		}
	}

	return {
		props: {}
	};
}

export async function getStaticPaths() {
	const files = await globby([
		'./pages/**/*.md'
	]);

	const paths = files.map((file: string) => {
		const { name: slug } = path.parse(file);
		return { params: { slug } };
	});

	return {
		paths,
		fallback: false
	};
}
