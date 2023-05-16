import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import type { CLAInfo } from '../utils/cla';
import type { Session } from 'next-auth';
import type { ExtendedProfile } from './api/auth/[...nextauth]';

const CONTRIBUTOR_PDF = 'CONTRIBUTOR_CLA_1.2.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

export default function CLA() {
	let { data: session, status } = useSession();
	let [claInfo, setCLAInfo] = useState<CLAInfo | null>(null);

	useEffect(() => {
		fetch('/api/cla')
			.then(res => res.json())
			.then(data => {
				// setCLAInfo(data as CLAInfo);
			})
			.catch(console.error);
	}, []);

	const user = status === 'authenticated' && session?.user ? session.user as ExtendedProfile : null;
	return <ContributeInfo claInfo={claInfo} user={user}/>;
}

interface ContributeInfoParams {
	claInfo: CLAInfo | null;
	user: ExtendedProfile | null;
}

function ContributeInfo({ claInfo, user }: ContributeInfoParams) {
	return (
		<div className='md:w-3/4 w-full mx-auto'>
			{claInfo && <DownloadSignedCLA/>}
			<InterestedInContributing/>
			<ContributingCode/>
			{!claInfo && <ShowCLAForm user={user}/>}
		</div>
	);
}

function DownloadSignedCLA() {
	return (
		<div className='p-4 mb-10 text-center rounded-xl bg-opacity-25 bg-black'>
			<p className='my-10'>Thank you for signing the Contributor License Agreement! You can download your signed PDF below:</p>
			<p className='my-10'>
				<a className='button' href='/api/cla/download' target='_blank'>Download Your Signed CLA</a>
			</p>
			<p className='my-10'>
				Next step is to head over to <Link href="https://github.com/tidev">GitHub</Link> and find a project you'd like to contribute to!
			</p>
		</div>
	);
}

function InterestedInContributing() {
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

function ContributingCode() {
	return (
		<>
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
		</>
	);
}

function ShowCLAForm({ user }: { user: ExtendedProfile | null }) {
	const [pdfPages, setPDFPages] = useState<pdfjs.PDFPageProxy[]>([]);

	useEffect(() => {
		(async () => {
			const url = new URL(CONTRIBUTOR_PDF, window.location.href).href;
			const res = await fetch(url);
			const bytes = await res.arrayBuffer();
			const pdfDoc = await PDFDocument.load(bytes);
			const font = await pdfDoc.embedFont(StandardFonts.CourierBold);
			const pages = pdfDoc.getPages();
			const page = pages[4];
			const { height } = page.getSize();
			const now = new Date();
			const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

			const drawText = (x: number, y: number, str?: string | null) => {
				if (str) {
					page.drawText(str, {
						x,
						y: height - y,
						size: 10,
						font
					});
				}
			};

			// await drawImage(78, 192, 'JoshSignature.png', 0.3);
			// drawText(80, 248, 'Joshua Lambert');
			// drawText(80, 306, 'Board Chairman');
			// drawText(80, 364, 'TiDev, Inc.');
			// drawText(80, 422, 'tidev@smalltownhosting.com');
			// drawText(80, 480, today);

			// await drawImage(312, 192, 'JoshSignature.png', 0.3);
			// drawText(314, 248, user.name);
			// drawText(314, 306, 'Your Title');
			// drawText(314, 364, user.company);
			// drawText(314, 422, user.email);
			drawText(314, 480, today);
			drawText(314, 538, user?.username);

			const pdfBytes = await pdfDoc.save();
			const doc = await pdfjs.getDocument(pdfBytes).promise;
			const pdfPages = [];
			for (let i = 1; i <= doc.numPages; i++) {
				pdfPages.push(await doc.getPage(i));
			}
			setPDFPages(pdfPages);
		})();
	}, []);

	return (
		<>
			<h3 className='mb-6 text-center text-sm font-bold tracking-wider text-blue-500 uppercase dark:text-blue-700'>
				Get Started
			</h3>
			<p className='mb-10'>Please carefully read the agreement. On the last page, login into GitHub, fill out your information, sign, and submit.</p>
			<div className="pdf-container">
				{pdfPages.map((page, i, arr) => {
					if (i + 1 === arr.length) {
						return <PDFPage page={page} user={user} />;
					}
					return <PDFPage page={page}/>;
				})}
			</div>
		</>
	);
}

interface PDFPageParams {
	anchor?: string;
	page: pdfjs.PDFPageProxy;
	user?: ExtendedProfile | null;
}

function PDFPage({ page, user }: PDFPageParams) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);

	const drawPdf = async (page: pdfjs.PDFPageProxy) => {
		const canvas = canvasRef.current;
		const canvasContext = canvas?.getContext('2d');
		if (!canvas || !canvasContext) {
			return;
		}

		// const pixelRatio = window.devicePixelRatio;
		const viewport = page.getViewport({ scale: 2 });
		const pageRatio = viewport.width / viewport.height;
		// const scale = canvas.parentElement!.clientWidth / viewport.width;
		// const scale = 2 * pixelRatio;
		// const viewport = page.getViewport({ scale });

		canvas.style.width = '100%';
		// canvas.style.height = `${viewport.height * scale}px`;
		canvas.style.aspectRatio = `${pageRatio}`;
		canvas.width = viewport.width;
		canvas.height = viewport.height;

		if (renderTaskRef.current) {
			renderTaskRef.current.cancel();
			return;
		}

		renderTaskRef.current = page.render({
			canvasContext,
			viewport
		});

		try {
			await renderTaskRef.current?.promise;
			renderTaskRef.current = null;
		} catch (err: any) {
			renderTaskRef.current = null;
			if (err?.name === 'RenderingCancelledException') {
				await drawPdf(page);
			}
		}
	};

	useEffect(() => {
		drawPdf(page);
	}, [canvasRef, page]);

	return (
		<div className='relative' id={user ? 'sign' : undefined}>
			{user && <form action="/api/cla/sign" method="post">
				<input className='cla-field' name="fullname" value={user.name} style={{ right: '14%', top: '28%', width: '35%' }}/>
				<input className='cla-field' name="title" style={{ right: '14%', top: '35.4%', width: '35%' }}/>
				<input className='cla-field' name="company" value={user.company} style={{ right: '14%', top: '42.8%', width: '35%' }}/>
				<input className='cla-field' name="email" value={user.email} style={{ right: '14%', top: '50.2%', width: '35%' }}/>
				<div className="absolute text-center" style={{ right: '14%', top: '75%', width: '35%' }}>
					<button className='button' type="submit" disabled={true}>Submit</button>
				</div>
			</form>}
			{user === null && <>
				<div className='absolute flex items-center justify-center bg-black bg-opacity-60 rounded-xl'
					style={{
						aspectRatio: 0.55,
						right: '11%',
						top: '18%',
						width: '40%'
					}}>
					<button className='button' onClick={() => signIn('github', { callbackUrl: '/contribute#sign' })}>
						<svg className='w-6 h-6 flex-shrink-0 mr-2' aria-hidden='true' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'></path>
						</svg>
						Login with GitHub
					</button>
				</div>
			</>}
			<canvas ref={canvasRef} style={{ border: '1px solid black', direction: 'ltr' }} />
		</div>
	);
}
