import Link from 'next/link';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }: any) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='w-full h-auto text-gray-700  dark:text-white bg-white dark:bg-neutral-900 pt-7 pb-7 md:pb-24'>
                <div className='box-border items-center content-center leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl mx-auto'>
                    <div className='mx-10'>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
