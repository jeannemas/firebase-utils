import { readAll } from '$client/services/auth.service';

import type { LayoutServerLoad } from './$types';

// TODO comment

export const load = (({ fetch }) => {
	const response = readAll(fetch);

	return {
		streamed: {
			response,
		},
	};
}) satisfies LayoutServerLoad;
