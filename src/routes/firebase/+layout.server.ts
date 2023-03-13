import type { ServiceAccount } from '@prisma/client';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		serviceAccounts: await fetch('/api/v1/firebase/service-accounts', {
			method: 'GET',
		}).then((response) => response.json() as Promise<ServiceAccount[]>),
	};
}) satisfies LayoutServerLoad;
