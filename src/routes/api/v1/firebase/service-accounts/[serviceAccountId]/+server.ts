import { error, json } from '@sveltejs/kit';

import { readOne } from '$lib/server/services/service-account.service';

import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const serviceAccount = await readOne(params.serviceAccountId);

	if (!serviceAccount) {
		throw error(404, {
			message: 'Service account not found',
		});
	}

	return json(serviceAccount, {
		status: 200,
	});
}) satisfies RequestHandler;
