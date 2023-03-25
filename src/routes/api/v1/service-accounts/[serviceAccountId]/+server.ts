import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { del, readOne, update } from '$server/services/service-account.service';

import type { RequestHandler } from './$types';

const PATCHPayload = z.object({
	label: z.string().optional(),
});

// Get a service account by id
export const GET = (async ({ params }) => {
	const serviceAccount = await readOne(params.serviceAccountId);

	return json(serviceAccount, {
		status: 200,
	});
}) satisfies RequestHandler;
// Update a service account by id
export const PATCH = (async ({ params, request }) => {
	const result = PATCHPayload.safeParse(await request.json());

	if (!result.success) {
		throw error(400, fromZodError(result.error));
	}

	const serviceAccount = await update(params.serviceAccountId, result.data);

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

export type PATCHPayload = z.infer<typeof PATCHPayload>;
export type GET = Awaited<ReturnType<typeof GET>>;
export type PATCH = Awaited<ReturnType<typeof PATCH>>;
export type DELETE = Awaited<ReturnType<typeof DELETE>>;
