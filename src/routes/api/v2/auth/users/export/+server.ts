import { json } from '@sveltejs/kit';

import { exportConfigSchema, exportUsers } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { createEndpointDefiner } from '$utils/endpoints';

import type { RequestEvent } from './$types';

// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

export const POST = defineEndpoint({ body: exportConfigSchema }, async ({ body, cookies }) => {
	const exportedData = getServiceAccountFromCookies(cookies).then((servceAccount) =>
		exportUsers(servceAccount, body),
	);

	return json(exportedData, {
		status: 200,
	});
});
