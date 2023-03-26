import { readAll } from '$client/services/service-account.service';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const serviceAccounts = await readAll(fetch);
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
