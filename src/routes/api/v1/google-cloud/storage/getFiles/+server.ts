import { error, json } from '@sveltejs/kit';

import { getFiles } from '$lib/server/services/google-cloud/storage.service';
import { getServiceAccountFromCookies } from '$utils/service-account';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const bucket = url.searchParams.get('bucket');

	if (!bucket) {
		throw error(400, 'Missing bucket parameter');
	}

	const files = await getFiles(serviceAccount, bucket).then((files) =>
		files.map(({ name }) => name),
	);

	return json(files, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
