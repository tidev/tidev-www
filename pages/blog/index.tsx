import fs from 'fs';
import globby from 'globby';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import matter from 'gray-matter';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default function Blog(props) {
    return (
        <div className='flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16'>
            {props.pages.map((page) => (
                <div key={uuidv4()} className='flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4'>
                    <div className='bg-blue-500 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'>
                        <span>{page.category}</span>
                    </div>
                    <h2 className='text-lg font-bold sm:text-xl md:text-2xl'>
                        <Link href={`/blog/${page.slug}`}>
                            <a>{page.title}</a>
                        </Link>
                    </h2>
                    <p className='text-sm text-gray-500'>{page.teaser}…</p>
                    <p className='pt-2 text-xs font-medium'>
                        {page.author} · <span className='mx-1'>{page.date}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const files = await globby(['./posts/**/*.md']);

    const pages = files.map((file: string) => {
        const { name: slug } = path.parse(file);
        const { data } = matter(fs.readFileSync(file, 'utf-8'));
        return { slug, ...data };
    });

    return {
        props: {
            pages,
        },
    };
}
