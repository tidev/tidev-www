import { authOptions } from '../auth/[...nextauth]';
import { createPDF, PDFData } from '../../../utils/cla';
import Formidable from 'formidable';
import { getServerSession } from 'next-auth';
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

		const data: PDFData = {
			fullname: getField('fullname'),
			title: getField('title'),
			company: getField('company'),
			email: getField('email'),
			signatureFile,
			githubUsername: user.username || ''
		};

		if (!data.fullname || !data.email || !data.githubUsername || !signatureFile) {
			throw new Error('Missing user info');
		}

		const pdfFile = await createPDF(data);
		console.log({ pdfFile });
		// sign pdf
		// upload pdf

		res.status(200).send({ message: 'ok' })
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: 'Bad Request'})
	}
}
