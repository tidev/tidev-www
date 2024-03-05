import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { PDFDocument, /* rgb, */ StandardFonts } from 'pdf-lib';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { CONTRIBUTOR_PDF } from './cla-constants';
import signPDF from './cla-sign-pdf';
import type { CLAInfo } from './cla-types';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const claDir = resolve(__dirname, '../../cla');
export const certsDir = resolve(__dirname, '../../certs');

interface CLACache {
	[username: string]: {
		info: CLAInfo;
		ts: number;
	}
}

const cache: CLACache = {};

export async function getSignedCLAPath(username: string): Promise<string | null> {
	username = username.trim().toLowerCase();
	const pdf = join(claDir, username[0], `${username}.pdf`);
	return fs.existsSync(pdf) ? pdf : null;
}

export async function checkCLA(username: string): Promise<CLAInfo | null> {
	username = username.trim().toLowerCase();

	if (cache[username] && cache[username].ts < (Date.now() + 5 * 60 * 1000)) {
		return cache[username].info;
	}

	try {
		const jsonFile = join(claDir, username[0], `${username}.json`);
		const info: CLAInfo = await fs.readJSON(jsonFile);

		cache[username] = {
			info,
			ts: Date.now()
		}

		return info;
	} catch {
		return null;
	}
}

export interface CreatePDFData {
	fullname: string;
	title: string;
	company: string;
	email: string;
	signatureFile: string;
	githubUsername: string;
	today: string;
};

export async function createPDF({
	fullname,
	title,
	company,
	email,
	signatureFile,
	githubUsername,
	today
}: CreatePDFData): Promise<string> {
	const pdfBytes = await readFile(join('public', CONTRIBUTOR_PDF));
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const font = await pdfDoc.embedFont(StandardFonts.CourierBold);
	const pages = pdfDoc.getPages();
	const page = pages[4];
	const { height: pageHeight } = page.getSize();

	const drawText = (x: number, y: number, str: string) => {
		page.drawText(str, {
			x,
			y: pageHeight - y,
			size: 10,
			font
		});
	};

	const drawImage = async (x: number, y: number, file: string) => {
		const bytes = await readFile(file);
		const image = await pdfDoc.embedPng(bytes);
		const imageRatio = image.width / image.height;
		const bounds = { width: 210, height: 20 };
		const boundsRatio = bounds.width / bounds.height;
		let w, h;

		if (imageRatio > boundsRatio) {
			w = bounds.width;
			h = image.height * (bounds.width / image.width);
		} else {
			w = image.width * (bounds.height / image.height);
			h = bounds.height;
		}

		page.drawImage(image, {
			x,
			y: pageHeight - y,
			width: w,
			height: h
		});
	};

	/*
	 * The `page.drawRectangle()` calls below render a red rectangle used for
	 * manually positioning the signature. The signature image has a
	 * transparent background making it impossible to align.
	 *
	 * Should the template PDF ever change, say a new line is added, uncomment
	 * and position until perfect, then update the `drawImage()` call.
	 */

	// page.drawRectangle({
	// 	x: 80,
	// 	y: pageHeight - 188,
	// 	width: 210,
	// 	height: 24,
	// 	color: rgb(1, 0, 0)
	// });

	await drawImage(80, 188, join(__dirname, 'JoshSignature.png'));
	drawText(80, 248, 'Joshua Lambert');
	drawText(80, 306, 'Board Chairman');
	drawText(80, 364, 'TiDev, Inc.');
	drawText(80, 422, 'tidev@smalltownhosting.com');
	drawText(80, 480, today);

	// page.drawRectangle({
	// 	x: 316,
	// 	y: pageHeight - 188,
	// 	width: 210,
	// 	height: 34,
	// 	color: rgb(1, 0, 0)
	// });

	await drawImage(316, 188, signatureFile);
	drawText(314, 248, fullname);
	drawText(314, 306, title);
	drawText(314, 364, company);
	drawText(314, 422, email);
	drawText(314, 480, today);
	drawText(314, 538, githubUsername);

	pdfDoc.setTitle('TiDev Contributor License Agreement');
	pdfDoc.setAuthor('TiDev, Inc.');
	pdfDoc.setCreator('https://tidev.io');
	pdfDoc.setModificationDate(new Date());

	const unsignedBytes = await pdfDoc.save();
	const unsignedFile = join(tmpdir(), `${githubUsername}.unsigned.pdf`);
	const signedFile = join(tmpdir(), `${githubUsername}.pdf`);

	try {
		await writeFile(unsignedFile, unsignedBytes);

		await signPDF({
			unsignedFile,
			signedFile,
			keyFile: join(certsDir, 'tidev.io.rsa.pkcs1.key'),
			certFile: join(certsDir, 'tidev.io.crt'),
			signatureFile,
			page: '-1',
			top: '22.5',
			left: '3.5',
			width: '14'
		});
	} finally {
		await unlink(unsignedFile);
	}

	return signedFile;
}
