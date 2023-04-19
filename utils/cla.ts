import { Storage } from '@google-cloud/storage';

export type CLAInfo = {
	username: string;
	name: string;
	title: string;
	company: string,
	email: string;
	date: string;
	claVersion: string;
};

interface CLACache {
	[username: string]: {
		info: CLAInfo;
		ts: number;
	}
}

const cache: CLACache = {};

function getCLABucket() {
	const storage = new Storage({
		projectId: process.env.GCLOUD_PROJECT_ID,
		credentials: {
			type:                        'service_account',
			project_id:                  process.env.GCLOUD_PROJECT_ID,
			private_key_id:              process.env.GCLOUD_PRIVATE_KEY_ID,
			private_key:                 process.env.GCLOUD_PRIVATE_KEY,
			client_email:                process.env.GCLOUD_CLIENT_EMAIL,
			client_id:                   process.env.GCLOUD_CLIENT_ID,
			auth_uri:                    'https://accounts.google.com/o/oauth2/auth',
			token_uri:                   'https://oauth2.googleapis.com/token',
			auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
			client_x509_cert_url:        process.env.GCLOUD_CLIENT_X509_CERT_URL
		} as any
	});
	return storage.bucket(process.env.GCLOUD_BUCKET!);
}

export async function getPDFDownloadLink(username: string): Promise<string> {
	username = username.trim().toLowerCase();
	const bucket = getCLABucket();
	const pdfFile = bucket.file(`${username[0]}/${username}.pdf`);
	const [pdfURL] = await pdfFile.getSignedUrl({
		action: 'read',
		expires: Date.now() + 2 * 60 * 1000
	});
	return pdfURL;
}

export async function checkCLA(username: string): Promise<CLAInfo> {
	username = username.trim().toLowerCase();

	if (cache[username] && cache[username].ts < (Date.now() + 5 * 60 * 1000)) {
		return cache[username].info;
	}

	const bucket = getCLABucket();
	const jsonFile = bucket.file(`${username[0]}/${username}.json`);
	const [data] = await jsonFile.download();
	const info: CLAInfo = JSON.parse(data.toString());

	cache[username] = {
		info,
		ts: Date.now()
	}

	return info;
}
