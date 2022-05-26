import Link from 'next/link';

export default function About() {
    return (
        <>
            <div className='mt-20 text-center'>
                <div className='max-w-3xl mb-10 space-y-5 sm:mx-auto sm:space-y-4'>
                    <h2 className='relative text-4xl font-extrabold tracking-tight sm:text-4xl'>The Mission</h2>
                    <p className='text-xl text-gray-500'>TiDev, Inc exists for the following purposes</p>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16'>
                <div>
                    <div className='flex items-center pr-2 mb-3'>
                        <svg className='w-8 h-8 text-blue-500 dark:text-blue-700' aria-hidden='true' fill='currentColor' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M160 80C160 112.8 140.3 140.1 112 153.3V241.1C130.8 230.2 152.7 224 176 224H272C307.3 224 336 195.3 336 160V153.3C307.7 140.1 288 112.8 288 80C288 35.82 323.8 0 368 0C412.2 0 448 35.82 448 80C448 112.8 428.3 140.1 400 153.3V160C400 230.7 342.7 288 272 288H176C140.7 288 112 316.7 112 352V358.7C140.3 371 160 399.2 160 432C160 476.2 124.2 512 80 512C35.82 512 0 476.2 0 432C0 399.2 19.75 371 48 358.7V153.3C19.75 140.1 0 112.8 0 80C0 35.82 35.82 0 80 0C124.2 0 160 35.82 160 80V80zM80 104C93.25 104 104 93.25 104 80C104 66.75 93.25 56 80 56C66.75 56 56 66.75 56 80C56 93.25 66.75 104 80 104zM368 56C354.7 56 344 66.75 344 80C344 93.25 354.7 104 368 104C381.3 104 392 93.25 392 80C392 66.75 381.3 56 368 56zM80 456C93.25 456 104 445.3 104 432C104 418.7 93.25 408 80 408C66.75 408 56 418.7 56 432C56 445.3 66.75 456 80 456z' />
                        </svg>
                        <h5 className='ml-3 font-semibold text-gray-900'>To ensure the Titanium SDK is actively maintained and developed for years to come</h5>
                    </div>
                    <p>This means rapid attention to bugs introduced with new iOS/Android updates, as well as addition of features to the SDK that enable full compatibility with new features added to the iOS and Android mobile operating systems.</p>

                    <div className='flex items-center pr-2 mt-10 mb-3'>
                        <svg className='w-8 h-8 text-blue-500 dark:text-blue-700' aria-hidden='true' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                            <path d='M488 191.1h-152l.0001 51.86c.0001 37.66-27.08 72-64.55 75.77c-43.09 4.333-79.45-29.42-79.45-71.63V126.4l-24.51 14.73C123.2 167.8 96.04 215.7 96.04 267.5L16.04 313.8c-15.25 8.751-20.63 28.38-11.75 43.63l80 138.6c8.875 15.25 28.5 20.5 43.75 11.75l103.4-59.75h136.6c35.25 0 64-28.75 64-64c26.51 0 48-21.49 48-48V288h8c13.25 0 24-10.75 24-24l.0001-48C512 202.7 501.3 191.1 488 191.1zM635.7 154.5l-79.95-138.6c-8.875-15.25-28.5-20.5-43.75-11.75l-103.4 59.75h-62.57c-37.85 0-74.93 10.61-107.1 30.63C229.7 100.4 224 110.6 224 121.6l-.0004 126.4c0 22.13 17.88 40 40 40c22.13 0 40-17.88 40-40V159.1h184c30.93 0 56 25.07 56 56v28.5l80-46.25C639.3 189.4 644.5 169.8 635.7 154.5z' />
                        </svg>
                        <h5 className='ml-3 font-semibold text-gray-900'>To create a trusted channel for getting support around the platform</h5>
                    </div>
                    <p>
                        <span>This means marketing the free support provided via </span>
                        <Link href='https://slack.tidev.io'>
                            <a target='_blank' className='text-blue-500 dark:text-blue-700'>
                                Slack
                            </a>
                        </Link>
                        <span> and </span>
                        <Link href='https://stackoverflow.com/questions/tagged/titanium'>
                            <a target='_blank' className='text-blue-500 dark:text-blue-700'>
                                StackOverflow
                            </a>
                        </Link>
                        , as well as creating a paid enterprise support channel enabling large corporations to purchase dedicated support for the SDK from our core engineers.
                    </p>
                </div>
                <div>
                    <div className='flex items-center pr-2 mb-3'>
                        <svg className='w-8 h-8 text-blue-500 dark:text-blue-700' aria-hidden='true' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                            <path d='M156.6 384.9L125.7 353.1C117.2 345.5 114.2 333.1 117.1 321.8C120.1 312.9 124.1 301.3 129.8 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H200C202.4 124 204.8 120.3 207.2 116.7C289.1-4.07 411.1-8.142 483.9 5.275C495.6 7.414 504.6 16.43 506.7 28.06C520.1 100.9 516.1 222.9 395.3 304.8C391.8 307.2 387.1 309.6 384 311.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V380.8C209.9 385.6 197.6 389.7 188.3 392.7C177.1 396.3 164.9 393.2 156.6 384.9V384.9zM384 167.1C406.1 167.1 424 150.1 424 127.1C424 105.9 406.1 87.1 384 87.1C361.9 87.1 344 105.9 344 127.1C344 150.1 361.9 167.1 384 167.1z' />
                        </svg>
                        <h5 className='ml-3 font-semibold text-gray-900'>To improve the reputation of the Titanium ecosystem</h5>
                    </div>
                    <p>This means showing corporations and programmers alike that this platform is amazing, actively supported, and can be trusted for building new applications.</p>

                    <div className='flex items-center pr-2 mt-10 mb-3'>
                        <svg className='w-8 h-8 text-blue-500 dark:text-blue-700' aria-hidden='true' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                            <path d='M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z' />
                        </svg>
                        <h5 className='ml-3 font-semibold text-gray-900'>To actively grow the Titanium developer community</h5>
                    </div>
                    <p>This means organization of paid and volunteer efforts to make our documentation for the SDK amazing, make the technical process for a new programmer to work with the platform as simple as possible, and to encourage/boost/market programmers doing things such as live-streams demonstrating the capabilities of the platform.</p>
                </div>
            </div>
        </>
    );
}
