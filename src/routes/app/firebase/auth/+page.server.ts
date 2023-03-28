import type { GET as ListUsersAPIResponse } from '$routes/api/v1/firebase/auth/listUsers/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const response = fetch<ListUsersAPIResponse>(
		`/api/v1/firebase/auth/listUsers?${url.searchParams.toString()}`,
	).then((response) => response.json());

	return {
		streamed: {
			response,
		},
	};
}) satisfies PageServerLoad;
