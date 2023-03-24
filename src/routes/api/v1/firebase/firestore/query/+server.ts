import { json } from '@sveltejs/kit';

import { query } from '$lib/server/services/firebase/firestore.service';
import { getServiceAccountFromCookies } from '$utils/service-account';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const path = url.searchParams.get('path') ?? '';
	const { collections, document, documents } = await query(serviceAccount, path);

	return json(
		{
			collections: collections?.map(({ id, path }) => ({ id, path })) ?? null,
			document,
			documents: documents?.map(({ id, path }) => ({ id, path })) ?? null,
		},
		{
			status: 200,
		},
	);
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
