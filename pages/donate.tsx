/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className='xl:mx-auto xl:container md:py-20 2xl:px-0 px-6'>
                <div className='lg:flex items-center justify-between'>
                    <div className=' lg:w-1/2 w-full'>
                        <p className='text-base leading-4 text-gray-600'>Want to support us?</p>
                        <h1 role='heading' className='md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800'>
                            Donations
                        </h1>
                        <p role='contentinfo' className='text-base leading-5 mt-5 text-gray-600'>
                            Please consider supporting this project by making a charitable donation. The money you donate goes to compensate the skilled engineeers and maintainers that keep this project going.
                        </p>
                    </div>
                    <div className='xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8' role='list'>
                        <Link href='https://github.com/sponsors/tidev'>
                            <a target='_blank'>
                                <div role='listitem' className='bg-white cursor-pointer shadow rounded-lg p-8 relative z-30 hover:bg-gray-200'>
                                    <div className='md:flex items-center justify-between'>
                                        <h2 className='text-2xl font-semibold leading-6 text-gray-800'>GitHub Sponsors</h2>
                                        <p className='text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800'></p>
                                    </div>
                                    <p className='md:w-80 text-base leading-6 mt-4 text-gray-600'>Choose between different tiers or a custom payment</p>
                                </div>
                            </a>
                        </Link>
                        <Link href='https://liberapay.com/tidev/'>
                            <a target='_blank'>
                                <div role='listitem' className='bg-white cursor-pointer shadow rounded-lg mt-3 flex relative z-30 hover:bg-gray-200'>
                                    <div className='w-full p-8'>
                                        <div className='md:flex items-center justify-between'>
                                            <h2 className='text-2xl font-semibold leading-6 text-gray-800'>Liberapay</h2>
                                            <p className='text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800'></p>
                                        </div>
                                        <p className='md:w-80 text-base leading-6 mt-4 text-gray-600'>Pay what you think it's worth</p>
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
