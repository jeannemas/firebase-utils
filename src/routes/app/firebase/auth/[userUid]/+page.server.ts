import { readOne } from '$client/services/auth.service';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (({ fetch, params }) => {
	return {
		streamed: {
			user: readOne(fetch, params.userUid),
		},
	};
}) satisfies PageServerLoad;
