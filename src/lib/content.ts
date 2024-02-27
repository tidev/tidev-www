import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import path from 'path';
import { globby } from 'globby';
import { ParsedUrlQuery } from 'querystring';

export interface PageMeta {
	author?: string;
	category?: string;
	date?: string;
	slug?: string;
	teaser: string;
	title?: string;
}

export interface Page {
	content: string;
	data: PageMeta;
}

export interface IParams extends ParsedUrlQuery {
    slug: string;
}

export async function findContent(type: string): Promise<PageMeta[]> {
	const files = await globby(`./${type}/**/*.md`);
	return files.map((file: string): PageMeta => {
		const { name: slug } = path.parse(file);
		const { content, data } = matter(fs.readFileSync(file, 'utf-8'));
		return {
			slug,
			teaser: content.slice(0, 140).replace(/\n/g, ' ') + '...',
			...data
		};
	});
}

export async function loadContent(type: string, slug: string): Promise<Page | undefined> {
	if (!type || !slug) {
		return;
	}

	const files = await globby(`./${type}/**/*.md`);

	for (const file of files) {
        const { name } = path.parse(file);
        if (name === slug) {
            const { content, data } = matter(fs.readFileSync(file, 'utf-8'));

			const html = md({
				html: true,
				linkify: false
			}).render(content);

			return {
				content: html,
				data
			};
        }
    }
}
