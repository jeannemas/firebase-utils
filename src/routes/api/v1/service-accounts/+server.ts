import { json } from '@sveltejs/kit';

import {
	schema as postPayload,
	type Schema as POSTPayload,
} from '$schemas/service-account-create.schema';
import { create, readAll } from '$server/services/service-account.service';
import { validateIncomingBody } from '$server/utils/validate-incoming-body';

import type { RequestHandler } from './$types';

// TODO validate the structure of the JSON

// Create a service account
export const POST = (async ({ request }) => {
	const payload = await validateIncomingBody(request, postPayload);
	const serviceAccount = await create(payload);

	return json(serviceAccount, {
		status: 201,
	});
}) satisfies RequestHandler;

// Get all service accounts
export const GET = (async () => {
	const serviceAccounts = await readAll();

	return json(serviceAccounts, {
		status: 200,
	});
}) satisfies RequestHandler;

export type POST = Awaited<ReturnType<typeof POST>>;
export type GET = Awaited<ReturnType<typeof GET>>;

export { POSTPayload };
