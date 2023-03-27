import { json } from '@sveltejs/kit';

import { FIRESTORE_PATH_DEFAULT_VALUE, FIRESTORE_PATH_QUERY_PARAM } from '$lib/constants';
import { query } from '$server/services/firebase/firestore.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const path = url.searchParams.get(FIRESTORE_PATH_QUERY_PARAM) ?? FIRESTORE_PATH_DEFAULT_VALUE;
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
