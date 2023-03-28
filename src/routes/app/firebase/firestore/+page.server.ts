import type { GET as APIv1FirebaseFirestoreQueryResponse } from '$routes/api/v1/firebase/firestore/query/+server';

import type { PageServerLoad } from './$types';

export const load = (({ fetch, url }) => {
	const response = fetch<APIv1FirebaseFirestoreQueryResponse>(
		`/api/v1/firebase/firestore/query?${url.searchParams.toString()}`,
	).then((response) => response.json());

	return {
		streamed: {
			response,
		},
	};
}) satisfies PageServerLoad;
