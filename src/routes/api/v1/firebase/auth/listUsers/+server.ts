import { error, json } from '@sveltejs/kit';

import { listUsers } from '$lib/server/services/firebase/auth.service';
import { readOne } from '$lib/server/services/service-account.service';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccountId = cookies.get('serviceAccountId') ?? null;

	if (!serviceAccountId) {
		throw error(401, {
			message: 'Unauthorized',
		});
	}

	const serviceAccount = await readOne(serviceAccountId);

	if (!serviceAccount) {
		throw error(404, {
			message: 'Service account not found',
		});
	}

	const maxResultsString = url.searchParams.get('maxResults');
	const maxResults = maxResultsString ? Number.parseInt(maxResultsString, 10) : undefined;
	const result = await listUsers(serviceAccount, maxResults);

	return json(result, {
		status: 200,
	});
}) satisfies RequestHandler;
