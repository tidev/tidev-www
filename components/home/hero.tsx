/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <>
            <div className='py-12 text-center'>
                <div className='mb-2 text-sm font-bold tracking-wider text-blue-500 uppercase dark:text-blue-700'>
                    Write in JavaScript. Run native everywhere.
                </div>
                <h2 className='mb-5 text-4xl font-black md:text-4xl dark:text-gray-200'>
                    We are Titanium
                </h2>
                <h3 className='mx-auto text-lg md:text-xl md:leading-relaxed lg:w-2/3'>
                    The Titanium SDK helps you to build native cross-platform mobile application using JavaScript and the
                    Titanium API, which abstracts the native APIs of the mobile platforms. Titanium empowers you to create
                    immersive, full-featured applications, featuring over 80% code reuse across mobile apps.
                </h3>
                <div className='flex justify-center'>
                    <Link href='https://titaniumsdk.com' target='_blank' className='px-8 py-3 my-5 font-semibold text-white bg-blue-500 rounded dark:bg-blue-700 hover:bg-blue-700 whitespace-nowrap'>
                        Learn the API
                    </Link>
                    <Link href='/donate' className='px-8 py-3 my-5 ml-5 font-semibold text-white bg-blue-500 rounded dark:bg-blue-700 hover:bg-blue-700 whitespace-nowrap'>Donate</Link>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 py-10 md:grid-cols-3 md:gap-12'>
                <div className='py-5 text-center'>
                    <div className='relative inline-flex items-center justify-center w-12 h-12 mb-8 ml-3 group'>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-300 rounded-xl -rotate-6 dark:bg-blue-500 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-500 bg-opacity-75 shadow-inner rounded-xl rotate-2 dark:bg-blue-700 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <span className='relative text-xl text-white transition duration-150 ease-out transform group-hover:scale-125'>JS</span>
                    </div>
                    <h3 className='mb-2 text-lg font-bold'>Titanium SDK</h3>
                    <p className='leading-relaxed text-center'>Titanium lets you develop cross-platform native mobile applications and build great mobile experiences using JavaScript.</p>
                </div>
                <div className='py-5 text-center'>
                    <div className='relative inline-flex items-center justify-center w-12 h-12 mb-8 ml-3 group'>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-300 rounded-xl -rotate-6 dark:bg-blue-500 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-500 bg-opacity-75 shadow-inner rounded-xl rotate-2 dark:bg-blue-700 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <svg className='relative inline-block w-10 h-10 text-white transition duration-150 ease-out transform hi-outline hi-code group-hover:scale-125' stroke='currentColor' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'></path>
                        </svg>
                    </div>
                    <h3 className='mb-2 text-lg font-bold'>Rich APIs</h3>
                    <p className='leading-relaxed text-center'>Access hundreds of native UI and non-visual components (such as networks and media APIs) within your application.</p>
                </div>
                <div className='py-5 text-center'>
                    <div className='relative inline-flex items-center justify-center w-12 h-12 mb-8 ml-3 group'>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-300 rounded-xl -rotate-6 dark:bg-blue-500 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 -m-3 transition duration-150 ease-out transform bg-blue-500 bg-opacity-75 shadow-inner rounded-xl rotate-2 dark:bg-blue-700 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <svg className='relative inline-block w-10 h-10 text-white transition duration-150 ease-out transform hi-outline hi-device-mobile group-hover:scale-125' stroke='currentColor' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'></path>
                        </svg>
                    </div>
                    <h3 className='mb-2 text-lg font-bold'>Module Ecosystem</h3>
                    <p className='leading-relaxed text-center'>Easily include third-party modules in your apps with Titanium's wide selection of community modules and premium support integrations.</p>
                </div>
            </div>
        </>
    );
}
