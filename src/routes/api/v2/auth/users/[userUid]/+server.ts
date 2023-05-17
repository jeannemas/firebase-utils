import { json } from '@sveltejs/kit';

import { readOne } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { createEndpointDefiner } from '$utils/endpoints';

import type { RequestEvent } from './$types';

// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

export const GET = defineEndpoint({}, async ({ cookies, params }) => {
	const user = await getServiceAccountFromCookies(cookies).then((serviceAccount) =>
		readOne(serviceAccount, params.userUid),
	);

	return json(user, {
		status: 200,
	});
});
