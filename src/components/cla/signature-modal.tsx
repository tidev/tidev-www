'use client';

import ReactSignatureCanvas from 'react-signature-canvas';
import { useEffect, useRef, useState } from 'react';
import { Hurricane } from 'next/font/google';
import type { Signature } from '@/lib/cla-types';

const signatureFont = Hurricane({
	subsets: ['latin'],
	weight: ['400']
});

export default function SignatureModal({
	fullname,
	onCancel,
	onSave,
	sig
}: {
	fullname: string;
	onCancel: () => void;
	onSave: (sig: Signature) => void;
	sig: Signature | null;
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

		// console.log(image); // log data url containing png image

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
								<ReactSignatureCanvas
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
								onClick={onCancel}
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
