import '../styles/site.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>TiDev</title>
				<meta name="description" content="TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
