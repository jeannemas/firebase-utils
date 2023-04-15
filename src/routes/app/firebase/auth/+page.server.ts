import { readAll } from '$client/services/auth.service';
import { getPaginationParams } from '$utils/pagination';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (async ({ fetch, url }) => {
	const response = readAll(fetch, getPaginationParams(url.searchParams));

	return {
		streamed: {
			response,
		},
	};
}) satisfies PageServerLoad;
