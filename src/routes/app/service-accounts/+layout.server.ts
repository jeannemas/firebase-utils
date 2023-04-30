import { readAll } from '$client/services/service-account.service';

import type { LayoutServerLoad } from './$types';

// TODO comment

export const load = (async ({ fetch }) => {
	const serviceAccounts = readAll(fetch);

	return {
		streamed: {
			serviceAccounts,
		},
	};
}) satisfies LayoutServerLoad;
