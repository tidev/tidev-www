'use client';

import CLAContainer from '@/components/cla/container';
import { SessionProvider } from 'next-auth/react';

export default function CLASession() {
	return (
		<SessionProvider>
			<CLAContainer/>
		</SessionProvider>
	);
}

