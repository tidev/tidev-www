import CLASession from '@/components/cla/session';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contribute'
};

export default async function ContributePage() {
	return (
		<div className='md:w-3/4 w-full mx-auto'>
			<CLASession />
		</div>
	);
}

