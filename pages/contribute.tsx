import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { CLAInfo } from '../utils/cla';
import type { Session } from 'next-auth';

export default function CLA() {
	const { data: session, status } = useSession();
	const [claInfo, setCLAInfo] = useState<CLAInfo | null>(null);
	const [isLoadingCLA, setLoadingCLA] = useState(false);

	useEffect(() => {
		setLoadingCLA(true);
		fetch('/api/cla')
			.then(res => res.json())
			.then(data => {
				setCLAInfo(data as CLAInfo);
				setLoadingCLA(false);
			})
			.catch(console.error);
	}, []);

	if (status === 'authenticated' && session?.user) {
		if (isLoadingCLA) {
			return <div />;
		}

		return <ShowCLA session={session} claInfo={claInfo} />
	}

	return <ContributeInfo />;
}

function ShowCLA({ claInfo, session }: { claInfo: CLAInfo | null, session: Session }) {
	const { name } = session.user as any;
	return (
		<div className='md:w-3/4 w-full mx-auto'>
			<h2 className='mb-5 text-4xl text-center font-black md:text-4xl dark:text-gray-200'>
				Welcome {name}!
			</h2>
			{claInfo && <ShowCLADownload />}
			{!claInfo && <ShowCLAForm />}
		</div>
	);
}

function ShowCLADownload() {
	return (
		<>
			<p className='my-10'>Thank you for signing the CLA!</p>
			<p>
				<a className='text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded text-lg no-underline' href='/api/cla/download' target='_blank'>Download CLA</a>
			</p>
		</>
	);
}

function ShowCLAForm() {
	return (
		<>
			<p>Please review the Contributor License Agreement, fill out the required fields, and submit when ready.</p>
		</>
	);
}

function ContributeInfo() {
	return (
		<div className='md:w-3/4 w-full mx-auto'>
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

			<h2 className='my-5 text-4xl text-center font-black md:text-4xl dark:text-gray-200'>
				Contributing Code
			</h2>

			<p className='mb-5'>Source code contributions are always welcome! Before we can accept your pull request, you must sign a Contributor License Agreement (CLA).</p>

			<h3 className='my-5 text-lg text-blue-500 dark:text-blue-700'>
				What is a CLA?
			</h3>
			<p className='mb-5'>A contributor license agreement is a legally binding document in which you sign and agree to that all
			intellectual property ownership rights for any source code, documentation, and other contributions will belong to TiDev, Inc.</p>
			<p className='mb-5'>A CLA ensures that all code, docs, etc belongs to TiDev and allows us to avoid any ownership disputes.
			Currently, our CLA is designed for an individual and TiDev, Inc. Please check that your employer allows you to sign our CLA
			prior to any contributions.</p>

			<h3 className='my-5 text-lg text-blue-500 dark:text-blue-700'>
				Get Started
			</h3>
			<p className='mb-10'>To get started, please sign in using your GitHub account.</p>
			<p className='text-center'>
				<button className='bg-white inline-flex px-5 py-2 rounded-sm text-black' onClick={() => signIn('github', { callbackUrl: '/contribute' })}>
					<svg className='w-6 h-6 flex-shrink-0 mr-2' aria-hidden='true' fill='currentColor' viewBox='0 0 24 24'>
						<path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'></path>
					</svg>
					Login with GitHub
				</button>
			</p>
		</div>
	);
}
