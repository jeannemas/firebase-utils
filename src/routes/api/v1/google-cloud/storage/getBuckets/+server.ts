import { json } from '@sveltejs/kit';

import { getBuckets } from '$lib/server/services/google-cloud/storage.service';
import { getServiceAccountFromCookies } from '$utils/service-account';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const buckets = await getBuckets(serviceAccount).then((buckets) =>
		buckets.map(({ name }) => name),
	);

	return json(buckets, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
