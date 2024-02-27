import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '../components/layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    absolute: 'TiDev - Titanium SDK organization',
    template: '%s - TiDev'
  },
  description: 'TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK.',
  openGraph: {
    url: 'https://tidev.io/',
    title: 'TiDev - Titanium SDK organization',
    description: 'TiDev is a nonprofit organization dedicated to continuing the development of the open source Titanium SDK.',
    images: [
      { url: 'https://tidev.io/_next/image?url=%2Ftidev-logo.png&w=128&q=7' }
    ],
    siteName: 'TiDev'
  },
  twitter: {
    creator: '@tidevio',
    site: '@tidevio',
    card: 'summary_large_image',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
