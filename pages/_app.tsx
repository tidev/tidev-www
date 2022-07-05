import '../styles/site.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<NextSeo
			title="TiDev - Titanium SDK organization"
			description="TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK."
			openGraph={{
        url: 'https://tidev.io/',
        title: 'TiDev - Titanium SDK organization',
        description: 'TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK.',
        images: [
          { url: 'https://tidev.io/_next/image?url=%2Ftidev-logo.png&w=128&q=7' }
        ],
        site_name: 'TiDev',
      }}
      twitter={{
        handle: '@tidevio',
        site: '@site',
        cardType: 'summary_large_image',
      }}
			/>
				<link rel="icon" href="/favicon.ico" />
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
