import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { create, readAll } from '$lib/server/services/service-account.service';

import type { RequestHandler } from './$types';

const createSchema = z.object({
	json: z.string(),
	label: z.string(),
});

export const POST = (async ({ request }) => {
	const result = createSchema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, fromZodError(result.error));
	}

	const serviceAccount = await create(result.data);

	return json(serviceAccount, { status: 201 });
}) satisfies RequestHandler;

export const GET = (async () => {
	const serviceAccounts = await readAll();

	return json(serviceAccounts, { status: 200 });
}) satisfies RequestHandler;
