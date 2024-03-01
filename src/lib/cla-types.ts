export interface Signature {
	kind: 'sign' | 'type';
	image?: string;
	trimmed?: string;
	text?: string;
}
