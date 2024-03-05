import Link from 'next/link';
import { findContent, PageMeta } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog'
};

export default async function Blog() {
	const posts = await findContent('posts');
    return (
		<div className='grid grid-cols-12 pb-10 sm:px-5 sm:gap-x-0 md:gap-x-8 gap-y-16'>
			{posts
				.sort(function (a: PageMeta, b: PageMeta) {
					return (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0);
				})
				.map((page: PageMeta, i: number) => (
					<div key={i} className='flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4'>
						<div className='bg-blue-500 dark:bg-blue-700 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'>
							<span>{page.category}</span>
						</div>
						<h2 className='text-lg font-bold sm:text-xl md:text-2xl'>
							<Link href={`/blog/${page.slug}`}>
								{page.title}
							</Link>
						</h2>
						<p className='text-sm text-gray-500'>{page.teaser}…</p>
						<p className='pt-2 text-xs font-medium'>
							{page.author} · <span className='mx-1'>{new Date(page.date ?? new Date()).toLocaleDateString('en')}</span>
						</p>
					</div>
				))}
		</div>
    );
}
