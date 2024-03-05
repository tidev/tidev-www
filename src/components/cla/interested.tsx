import Link from 'next/link';

export default function InterestedInContributing() {
	return (
		<>
			<h2 className='mb-5 text-4xl text-center font-black md:text-4xl dark:text-gray-200'>
				Interested in Contributing?
			</h2>

			<div className='mb-2 text-center text-sm font-bold tracking-wider text-blue-500 uppercase dark:text-blue-700'>
				There are several ways you can contribute to Titanium and TiDev
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-12'>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>New Features &amp; Native Modules</h3>
					<p className='leading-relaxed text-center'>
						Implement new Android and iOS features, add a new API or integration, improve parity and platform support.
					</p>
				</div>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>Bug Fixes &amp; Improvements</h3>
					<p className='leading-relaxed text-center'>
						Fix issues across the SDK, CLI, and libraries, remove deprecated features, improve CI workflows, and add more tests.
					</p>
				</div>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>Documentation</h3>
					<p className='leading-relaxed text-center'>
						Document features and qwirks, add code snippets, fix typos and bad grammer, and remove deprecated content.
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-12'>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>Tests &amp; Testing</h3>
					<p className='leading-relaxed text-center'>
						Help us by building your apps using the latest{' '}
						<Link href='https://downloads.titaniumsdk.com/builds' target='_blank'
							>CI builds</Link> and reporting any issues.
					</p>
				</div>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>Tutorials, Blog Posts, Videos</h3>
					<p className='leading-relaxed text-center'>
						Share your knowledge with the world, write about a Titanium feature, and compare Titanium to other platforms.
					</p>
				</div>
				<div className='py-5 text-center'>
					<h3 className='mb-2 text-lg font-bold'>Donations</h3>
					<p className='leading-relaxed text-center'>
						Consider <Link href='/donate'>making a donation</Link>! We use tax deductible donations to
						pay engineers to fix issues and support the latest Android and iOS releases.
					</p>
				</div>
			</div>
		</>
	);
}
