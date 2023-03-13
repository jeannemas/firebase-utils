import { json } from '@sveltejs/kit';

import { getServiceAccountFromId } from '$lib/server/utils/getServiceAccountFromId';

import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const serviceAccountId = Number.parseInt(params.serviceAccountId, 10);
	const serviceAccount = await getServiceAccountFromId(serviceAccountId);

	return json(serviceAccount, { status: 200 });
}) satisfies RequestHandler;
