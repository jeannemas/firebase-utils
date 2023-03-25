import { readAll } from '$client/services/service-account.service';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const serviceAccounts = await readAll(fetch);

	return {
		serviceAccounts,
	};
}) satisfies PageServerLoad;
