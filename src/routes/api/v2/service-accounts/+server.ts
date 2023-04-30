import { json } from '@sveltejs/kit';

import { schema as postPayloadSchema } from '$schemas/service-account-create.schema';
import { create, readAll } from '$server/services/service-account.service';
import { createEndpointDefiner } from '$utils/endpoints';

import type { RequestEvent } from './$types';

// TODO validate the structure of the JSON
// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

// Create a service account
export const POST = defineEndpoint({ body: postPayloadSchema }, async ({ body }) => {
	const serviceAccount = await create(body);

	return json(serviceAccount, {
		status: 201,
	});
});

// Get all service accounts
export const GET = defineEndpoint({}, async () => {
	const serviceAccounts = await readAll();

	return json(serviceAccounts, {
		status: 200,
	});
});
