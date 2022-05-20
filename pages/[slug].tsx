import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { findContent, IParams, loadContent } from '../utils/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
	if (!page) {
		return <DefaultErrorPage statusCode={404} />;
	}

	const { content, data } = page;

	return (
		<div className='mx-auto prose'>
			<Head>
				<title>{data.title} - TiDev</title>
			</Head>
			<h1>{data.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}

export async function getStaticPaths() {
	return {
        paths: (await findContent('pages')).map(page => ({ params: page })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async context => {
    const { slug } = context.params as IParams;
    return {
		props: {
			page: await loadContent('pages', slug)
		}
	};
}
