import { json } from '@sveltejs/kit';

import { listUsers } from '$lib/server/services/firebase/auth.service';
import { getServiceAccountFromId } from '$lib/server/utils/getServiceAccountFromId';

import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const serviceAccountId = Number.parseInt(params.serviceAccountId, 10);
	const serviceAccount = await getServiceAccountFromId(serviceAccountId);
	const maxResultsString = url.searchParams.get('maxResults');
	const maxResults = maxResultsString ? Number.parseInt(maxResultsString, 10) : undefined;
	const result = await listUsers(serviceAccount, maxResults);

	return json(result, { status: 200 });
}) satisfies RequestHandler;
