import { error, json } from '@sveltejs/kit';
import type { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { schema as postPayload } from '$schemas/service-account-create.schema';
import { create, readAll } from '$server/services/service-account.service';

import type { RequestHandler } from './$types';

// TODO validate the structure of the JSON

// Create a service account
export const POST = (async ({ request }) => {
	const result = postPayload.safeParse(await request.json());

	if (!result.success) {
		throw error(400, fromZodError(result.error));
	}

	const serviceAccount = await create(result.data);

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

export type POSTPayload = z.infer<typeof postPayload>;
export type POST = Awaited<ReturnType<typeof POST>>;
export type GET = Awaited<ReturnType<typeof GET>>;
