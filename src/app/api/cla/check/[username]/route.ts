import { checkCLA } from '@/lib/cla';

export async function GET(_req: Request, { params }: { params: { username: string } }) {
	let { username } = params;
	if (!username || typeof username !== 'string') {
		return new Response('Bad request', {
			status: 400
		});
	}

	let signed = false;

	try {
		const info = await checkCLA(username);
		signed = !!info;
	} catch (err: any) {
		console.log(err.toString());
	}

	return new Response(JSON.stringify({ signed }, null, 2));
}
