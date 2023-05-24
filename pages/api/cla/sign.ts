import { authOptions } from '../auth/[...nextauth]';
import { CLA_VERISON, createPDF, getCLABucket, PDFData, uploadFile } from '../../../utils/cla';
import Formidable from 'formidable';
import { getServerSession } from 'next-auth';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { unlink, writeFile } from 'node:fs/promises';
import type { ExtendedProfile } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	api: {
		bodyParser: false
	}
};

interface FormParseResult {
	fields: Formidable.Fields;
	files: Formidable.Files;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const session = await getServerSession(req, res, authOptions);
	if (!session?.user) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const user = session.user as ExtendedProfile;

	try {
		if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
			throw new Error('No multipart');
		}

		const form = new Formidable.IncomingForm({
			multiples: false,
			keepExtensions: true
		});

		const { fields, files } = await new Promise<FormParseResult>((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) {
					return reject(err);
				}
				resolve({ fields, files });
			});
		});

		const signatureFile = !Array.isArray(files.signature) && files.signature.filepath || '';

		const getField = (name: string) => {
			const value = fields[name];
			return typeof value === 'string' ? value.trim() : '';
		};

		const now = new Date();
		const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
		const data: PDFData = {
			fullname: getField('fullname'),
			title: getField('title'),
			company: getField('company'),
			email: getField('email'),
			signatureFile,
			githubUsername: user.username || '',
			today
		};

		if (!data.fullname || !data.email || !data.githubUsername || !signatureFile) {
			throw new Error('Missing user info');
		}

		const pdfFile = await createPDF(data);
		// console.log({ pdfFile });

		const bucket = getCLABucket();
		const destFilename = `${data.githubUsername[0]}/${data.githubUsername}`;

		const pdfExists = await bucket.file(`${destFilename}.pdf`).exists();
		const jsonExists = await bucket.file(`${destFilename}.json`).exists();
		if (pdfExists || jsonExists) {
			throw new Error('CLA already exists');
		}

		// upload pdf
		await bucket.upload(pdfFile, { destination: `${destFilename}.pdf` });
		await unlink(pdfFile);

		const metaFile = join(tmpdir(), `${data.githubUsername}.json`);
		await writeFile(metaFile, JSON.stringify({
			username: data.githubUsername,
			name: data.fullname,
			title: data.title,
			company: data.company,
			email: data.email,
			date: today,
			claVersion: CLA_VERISON
		}, null, 2), 'utf-8');
		await bucket.upload(metaFile, { destination: `${destFilename}.json` });
		await unlink(metaFile);

		res.status(200).json({ message: 'Success' })
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: 'Bad Request'})
	}
}
