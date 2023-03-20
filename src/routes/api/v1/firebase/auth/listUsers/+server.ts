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
	const search = url.searchParams.get('search')?.toLowerCase();
	const pageString = url.searchParams.get('page');
	const maxResults = maxResultsString ? Number.parseInt(maxResultsString, 10) : 10;
	const page = pageString ? Number.parseInt(pageString, 10) : 1;
	const records = await listUsers(serviceAccount);
	const filteredRecords = search
		? records.filter(
				({ uid, email, displayName }) =>
					uid.toLowerCase().includes(search) ||
					email?.toLowerCase().includes(search) ||
					displayName?.toLowerCase().includes(search),
		  )
		: records;
	const recordsOnPage = filteredRecords.slice((page - 1) * maxResults, page * maxResults);
	const pageCounts = Math.ceil(filteredRecords.length / maxResults);

	return json(
		{
			minPage: 1,
			currentPage: page,
			maxPage: pageCounts,
			records: recordsOnPage,
		},
		{
			status: 200,
		},
	);
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
