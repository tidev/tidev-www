import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
import type { MutableRefObject } from 'react';

export default async function drawPdf(
	pageRef: MutableRefObject<PDFPageProxy | null>,
	canvasRef: MutableRefObject<HTMLCanvasElement | null>,
	renderTaskRef: MutableRefObject<RenderTask | null>
) {
	const canvas = canvasRef.current;
	const canvasContext = canvas?.getContext('2d');
	if (!pageRef.current || !canvas || !canvasContext) {
		return;
	}

	const page = pageRef.current;
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
			await drawPdf(pageRef, canvasRef, renderTaskRef);
		}
	}
}
