import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

import { STORAGE_BUCKET_QUERY_PARAM, STORAGE_FILE_PATH_QUERY_PARAM } from '$lib/constants';
import { getSignedUrl } from '$server/services/google-cloud/storage.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { getSearchParam } from '$utils/search-params-utils';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const bucket = getSearchParam(
		url.searchParams,
		STORAGE_BUCKET_QUERY_PARAM,
		z.string().nonempty(),
	);

	if (bucket === null) {
		throw error(400, 'Missing bucket parameter');
	}

	const filePath = getSearchParam(
		url.searchParams,
		STORAGE_FILE_PATH_QUERY_PARAM,
		z.string().nonempty(),
	);

	if (filePath === null) {
		throw error(400, 'Missing file parameter');
	}

	const fileUrl = await getSignedUrl(serviceAccount, bucket, filePath);

	if (fileUrl === null) {
		throw error(404, 'File not found');
	}

	return json(fileUrl, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
