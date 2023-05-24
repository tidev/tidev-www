import Link from 'next/link';
import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useSession, signIn } from 'next-auth/react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import type { CLAInfo } from '../utils/cla';
// import type { Session } from 'next-auth';
import type { ExtendedProfile } from './api/auth/[...nextauth]';
import SignatureCanvas from 'react-signature-canvas';
import { Hurricane } from 'next/font/google';
import ReactSignatureCanvas from 'react-signature-canvas';

const CONTRIBUTOR_PDF = 'CONTRIBUTOR_CLA_1.2.pdf';

const signatureFont = Hurricane({
	subsets: ['latin'],
	weight: ['400']
});

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

interface CLASignedInfo extends Partial<CLAInfo> {
	signed: boolean;
}

export default function CLA() {
	let { data: session, status } = useSession();
	let [claInfo, setCLAInfo] = useState<CLASignedInfo | null>(null);

	useEffect(() => {
		fetch('/api/cla')
			.then(res => res.json())
			.then((data: CLASignedInfo) => {
				// setCLAInfo(data);
			})
			.catch(console.error);
	}, []);

	const user = status === 'authenticated' && session?.user ? session.user as ExtendedProfile : null;
	return <ContributeInfo claInfo={claInfo} user={user}/>;
}

interface ContributeInfoParams {
	claInfo: CLASignedInfo | null;
	user: ExtendedProfile | null;
}

function ContributeInfo({ claInfo, user }: ContributeInfoParams) {
	// user = null;
	return (
		<div className='md:w-3/4 w-full mx-auto'>
			{claInfo?.signed && <DownloadSignedCLA/>}
			<InterestedInContributing/>
			<ContributingCode/>
			{claInfo?.signed !== true && <ShowCLAForm user={user}/>}
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
	const [pdfDoc, setPDFDoc] = useState<PDFDocument | null>(null);
	const [pdfPages, setPDFPages] = useState<pdfjs.PDFPageProxy[] | null>(null);

	useEffect(() => {
		(async () => {
			const url = new URL(CONTRIBUTOR_PDF, window.location.href).href;
			const res = await fetch(url);
			const pdfBytes = await res.arrayBuffer();
			const pdfDoc = await PDFDocument.load(pdfBytes);
			setPDFDoc(pdfDoc);

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
			{pdfDoc && pdfPages?.map((page, i, arr) => {
				if (i + 1 === arr.length) {
					return <PDFSignaturePage key={`page_${i}`} pageIdx={i} page={page} pdfDoc={pdfDoc} user={user} />;
				}
				return <PDFPage key={`page_${i}`} pageIdx={i} page={page}/>;
			})}
		</>
	);
}

interface PDFPageParams {
	page: pdfjs.PDFPageProxy;
	pageIdx: number;
}

interface PDFSignaturePageParams extends PDFPageParams {
	user?: ExtendedProfile | null;
	pdfDoc: PDFDocument;
}

async function drawPdf(
	page: pdfjs.PDFPageProxy,
	canvasRef: MutableRefObject<HTMLCanvasElement | null>,
	renderTaskRef: MutableRefObject<pdfjs.RenderTask | null>
) {
	const canvas = canvasRef.current;
	const canvasContext = canvas?.getContext('2d');
	if (!canvas || !canvasContext) {
		return;
	}

	const viewport = page.getViewport({ scale: 2 });
	const pageRatio = viewport.width / viewport.height;

	canvas.style.width = '100%';
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
			await drawPdf(page, canvasRef, renderTaskRef);
		}
	}
};

function PDFPage({ page }: PDFPageParams) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);

	useEffect(() => {
		drawPdf(page, canvasRef, renderTaskRef);
	}, [canvasRef, page]);

	return (
		<div className='relative'>
			<canvas ref={canvasRef} style={{ border: '1px solid black', direction: 'ltr' }} />
		</div>
	);
}

