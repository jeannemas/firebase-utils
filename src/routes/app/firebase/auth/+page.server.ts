import { readAll } from '$client/services/auth.service';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (async ({ fetch, url }) => {
	const response = await readAll(fetch);

	return {
		streamed: {
			response,
		},
	};
}) satisfies PageServerLoad;
