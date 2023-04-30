import { json } from '@sveltejs/kit';

import { schema as patchPayloadSchema } from '$schemas/service-account-update.schema';
import { readOne, remove, update } from '$server/services/service-account.service';
import { createEndpointDefiner } from '$utils/endpoints';

import type { RequestEvent } from './$types';

// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

// Get a service account by id
export const GET = defineEndpoint({}, async ({ params }) => {
	const serviceAccount = await readOne(params.serviceAccountId);

	return json(serviceAccount, {
		status: 200,
	});
});
// Update a service account by id
export const PATCH = defineEndpoint({ body: patchPayloadSchema }, async ({ body, params }) => {
	const serviceAccount = await update(params.serviceAccountId, body);

	return json(serviceAccount, {
		status: 200,
	});
});
// Delete a service account by id
export const DELETE = defineEndpoint({}, async ({ params }) => {
	const serviceAccount = await remove(params.serviceAccountId);

	return json(serviceAccount, {
		status: 200,
	});
});
