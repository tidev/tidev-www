'use client';

import { CONTRIBUTOR_PDF } from '@/lib/cla-constants';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useState } from 'react';
import { ExtendedProfile } from '@/lib/auth';
import PDFPage from '@/components/cla/pdf-page';
import PDFSignaturePage from '@/components/cla/pdf-signature-page';
import type { PDFPageProxy } from 'pdfjs-dist';

export default function CLAForm({ user }: { user: ExtendedProfile | null }) {
	const [pdfDoc, setPDFDoc] = useState<PDFDocument | null>(null);
	const [pdfPages, setPDFPages] = useState<PDFPageProxy[] | null>(null);

	useEffect(() => {
		(async () => {
			const url = new URL(CONTRIBUTOR_PDF, window.location.href).href;
			const res = await fetch(url);
			const pdfBytes = await res.arrayBuffer();
			const pdfDoc = await PDFDocument.load(pdfBytes);
			setPDFDoc(pdfDoc);

			const pdfjs = await import('pdfjs-dist');
			pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';

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
					// onSign={onSign}
					return <PDFSignaturePage key={`page_${i}`} pageIdx={i} page={page} pdfDoc={pdfDoc} user={user} />;
				}
				return <PDFPage key={`page_${i}`} pageIdx={i} page={page}/>;
			})}
		</>
	);
}
