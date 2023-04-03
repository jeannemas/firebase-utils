import { readAll } from '$client/services/service-account.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

import type { LayoutServerLoad } from './$types';

// TODO comment

export const load = (async ({ cookies, fetch }) => {
	const serviceAccounts = await readAll(fetch).then((serviceAccounts) =>
		serviceAccounts.map(({ id, label }) => ({ id, label })),
	);
	const serviceAccount = await getServiceAccountFromCookies(cookies).catch(() => null);

	return {
		serviceAccounts,
		selectedServiceAccountId: serviceAccount?.id ?? null,
	};
}) satisfies LayoutServerLoad;
