import { authOptions } from '@/lib/auth';
import { checkCLA } from '@/lib/cla';
import { getServerSession } from 'next-auth/next';

export async function GET(_req: Request) {
	const session = await getServerSession(authOptions);
	let result = {
		signed: false
	};

	if (session) {
		const user = session.user as any;
		const info = await checkCLA(user.username);
		if (info) {
			result = {
				signed: true,
				...info
			};
		}
	}

	return new Response(JSON.stringify(result, null, 2));
}
