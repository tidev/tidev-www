import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from "next"
import { Storage } from '@google-cloud/storage';
import { checkCLA } from '../../../utils/cla';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// if (req.headers.authorization !== 'Bearer secret') {
	// 	res.status(403).json({ error: 'Forbidden' });
	// 	return;
	// }

	let { username } = req.query;
	if (!username || typeof username !== 'string') {
		res.status(400).json({ error: 'Bad request' });
		return;
	}

	try {
		const info = await checkCLA(username);
		if (info) {
			res.send({
				signed: true,
				...info
			});
		}
	} catch (err: any) {
		console.log(err.toString());
	}

	res.send({
		signed: false
	});
}
