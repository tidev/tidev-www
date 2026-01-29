import { spawnSync } from 'node:child_process';
import which from 'which';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const jar = resolve(dirname(fileURLToPath(import.meta.url)), '../../vendor/open-pdf-sign.jar');

export default async function signPDF({
	unsignedFile,
	signedFile,
	keyFile,
	certFile,
	signatureFile,
	page,
	top,
	left,
	width
}: {
	unsignedFile: string;
	signedFile: string;
	keyFile: string;
	certFile: string;
	signatureFile: string;
	page: string;
	top: string;
	left: string;
	width: string;
}) {
	const java = await which('java', { nothrow: true });

	 let args = [
		'-jar', jar,
		'-i', unsignedFile,
		'-o', signedFile,
		'-k', keyFile,
		'-c', certFile,
		'--no-hint',
		'--baseline-lt', // used to be '--baseline-lt', but removed due to "No revocation data found" errors
		'--timestamp',
		'--tsa', 'http://timestamp.digicert.com',
		'--page', page,
		'--image', signatureFile,
		'--top', top,
		'--left', left,
		'--width', width
	];

	console.log(`Executing: java ${args.join(' ')}`);
	const { status } = spawnSync('java', args, { stdio: 'inherit' });
	if (status !== 0) {
		throw new Error('Failed to sign PDF');
	}
}
