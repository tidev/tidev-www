export interface Signature {
	kind: 'sign' | 'type';
	image?: string;
	trimmed?: string;
	text?: string;
}

export interface CLAInfo {
	username: string;
	name: string;
	title: string;
	company: string,
	email: string;
	date: string;
	claVersion: string;
}

export interface CLASignedInfo extends Partial<CLAInfo> {
	signed: boolean;
}

export type OnSignCallback = (claInfo: CLASignedInfo | null) => void;
