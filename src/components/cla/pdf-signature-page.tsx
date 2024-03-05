'use client';

import { useEffect, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { signIn /*, useSession*/ } from 'next-auth/react';
import drawPdf from '@/lib/cla-draw-pdf';
import SignatureModal from '@/components/cla/signature-modal';
import type { ExtendedProfile } from '@/lib/auth';
import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
import type { MouseEvent } from 'react';
import type { Signature } from '@/lib/cla-types';
import type { OnSignCallback } from '@/lib/cla-types';

interface PDFPageParams {
	page: PDFPageProxy;
	pageIdx: number;
}

interface PDFSignaturePageParams extends PDFPageParams {
	onSign: OnSignCallback;
	pdfDoc: PDFDocument;
	user?: ExtendedProfile | null;
}

interface AlertMessage {
	message: string;
	type: 'info' | 'error';
}

export default function PDFSignaturePage({ onSign, page, pageIdx, pdfDoc, user }: PDFSignaturePageParams) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const renderTaskRef = useRef<RenderTask | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	const pageRef = useRef<PDFPageProxy | null>(page);
	const [formData, setFormData] = useState({
		fullname: user?.name || '',
		title: '',
		company: user?.company || '',
		email: user?.email || ''
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [sig, setSig] = useState<Signature | null>(null);
	const [showAlertModal, setShowAlertModal] = useState<AlertMessage | null>(null);
	const [showSigModal, setShowSigModal] = useState(false);
	const scrolledRef = useRef(false);
	const isSigned = (sig: Signature | null) => !!(sig?.kind && sig.image && sig.trimmed);
	const isFullNameValid = () => !!formData.fullname.trim();
	const isEmailValid = () => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(formData.email.trim());
	const isValid = () => isSigned(sig) && isFullNameValid() && isEmailValid();
	const [claSignatureErrorClass, setCLASignatureErrorClass] = useState('');

	const onSave = (sig: Signature) => {
		setShowSigModal(false);
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
				const { StandardFonts } = await import('pdf-lib');
				const { getDocument } = await import('pdfjs-dist');
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
				const doc = await getDocument(bytes).promise;
				pageRef.current = await doc.getPage(pageIdx + 1);
			}
			drawPdf(pageRef, canvasRef, renderTaskRef);
			scaleForm();
		})();
	}, [canvasRef, pageIdx, pageRef, pdfDoc, user]);

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
	}, [user, scrolledRef]);

	const submitForm = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();

		if (!isValid() || !sig?.trimmed) {
			setShowAlertModal({
				type: 'info',
				message: 'Please sign, enter your full name, and email address.'
			});
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

		setIsSubmitting(true);

		fetch('/api/cla/sign', {
			method: 'POST',
			body: fd
		})
			.then(async res => {
				if (!res.ok) {
					throw new Error((await res.json()).message);
				}
				const claInfo = await res.json();
				// console.log(claInfo);
				onSign(claInfo);
				window.scrollTo({
					behavior: 'smooth',
					top: 0
				});
			})
			.catch(err => {
				setIsSubmitting(false);
				setShowAlertModal({
					type: 'error',
					message: `Error: ${err.message}`
				});
			});
	};

	return (
		<div className='relative' id={user ? 'sign' : ''}>
			{user ? <>
				<form className="cla-form" ref={formRef}>
					<div
						className={`cla-signature ${claSignatureErrorClass} ${sig?.trimmed ? 'justify-start' : 'justify-center'}`}
						onClick={() => setShowSigModal(true)}
						style={{ top: '240px' }}>
						{sig?.trimmed
							? <img alt="Signature" src={sig.trimmed}/>
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
						<button className='button' onClick={submitForm} disabled={isSubmitting || !isValid()}>
							{isSubmitting ? <>
								Processing
								<img alt="Loading" className="loading" src="/loading.png" />
							</> : 'Submit'}
						</button>
					</div>
				</form>
				{showSigModal &&
					<SignatureModal
						fullname={formData.fullname}
						onCancel={() => setShowSigModal(false)}
						onSave={onSave}
						sig={sig}
						/>
				}
				{showAlertModal &&
					<AlertModal
						data={showAlertModal}
						onClose={() => setShowAlertModal(null)}
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

function AlertModal({
	data,
	onClose
}: {
	data: AlertMessage;
	onClose: () => void;
}) {
	return (
		<>
			<div className="cla-modal">
				<div className="cla-modal-squeeze">
					<div className="cla-modal-win pt-6">
						{data.message.split(/\n\n/).map((chunk, i) => {
							return <p className="px-10 my-2" key={`chunk_${i}`}>{chunk}</p>
						})}
						{data.type === 'error' &&
							<p className="px-10 my-2">Hit us up on <a href="https://tidev.slack.com/" target="_blank">Slack</a> or email <a href="mailto:cla@tidev.io">cla@tidev.io</a> for help!</p>
						}
						<div className="flex items-center p-6 rounded-b">
							<button
								className="button mx-auto"
								type="button"
								onClick={onClose}
								>OK</button>
						</div>
					</div>
				</div>
			</div>
			<div className="cla-modal-bg"></div>
		</>
	);
}
