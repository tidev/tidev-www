import { useEffect, useRef } from 'react';
import drawPdf from '@/lib/cla-draw-pdf';
import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';

interface PDFPageParams {
	page: PDFPageProxy;
	pageIdx: number;
}

export default function PDFPage({ page }: PDFPageParams) {
	const pageRef = useRef<PDFPageProxy | null>(page);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const renderTaskRef = useRef<RenderTask | null>(null);

	useEffect(() => {
		drawPdf(pageRef, canvasRef, renderTaskRef);
	}, [canvasRef, pageRef]);

	return (
		<div className='relative'>
			<canvas ref={canvasRef} style={{ border: '1px solid black', direction: 'ltr' }} />
		</div>
	);
}
