import { json } from '@sveltejs/kit';

import { getDefaultBucket } from '$server/services/google-cloud/storage.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const bucket = await getDefaultBucket(serviceAccount).then((bucket) => bucket?.name ?? null);

	return json(bucket, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
