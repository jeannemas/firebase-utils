import type { GET as APIv1ServiceAccountsResponse } from '$routes/api/v1/service-accounts/+server';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const serviceAccounts = await fetch<APIv1ServiceAccountsResponse>(
		'/api/v1/service-accounts',
	).then((response) => response.json());
	const serviceAccountId = cookies.get('serviceAccountId') ?? null;
	const selectedServiceAccountId =
		serviceAccounts.find(({ id }) => id === serviceAccountId)?.id ?? null;

	return {
		serviceAccounts: serviceAccounts.map(({ id, label }) => ({
			id,
			label,
		})),
		selectedServiceAccountId,
	};
}) satisfies LayoutServerLoad;
