import Link from 'next/link';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='w-full h-auto bg-white pt-7 pb-7 md:pt-20 md:pb-24'>
                <div className='box-border flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl'>{children}</div>
            </main>
            <Footer />
        </div>
    );
}
