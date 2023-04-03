import type { GET as APIv1GoogleCloudFunctionsListFunctionsResponse } from '$routes/api/v1/google-cloud/functions/listFunctions/+server';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (({ fetch }) => {
	const functions = fetch<APIv1GoogleCloudFunctionsListFunctionsResponse>(
		'/api/v1/google-cloud/functions/listFunctions',
	).then((response) => response.json());

	return {
		streamed: {
			functions,
		},
	};
}) satisfies PageServerLoad;
