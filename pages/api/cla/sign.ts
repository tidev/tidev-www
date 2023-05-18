import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { body } = req;

	// get the signature, fullname, title, company, and email

	res.status(201);
}
