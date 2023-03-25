import { json } from '@sveltejs/kit';

import { listUsers } from '$server/services/firebase/auth.service';
import { getServiceAccountFromCookies } from '$utils/service-account';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
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
