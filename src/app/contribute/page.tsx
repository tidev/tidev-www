import ContributeCode from '@/components/cla/contribute-code';
import InterestedInContributing from '@/components/cla/interested';
import CLAForm from '@/components/cla/form';
import DownloadCLA from '@/components/cla/download';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkCLA } from '@/lib/cla';
import { SIMULATE_NOT_AUTHENTICATED } from '@/lib/cla-constants';
import type { Metadata } from 'next';
import type { ExtendedProfile } from '@/lib/auth';

export const metadata: Metadata = {
    title: 'Contribute'
};

export default async function ContributePage() {
	const session = await getServerSession(authOptions);
	const user = !SIMULATE_NOT_AUTHENTICATED && session?.user ? session.user as ExtendedProfile : null;
	const signed = user?.username && await checkCLA(user.username+'a') || false;

	return (
		<div className='md:w-3/4 w-full mx-auto'>
			{signed && <DownloadCLA/>}
			<InterestedInContributing/>
			<ContributeCode/>
			{!signed && <CLAForm user={user}/>}
		</div>
	);
}

