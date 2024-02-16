import DefaultErrorPage from 'next/error';
import { findContent, IParams, loadContent } from '../../utils/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

export default function BlogPost({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!page) {
        return <DefaultErrorPage statusCode={404} />;
    }

    const { content, data } = page;

    return (
        <>
            <div className='mx-auto prose'>
                <NextSeo
                    title={data.title + " - TiDev"}
                    description={data.teaser}
                    openGraph={{
                    url: 'https://tidev.io/',
                    title: data.title,
                    description: data.teaser,
                    images: [
                        { url: data.image }
                    ],
                    site_name: 'TiDev',
                    }}
                />

                <div className='prose'>
                    <h1>{data.title}</h1>
                </div>
                <div className='flex flex-wrap overflow-hidden pt-10'>
                    <div className='lg:w-3/4 overflow-hidden sm:w-full text-left'>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>

                    <div className='lg:w-1/4 overflow-hidden sm:w-full'>
                        <span className='mt-5 bg-blue-500 dark:bg-blue-700 w-fit flex px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'>
                            <span>{data.category}</span>
                        </span>
                        <p className='pt-2 text-xs font-medium'>
                            {new Date(data.date).toLocaleDateString('en')}
                            <br />
                            {data.author}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    return {
        paths: (await findContent('posts')).map((page) => ({ params: page })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams;
    return {
        props: {
            page: await loadContent('posts', slug),
        },
    };
};
