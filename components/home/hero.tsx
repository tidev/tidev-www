/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <>
            <div className='py-12 text-center px-10'>
                <div className='text-sm text-blue-500 dark:text-blue-700 uppercase font-bold tracking-wider mb-2'>Write in JavaScript. Run native everywhere.</div>
                <h2 className='text-4xl md:text-4xl font-black dark:text-gray-200 mb-5'>We are Titanium</h2>
                <h3 className='text-lg md:text-xl md:leading-relaxed text-gray-700 lg:w-2/3 mx-auto'>The Titanium SDK helps you to build native cross-platform mobile application using JavaScript and the Titanium API, which abstracts the native APIs of the mobile platforms. Titanium empowers you to create immersive, full-featured applications, featuring over 80% code reuse across mobile apps.</h3>
                <div className='flex justify-center'>
                    <Link href='https://titaniumsdk.com' passHref>
                        <a target='_blank' className='px-8 py-3 my-5 font-semibold rounded bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 text-white whitespace-nowrap'>
                            Learn the API
                        </a>
                    </Link>
                    <Link href='/donate'>
                        <a className='ml-5 px-8 py-3 my-5 font-semibold rounded bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 text-white whitespace-nowrap'>Donate</a>
                    </Link>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 py-10 px-10'>
                <div className='py-5 text-center'>
                    <div className='group inline-flex items-center justify-center w-12 h-12 ml-3 mb-8 relative'>
                        <div className='absolute inset-0 rounded-xl -m-3 transform -rotate-6 bg-blue-300 dark:bg-blue-500 transition ease-out duration-150 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 rounded-xl -m-3 transform rotate-2 bg-blue-500 dark:bg-blue-700 bg-opacity-75 shadow-inner transition ease-out duration-150 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <span className='text-xl text-white relative transform transition ease-out duration-150 group-hover:scale-125'>JS</span>
                    </div>
                    <h3 className='text-lg font-bold mb-2'>Titanium SDK</h3>
                    <p className='leading-relaxed text-gray-600 text-center'>Titanium lets you develop cross-platform native mobile applications and build great mobile experiences using JavaScript.</p>
                </div>
                <div className='py-5 text-center'>
                    <div className='group inline-flex items-center justify-center w-12 h-12 ml-3 mb-8 relative'>
                        <div className='absolute inset-0 rounded-xl -m-3 transform -rotate-6 bg-blue-300 dark:bg-blue-500 transition ease-out duration-150 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 rounded-xl -m-3 transform rotate-2 bg-blue-500 dark:bg-blue-700 bg-opacity-75 shadow-inner transition ease-out duration-150 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <svg className='hi-outline hi-code inline-block w-10 h-10 text-white relative transform transition ease-out duration-150 group-hover:scale-125' stroke='currentColor' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'></path>
                        </svg>
                    </div>
                    <h3 className='text-lg font-bold mb-2'>Rich APIs</h3>
                    <p className='leading-relaxed text-gray-600 text-center'>Access hundreds of native UI and non-visual components (such as networks and media APIs) within your application.</p>
                </div>
                <div className='py-5 text-center'>
                    <div className='group inline-flex items-center justify-center w-12 h-12 ml-3 mb-8 relative'>
                        <div className='absolute inset-0 rounded-xl -m-3 transform -rotate-6 bg-blue-300 dark:bg-blue-500 transition ease-out duration-150 group-hover:rotate-6 group-hover:scale-110'></div>
                        <div className='absolute inset-0 rounded-xl -m-3 transform rotate-2 bg-blue-500 dark:bg-blue-700 bg-opacity-75 shadow-inner transition ease-out duration-150 group-hover:-rotate-3 group-hover:scale-110'></div>
                        <svg className='hi-outline hi-device-mobile inline-block w-10 h-10 text-white relative transform transition ease-out duration-150 group-hover:scale-125' stroke='currentColor' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'></path>
                        </svg>
                    </div>
                    <h3 className='text-lg font-bold mb-2'>Module Ecosystem</h3>
                    <p className='leading-relaxed text-gray-600 text-center'>Easily include third-party modules in your apps with Titanium's wide selection of community modules and premium support integrations.</p>
                </div>
            </div>
        </>
    );
}
