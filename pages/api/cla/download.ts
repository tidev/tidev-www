import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from "next"
import { getPDFDownloadLink } from '../../../utils/cla';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (session) {
		const user = session.user as any;
		const url = await getPDFDownloadLink(user.username);
		return res.redirect(url);
	}

	res.status(403).json({ error: 'Forbidden' });
}
