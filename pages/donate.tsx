/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className='xl:mx-auto xl:container md:py-20 2xl:px-0'>
                <div className='items-center justify-between lg:flex'>
                    <div className='w-full lg:w-1/2'>
                        <p className='text-base leading-4 text-gray-600 dark:text-gray-200'>Want to support us?</p>
                        <h1 role='heading' className='mt-3 text-3xl font-bold leading-10 text-gray-800 md:text-5xl dark:text-gray-300'>
                            Donations
                        </h1>
                        <p role='contentinfo' className='mt-5 text-base leading-5 text-gray-600 dark:text-gray-200'>
                            Please consider supporting this project by making a charitable donation. The money you donate goes to compensate the skilled engineeers and maintainers that keep this project going.
                        </p>
                    </div>
                    <div className='relative w-full mt-12 xl:w-1/2 lg:w-7/12 lg:mt-0 md:px-8' role='list'>
                        <Link href='https://github.com/sponsors/tidev'>
                            <a target='_blank' className='no-underline'>
                                <div role='listitem' className='relative z-30 p-8 bg-white rounded-lg shadow cursor-pointer dark:bg-neutral-600 hover:bg-gray-200 hover:dark:bg-neutral-700'>
                                    <div className='items-center justify-between md:flex'>
                                        <h2 className='text-2xl font-semibold leading-6 text-gray-800 dark:text-gray-200'>GitHub Sponsors</h2>
                                        <p className='mt-4 text-2xl font-semibold leading-6 text-gray-800 md:mt-0 dark:text-gray-200'></p>
                                    </div>
                                    <p className='mt-4 text-base leading-6 text-gray-600 md:w-80 dark:text-gray-200'>Choose between different tiers or a custom payment</p>
                                </div>
                            </a>
                        </Link>
                        <Link href='https://liberapay.com/tidev/'>
                            <a target='_blank' className='no-underline'>
                                <div role='listitem' className='relative z-30 flex mt-3 bg-white rounded-lg shadow cursor-pointer dark:bg-neutral-600 hover:bg-gray-200 hover:dark:bg-neutral-700'>
                                    <div className='w-full p-8'>
                                        <div className='items-center justify-between md:flex'>
                                            <h2 className='text-2xl font-semibold leading-6 text-gray-800 dark:text-gray-200'>Liberapay</h2>
                                            <p className='mt-4 text-2xl font-semibold leading-6 text-gray-800 md:mt-0 dark:text-gray-200'></p>
                                        </div>
                                        <p className='mt-4 text-base leading-6 text-gray-600 md:w-80 dark:text-gray-200'>Pay what you think it's worth</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
