import { json } from '@sveltejs/kit';

import {
	AUTH_MAX_RESULTS_DEFAULT_VALUE,
	AUTH_MAX_RESULTS_QUERY_PARAM,
	AUTH_SEARCH_QUERY_PARAM,
	PAGINATION_MIN_PAGE,
	PAGINATION_PAGE_DEFAULT_VALUE,
	PAGINATION_PAGE_QUERY_PARAM,
} from '$lib/constants';
import { listUsers } from '$server/services/firebase/auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const maxResultsString = url.searchParams.get(AUTH_MAX_RESULTS_QUERY_PARAM);
	const search = url.searchParams.get(AUTH_SEARCH_QUERY_PARAM)?.toLowerCase();
	const pageString = url.searchParams.get(PAGINATION_PAGE_QUERY_PARAM);
	// TODO add tool to validate query params like `_(URLSearchParams, z.string().regex(/^[0-9]+$/), key, FALLBACK_VALUE)`
	const maxResults = maxResultsString
		? Number.parseInt(maxResultsString, 10)
		: Number.parseInt(AUTH_MAX_RESULTS_DEFAULT_VALUE, 10);
	const page = pageString
		? Number.parseInt(pageString, 10)
		: Number.parseInt(PAGINATION_PAGE_DEFAULT_VALUE, 10);
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
			minPage: PAGINATION_MIN_PAGE,
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