function PDFSignaturePage({ page, pageIdx, pdfDoc, user }: PDFSignaturePageParams) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [formData, setFormData] = useState({
		fullname: user?.name || '',
		title: '',
		company: user?.company || '',
		email: user?.email || ''
	});
	const [sig, setSig] = useState<Signature | null>(null);
	const [showModal, setShowModal] = useState(false);
	const scrolledRef = useRef(false);
	const isSigned = (sig: Signature | null) => !!(sig?.kind && sig.image && sig.trimmed);
	const isFullNameValid = () => !!formData.fullname.trim();
	const isEmailValid = () => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(formData.email.trim());
	const isValid = () => isSigned(sig) && isFullNameValid() && isEmailValid();
	const [claSignatureErrorClass, setCLASignatureErrorClass] = useState('');

	const onSave = (sig: Signature) => {
		setSig(sig);
		setCLASignatureErrorClass(isSigned(sig) ? '' : 'cla-invalid');
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}

	const scaleForm = () => {
		const canvas = canvasRef.current;
		const form = formRef.current;
		if (canvas && form) {
			const scale: number = parseFloat(window.getComputedStyle(canvas).getPropertyValue('width')) / 1000;
			form.style.transform = `scale(${scale})`;
		}
	};

	useEffect(() => {
		(async () => {
			if (pdfDoc && user) {
				const font = await pdfDoc.embedFont(StandardFonts.CourierBold);
				const pages = pdfDoc.getPages();
				const page2 = pages[pageIdx];
				const { height } = page2.getSize();
				const now = new Date();
				const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

				const drawText = (x: number, y: number, str?: string | null) => {
					if (str) {
						page2.drawText(str, {
							x,
							y: height - y,
							size: 10,
							font
						});
					}
				};

				drawText(314, 480, today);
				drawText(314, 538, user.username);

				const bytes = await pdfDoc.save();
				const doc = await pdfjs.getDocument(bytes).promise;
				page = await doc.getPage(pageIdx + 1);
			}
			drawPdf(page, canvasRef, renderTaskRef);
			scaleForm();
		})();
	}, [canvasRef, page, pdfDoc, user]);

	useEffect(() => {
		window.addEventListener('resize', scaleForm);
	}, [formRef]);

	useEffect(() => {
		if (user && location.hash === '#sign' && !scrolledRef.current) {
			const el = document.getElementById('sign');
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
				scrolledRef.current = true;
			}
		}
	}, []);

	const submitForm = (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();

		if (!isValid() || !sig?.trimmed) {
			alert('Form is invalid!');
			return;
		}

		const sigData = window.atob(sig.trimmed.split(',')[1]);
		const ia = new Uint8Array(new ArrayBuffer(sigData.length));
		for (let i = 0; i < sigData.length; i++) {
			ia[i] = sigData.charCodeAt(i);
		}
		const sigBlob = new Blob([ia], { type: 'image/png' });

		const fd = new FormData();
		fd.set('fullname', formData.fullname);
		fd.set('title', formData.title);
		fd.set('company', formData.company);
		fd.set('email', formData.email);
		fd.set('signature', sigBlob, 'sig.png');

		fetch('/api/cla/sign', {
			method: 'POST',
			body: fd
		})
			.then(res => {
				console.log('SUCCESS!');
			})
			.catch(err => {
				console.log('ERROR!', err);
			});
	};

	return (
		<div className='relative' id={user ? 'sign' : ''}>
			{user ? <>
				<form className="cla-form" ref={formRef}>
					<div
						className={`cla-signature ${claSignatureErrorClass} ${sig?.trimmed ? 'justify-start' : 'justify-center'}`}
						onClick={() => setShowModal(true)}
						style={{ top: '240px' }}>
						{sig?.trimmed
							? <img src={sig.trimmed}/>
							: <span>
								<span className="pr-2">Click to Sign</span>
								<svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 24 24'>
									<path d="M16.4798956,21.0019578 L16.75,21 C17.9702352,21 18.6112441,21.5058032 19.4020627,22.7041662 L19.7958278,23.3124409 C20.1028266,23.766938 20.2944374,23.9573247 20.535784,24.0567929 C20.9684873,24.2351266 21.3271008,24.1474446 22.6440782,23.5133213 L23.0473273,23.3170319 C23.8709982,22.9126711 24.4330286,22.6811606 25.0680983,22.5223931 C25.4699445,22.4219316 25.8771453,22.6662521 25.9776069,23.0680983 C26.0780684,23.4699445 25.8337479,23.8771453 25.4319017,23.9776069 C25.0371606,24.0762922 24.6589465,24.2178819 24.1641364,24.4458997 L23.0054899,25.0032673 C21.4376302,25.7436944 20.9059009,25.8317321 19.964216,25.4436275 C19.3391237,25.1860028 18.9836765,24.813298 18.4635639,24.0180227 L18.2688903,23.7140849 C17.6669841,22.7656437 17.3640608,22.5 16.75,22.5 L16.5912946,22.5037584 C16.1581568,22.5299816 15.8777212,22.7284469 14.009281,24.1150241 C12.2670395,25.4079488 10.9383359,26.0254984 9.24864243,26.0254984 C7.18872869,26.0254984 5.24773367,25.647067 3.43145875,24.8905363 L6.31377803,24.2241784 C7.25769404,24.4250762 8.23567143,24.5254984 9.24864243,24.5254984 C10.5393035,24.5254984 11.609129,24.0282691 13.1153796,22.9104743 L14.275444,22.0545488 C15.5468065,21.1304903 15.8296113,21.016032 16.4798956,21.0019578 L16.4798956,21.0019578 Z M22.7770988,3.22208979 C24.4507223,4.8957133 24.4507566,7.60916079 22.7771889,9.28281324 L21.741655,10.3184475 C22.8936263,11.7199657 22.8521526,13.2053774 21.7811031,14.279556 L18.7800727,17.2805874 L18.7800727,17.2805874 C18.4870374,17.5733384 18.0121637,17.573108 17.7194126,17.2800727 C17.4266616,16.9870374 17.426892,16.5121637 17.7199273,16.2194126 L20.7188969,13.220444 C21.2039571,12.7339668 21.2600021,12.1299983 20.678941,11.3818945 L10.0845437,21.9761011 C9.78635459,22.2743053 9.41036117,22.482705 8.99944703,22.5775313 L2.91864463,23.9807934 C2.37859061,24.1054212 1.89457875,23.6214094 2.0192066,23.0813554 L3.42247794,17.0005129 C3.51729557,16.5896365 3.72566589,16.2136736 4.0238276,15.9154968 L16.7165019,3.22217992 C18.3900415,1.54855555 21.1034349,1.54851059 22.7770988,3.22208979 Z"></path>
								</svg>
							</span>
						}
					</div>
					<input
						name="fullname"
						className={isFullNameValid() ? '' : 'cla-invalid'}
						required
						onChange={handleInput}
						value={formData.fullname}
						style={{ top: '365px' }}/>
					<input
						name="title"
						onChange={handleInput}
						value={formData.title}
						style={{ top: '460px' }}/>
					<input
						name="company"
						onChange={handleInput}
						value={formData.company}
						style={{ top: '554px' }}/>
					<input
						name="email"
						className={isEmailValid() ? '' : 'cla-invalid'}
						required
						onChange={handleInput}
						value={formData.email}
						style={{ top: '650px' }}/>
					<div className="cla-submit" style={{ top: '950px' }}>
						<button className='button' onClick={submitForm} disabled={!isValid()}>Submit</button>
					</div>
				</form>
				{showModal &&
					<SignatureModal
						fullname={formData.fullname}
						setShowModal={setShowModal}
						sig={sig}
						onSave={onSave}
						/>
				}
			</> : <>
				<div className='cla-login'>
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

interface Signature {
	kind: 'sign' | 'type';
	image?: string;
	trimmed?: string;
	text?: string;
}

function SignatureModal({
	fullname,
	onSave,
	sig,
	setShowModal
}: {
	fullname: string;
	onSave: (sig: Signature) => void;
	sig: Signature | null;
	setShowModal: (showModal: boolean) => void;
}) {
	const [activeTab, setActiveTab] = useState<Signature['kind']>(sig?.kind || 'sign');
	const [sigText, setSigText] = useState(sig?.kind === 'type' && sig.text !== undefined ? sig.text : fullname);
	const sigCanvasRef = useRef<ReactSignatureCanvas | null>(null);
	const sigTextRef = useRef<HTMLInputElement | null>(null);
	const loadedSigRef = useRef(false);

	const save = () => {
		const kind = activeTab;
		let text = sigTextRef.current?.value.trim() || '';
		let image: string | undefined;
		let trimmed: string | undefined;

		if (activeTab === 'sign') {
			const sigCanvas = sigCanvasRef.current;
			if (sigCanvas && (!sigCanvas.isEmpty() || loadedSigRef.current)) {
				image = sigCanvas.toDataURL();
				trimmed = sigCanvas.getTrimmedCanvas().toDataURL();
			}
		} else if (activeTab === 'type' && text) {
			const canvas = document.createElement('canvas');
			canvas.width = 450;
			canvas.height = 100;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.font = `48px ${signatureFont.style.fontFamily}`;
				ctx.fillStyle = '#000000';
				ctx.fillText(text, 5, 42);
				trimmed = image = cropCanvas(canvas, ctx)?.toDataURL();
			}
		}

		setShowModal(false);

		console.log(image);

		onSave({
			kind,
			image,
			text,
			trimmed
		});
	};

	const reset = () => {
		sigCanvasRef.current?.clear();
		loadedSigRef.current = false;
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			save();
		}
	};

	useEffect(() => {
		if (activeTab === 'type') {
			sigTextRef.current?.focus();
		}
	}, [activeTab, sigTextRef]);

	useEffect(() => {
		const sigCanvas = sigCanvasRef.current;
		if (activeTab === 'sign' && sigCanvas) {
			const canvas = sigCanvas.getCanvas();
			if (canvas.parentElement) {
				const w = parseInt(window.getComputedStyle(canvas.parentElement).width);
				if (canvas.width !== w) {
					canvas.width = w;
				}
			}

			if (sig?.kind === 'sign' && sig.image && sigCanvasRef.current && !loadedSigRef.current) {
				sigCanvasRef.current.fromDataURL(sig.image);
				loadedSigRef.current = true;
			}
		}
	}, [activeTab, sigCanvasRef]);

	return (
		<>
			<div className="cla-modal">
				<div className="cla-modal-squeeze">
					<div className="cla-modal-win">
						<div className="tab-bar">
							<button
								className={activeTab === 'sign' ? 'active' : ''}
								onClick={() => setActiveTab('sign')}>Sign</button>
							<button
								className={activeTab === 'type' ? 'active' : ''}
								onClick={() => setActiveTab('type')}>Type</button>
						</div>
						<div className="relative px-6 py-2 flex-auto">
							<div className={`cla-sig-bg ${activeTab === 'sign' ? 'block' : 'hidden'}`}>
								<SignatureCanvas
									canvasProps={{
										height: 120
									}}
									clearOnResize={false}
									ref={sigCanvasRef}
									/>
							</div>
							<div className={`cla-sig-bg cla-sig-text-line ${activeTab === 'type' ? 'block' : 'hidden'}`}>
								<input
									autoComplete="off"
									className={`cla-sign-text ${signatureFont.className}`}
									name="sig-text"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSigText(e.target.value)}
									onKeyDown={handleKeyDown}
									ref={sigTextRef}
									type="text"
									value={sigText}
									/>
							</div>
						</div>
						<div className="flex items-center p-6 rounded-b">
							{activeTab === 'sign' && <button
								className="button-secondary"
								type="button"
								onClick={reset}
								>Reset</button>
							}
							<button
								className="button-secondary mr-12 ml-auto"
								type="button"
								onClick={() => setShowModal(false)}
								>Cancel</button>
							<button
								className="button"
								type="button"
								onClick={save}
								>Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="cla-modal-bg"></div>
		</>
	);
}

function cropCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): HTMLCanvasElement | undefined {
	const { width, height } = canvas;
	const { data } = ctx.getImageData(0, 0, width, height);

	let maxX = 0;
	let maxY = 0;
	let minX = width;
	let minY = height;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			const a = data[i + 3] / 255;
			const r = Math.round(data[i] * a + 255 * (1 - a));
			const g = Math.round(data[i + 1] * a + 255 * (1 - a));
			const b = Math.round(data[i + 2] * a + 255 * (1 - a));
			if (r !== 255 || g !== 255 || b !== 255) {
				if (x < minX) minX = x;
				if (y < minY) minY = y;
				if (x > maxX) maxX = x;
				if (y > maxY) maxY = y;
			}
		}
	}

	const w = maxX - minX + 1;
	const h = maxY - minY + 1;
	const croppedCanvas = document.createElement('canvas');
	croppedCanvas.width = w;
	croppedCanvas.height = h;

	const croppedCtx = croppedCanvas.getContext('2d');
	if (croppedCtx) {
		croppedCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
		return croppedCanvas;
	}
}
