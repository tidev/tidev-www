import { authOptions } from '@/lib/auth';
import { CLA_VERISON } from '@/lib/cla-constants';
import { claDir, createPDF, CreatePDFData } from '@/lib/cla';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { copyFile, unlink, writeFile } from 'node:fs/promises';
import { getServerSession } from 'next-auth/next';
import type { ExtendedProfile } from '@/lib/auth';
import { tmpdir } from 'node:os';

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	const user = session?.user ? session.user as ExtendedProfile : null;;
	if (!user?.username) {
		return new Response('Unauthorized', {
			status: 401
		});
	}

	let signatureFile: null | string = null;

	try {
		if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
			throw new Error('No multipart');
		}

		const { username } = user;
		const isDev = process.env.NODE_ENV === 'development';
		const destFilename = `${username[0]}/${username}${isDev ? '.test' : ''}`;
		const destJson = join(claDir, `${destFilename}.json`);
		const destPdf = join(claDir, `${destFilename}.pdf`);
		if (!isDev && (existsSync(destJson) || existsSync(destPdf))) {
			throw new Error('CLA already signed');
		}

		const form = await req.formData();
		const now = new Date();
		const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
		const file: File | null = form.get('signature') as unknown as File;
		if (!file?.name) {
			throw new Error('No signature file');
		}
		signatureFile = join(tmpdir(), `tidev-${file.name}`);
		await writeFile(signatureFile, Buffer.from(await file.arrayBuffer()));
		const data: CreatePDFData = {
			fullname: form.get('fullname') as string,
			title: form.get('title') as string,
			company: form.get('company') as string,
			email: form.get('email') as string,
			signatureFile,
			githubUsername: username || '',
			today
		};

		if (!data.fullname || !data.email) {
			throw new Error('Missing user info');
		}

		const pdfFile = await createPDF(data);
		await copyFile(pdfFile, destPdf);
		await unlink(pdfFile);

		const claInfo = {
			username: data.githubUsername,
			name: data.fullname,
			title: data.title,
			company: data.company,
			email: data.email,
			date: today,
			claVersion: CLA_VERISON
		};
		await writeFile(destJson, JSON.stringify(claInfo, null, 2));

		return new Response(JSON.stringify({
			signed: true,
			...claInfo
		}, null, 2));
	} catch (err: unknown) {
		console.log(err);
		return new Response(JSON.stringify({
			message: err instanceof Error && err.message || 'Bad Request'
		}, null, 2), {
			status: 400
		});
	} finally {
		if (signatureFile) {
			await unlink(signatureFile);
		}
	}
}
