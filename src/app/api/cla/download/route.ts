import { authOptions } from '@/lib/auth';
import { ReadStream, createReadStream } from 'node:fs';
import { getSignedCLAPath } from '@/lib/cla';
import { getServerSession } from 'next-auth/next';

async function* createIterator(stream: ReadStream) {
	for await (const chunk of stream) {
		yield chunk;
	}
}

export async function GET(_req: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response('Forbidden', {
			status: 403
		});
	}

	const user = session.user as any;
	const pdf = await getSignedCLAPath(user.username);

	if (pdf) {
		const iterator = createIterator(createReadStream(pdf));

		return new Response(new ReadableStream({
			async pull(controller) {
				const { value, done } = await iterator.next()
				if (done) {
					controller.close()
				} else {
					controller.enqueue(new Uint8Array(value))
				}
			}
		}));
	}

	return new Response('Not found', {
		status: 404
	});
}
