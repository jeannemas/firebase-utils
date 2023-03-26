import type { GET as APIv1FirebaseFirestoreQueryResponse } from '$routes/api/v1/firebase/firestore/query/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const result = await fetch<APIv1FirebaseFirestoreQueryResponse>(
		`/api/v1/firebase/firestore/query?${url.searchParams.toString()}`,
	).then((response) => response.json());

	return {
		result,
	};
}) satisfies PageServerLoad;
