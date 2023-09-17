import OpenPdfSign from 'open-pdf-sign';
import { join } from 'node:path';
import { PDFDocument, /* rgb, */ StandardFonts } from 'pdf-lib';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Storage } from '@google-cloud/storage';
import { tmpdir } from 'node:os';

const CONTRIBUTOR_PDF = 'CONTRIBUTOR_CLA_1.2.pdf';
export const CLA_VERISON = '1.2';

export type CLAInfo = {
	username: string;
	name: string;
	title: string;
	company: string,
	email: string;
	date: string;
	claVersion: string;
};

interface CLACache {
	[username: string]: {
		info: CLAInfo;
		ts: number;
	}
}

const cache: CLACache = {};

export function getCLABucket() {
	const storage = new Storage({
		projectId: process.env.GCLOUD_PROJECT_ID,
		credentials: {
			type:                        'service_account',
			project_id:                  process.env.GCLOUD_PROJECT_ID,
			private_key_id:              process.env.GCLOUD_PRIVATE_KEY_ID,
			private_key:                 process.env.GCLOUD_PRIVATE_KEY,
			client_email:                process.env.GCLOUD_CLIENT_EMAIL,
			client_id:                   process.env.GCLOUD_CLIENT_ID,
			auth_uri:                    'https://accounts.google.com/o/oauth2/auth',
			token_uri:                   'https://oauth2.googleapis.com/token',
			auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
			client_x509_cert_url:        process.env.GCLOUD_CLIENT_X509_CERT_URL
		} as any
	});
	return storage.bucket(process.env.GCLOUD_BUCKET!);
}

export async function getPDFDownloadLink(username: string): Promise<string> {
	username = username.trim().toLowerCase();
	const bucket = getCLABucket();
	const pdfFile = bucket.file(`${username[0]}/${username}.pdf`);
	const [pdfURL] = await pdfFile.getSignedUrl({
		action: 'read',
		expires: Date.now() + 2 * 60 * 1000
	});
	return pdfURL;
}

export async function checkCLA(username: string): Promise<CLAInfo | null> {
	username = username.trim().toLowerCase();

	if (cache[username] && cache[username].ts < (Date.now() + 5 * 60 * 1000)) {
		return cache[username].info;
	}

	try {
		const bucket = getCLABucket();
		const jsonFile = bucket.file(`${username[0]}/${username}.json`);
		const [data] = await jsonFile.download();
		const info: CLAInfo = JSON.parse(data.toString());

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

	// page.drawRectangle({
	// 	x: 80,
	// 	y: pageHeight - 188,
	// 	width: 210,
	// 	height: 24,
	// 	color: rgb(1, 0, 0)
	// });
	await drawImage(80, 188, 'utils/JoshSignature.png');
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

		await OpenPdfSign.sign(
			`-i ${unsignedFile}`,
			`-o ${signedFile}`,
			`-k ${resolve('../certs/tidev.io.key')}`,
			`-c ${resolve('../certs/tidev.io.crt')}`,
			'--no-hint',
			'--baseline-lt',
			'--timestamp',
			'--tsa http://timestamp.digicert.com',
			'--page -1',
			`--image ${signatureFile}`,
			'--top 22.5',
			'--left 3.5',
			'--width 14'
		);
	} finally {
		await unlink(unsignedFile);
	}

	return signedFile;
}
