import type { GET as ListUsersAPIResponse } from '$routes/api/v1/firebase/auth/listUsers/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const queryResult = await fetch<ListUsersAPIResponse>(
		`/api/v1/firebase/auth/listUsers?${url.searchParams.toString()}`,
	).then((response) => response.json());

	return {
		queryResult,
	};
}) satisfies PageServerLoad;
