import fs from 'fs';
import globby from 'globby';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import matter from 'gray-matter';
import path from 'path';

export default function Blog(props) {
	return (
		<>
			<Head>
				<title>TiDev</title>
			</Head>

			<main>
				List blog posts here

				{props.pages.map(page => (
					<div>
						<Link href={`/${page.slug}`}><a>{page.title}</a></Link>
					</div>
				))}
			</main>
		</>
	);
}


export async function getStaticProps() {
	const files = await globby([
		'./posts/**/*.md'
	]);

	const pages = files.map((file: string) => {
		const { name: slug } = path.parse(file);
		const { data } = matter(fs.readFileSync(file, 'utf-8'));
		return { slug, ...data };
	});

	return {
		props: {
			pages
		}
	};
}
