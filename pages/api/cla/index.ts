import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from "next"
import { checkCLA } from '../../../utils/cla';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (session) {
		const user = session.user as any;
		const info = await checkCLA(user.username);
		if (info) {
			return res.send({
				signed: true,
				...info
			});
		}
	}

	res.send({
		signed: false
	});
}
