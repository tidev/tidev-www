import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { findContent, IParams, loadContent } from '../../utils/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function BlogPost({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!page) {
        return <DefaultErrorPage statusCode={404} />;
    }

    const { content, data } = page;

    return (
        <>
            <div className='mx-auto prose'>
                <Head>
                    <title>{data.title} - TiDev</title>
                </Head>
                <div className='prose'>
                    <h1 className='mx-10'>{data.title}</h1>
                </div>
                <div className='flex flex-wrap overflow-hidden pt-10'>
                    <div className='lg:w-3/4 overflow-hidden sm:w-full text-left'>
                        <div className='mx-10' dangerouslySetInnerHTML={{ __html: content }} />
                    </div>

                    <div className='lg:w-1/4 overflow-hidden sm:w-full'>
                        <span className='mt-5 mx-10 bg-blue-500 w-fit flex px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'>
                            <span>{data.category}</span>
                        </span>
                        <p className='mx-10 pt-2 text-xs font-medium'>
                            {data.date}
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
