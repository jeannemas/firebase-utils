import { json } from '@sveltejs/kit';
import { z } from 'zod';

import { exportConfigSchema, exportUsers } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { createEndpointDefiner } from '$utils/typed-endpoints';

import type { RequestEvent } from './$types';

// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

export const POST = defineEndpoint(z.object({}), exportConfigSchema, async ({ body, cookies }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const exportedData = await exportUsers(serviceAccount, body);

	return json(exportedData, {
		status: 200,
	});
});

export type POST = typeof POST;
