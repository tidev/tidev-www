'use client';

import ContributeCode from '@/components/cla/contribute-code';
import InterestedInContributing from '@/components/cla/interested';
import CLAForm from '@/components/cla/form';
import DownloadCLA from '@/components/cla/download';
import { SIMULATE_NOT_AUTHENTICATED, SIMULATE_NOT_SIGNED } from '@/lib/cla-constants';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { CLASignedInfo } from '@/lib/cla-types';
import type { ExtendedProfile } from '@/lib/auth';

export default function CLAContainer() {
	let { data: session, status } = useSession();
	let [claInfo, setCLAInfo] = useState<CLASignedInfo | null>(null);
	const user = !SIMULATE_NOT_AUTHENTICATED && status === 'authenticated' && session?.user ? session.user as ExtendedProfile : null;

	useEffect(() => {
		fetch('/api/cla')
			.then(res => res.json())
			.then((data: CLASignedInfo) => {
				if (!SIMULATE_NOT_SIGNED) {
					return setCLAInfo(data);
				}
			})
			.catch(console.error);
	}, []);

	return (
		<>
			{claInfo?.signed && <DownloadCLA/>}
			<InterestedInContributing/>
			<ContributeCode/>
			{!claInfo?.signed && <CLAForm onSign={setCLAInfo} user={user}/>}
		</>
	);
}

