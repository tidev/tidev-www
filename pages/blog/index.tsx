import Head from 'next/head';
import Link from 'next/link';
import { findContent, PageMeta } from '../../utils/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>Blog - TiDev</title>
            </Head>
            <div className='grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16'>
                {props.pages.map((page: PageMeta, i: number) => (
                    <div key={i} className='flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4'>
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
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            pages: await findContent('posts'),
        },
    };
};
