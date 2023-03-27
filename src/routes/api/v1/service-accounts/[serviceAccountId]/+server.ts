import { json } from '@sveltejs/kit';

import {
	schema as patchPayload,
	type Schema as PATCHPayload,
} from '$schemas/service-account-update.schema';
import { del, readOne, update } from '$server/services/service-account.service';
import { validateIncomingBody } from '$server/utils/validate-incoming-body';

import type { RequestHandler } from './$types';

// Get a service account by id
export const GET = (async ({ params }) => {
	const serviceAccount = await readOne(params.serviceAccountId);

	return json(serviceAccount, {
		status: 200,
	});
}) satisfies RequestHandler;
// Update a service account by id
export const PATCH = (async ({ params, request }) => {
	const payload = await validateIncomingBody(request, patchPayload);
	const serviceAccount = await update(params.serviceAccountId, payload);

	return json(serviceAccount, {
		status: 200,
	});
}) satisfies RequestHandler;
// Delete a service account by id
export const DELETE = (async ({ params }) => {
	const serviceAccount = await del(params.serviceAccountId);

	return json(serviceAccount, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
export type PATCH = Awaited<ReturnType<typeof PATCH>>;
export type DELETE = Awaited<ReturnType<typeof DELETE>>;

export { PATCHPayload };
