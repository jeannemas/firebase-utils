import { json } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

import { listUsers } from '$server/services/firebase/auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { getPaginationParams, paginate, type Pagination } from '$utils/pagination';

// TODO comment

export type GETResponse = Pagination<UserRecord>;

export const GET = async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const { currentPage, resultsPerPage, search } = getPaginationParams(url.searchParams);
	const records = await listUsers(serviceAccount);
	const filteredRecords = search
		? records.filter(
				({ uid, email, displayName }) =>
					uid.toLowerCase().includes(search) ||
					email?.toLowerCase().includes(search) ||
					displayName?.toLowerCase().includes(search),
		  )
		: records;
	const pagination = paginate(filteredRecords, currentPage, resultsPerPage);

	return json<GETResponse>(pagination, {
		status: 200,
	});
};
