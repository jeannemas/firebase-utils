import type { ServiceAccount } from '@prisma/client';

import type { JSONTypedResponse } from '$utils/typed-http';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const serviceAccounts = await fetch<JSONTypedResponse<ServiceAccount[]>>(
		'/api/v1/firebase/service-accounts',
		{
			method: 'GET',
		},
	).then((response) => response.json());
	const serviceAccountId = cookies.get('serviceAccountId') ?? null;
	const selectedServiceAccountId =
		serviceAccounts.find(({ id }) => id === serviceAccountId)?.id ?? null;

	return {
		serviceAccounts,
		selectedServiceAccountId,
	};
}) satisfies LayoutServerLoad;
