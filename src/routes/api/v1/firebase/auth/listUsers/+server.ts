import { json } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';
import type { JSONValue } from 'svelte-jsoneditor';
import { z } from 'zod';

import {
	AUTH_MAX_RESULTS_DEFAULT_VALUE,
	AUTH_MAX_RESULTS_QUERY_PARAM,
	AUTH_SEARCH_DEFAULT_VALUE,
	AUTH_SEARCH_QUERY_PARAM,
	PAGINATION_MIN_PAGE,
	PAGINATION_PAGE_DEFAULT_VALUE,
	PAGINATION_PAGE_QUERY_PARAM,
} from '$lib/constants';
import { listUsers } from '$server/services/firebase/auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { getSearchParam } from '$utils/search-params-utils';

import type { RequestHandler } from './$types';

// TODO comment

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const maxResults = getSearchParam(
		url.searchParams,
		AUTH_MAX_RESULTS_QUERY_PARAM,
		z
			.string()
			.regex(/^\d+$/)
			.transform((str) => Number.parseInt(str, 10)),
		AUTH_MAX_RESULTS_DEFAULT_VALUE,
	);
	const page = getSearchParam(
		url.searchParams,
		PAGINATION_PAGE_QUERY_PARAM,
		z
			.string()
			.regex(/^\d+$/)
			.transform((str) => Number.parseInt(str, 10)),
		PAGINATION_PAGE_DEFAULT_VALUE,
	);
	const search = getSearchParam(
		url.searchParams,
		AUTH_SEARCH_QUERY_PARAM,
		z.string(),
		AUTH_SEARCH_DEFAULT_VALUE,
	).toLowerCase();
	const records = (await listUsers(serviceAccount)) as (UserRecord & JSONValue)[];
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
