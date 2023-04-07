import { json } from '@sveltejs/kit';

import { listUsers, type PublicUser } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { getPaginationParams, paginate, type Pagination } from '$utils/pagination';

import type { RequestHandler } from './$types';

// TODO comment

export type Endpoint = Like<
	Metadata,
	{
		GET: Pagination<PublicUser>;
	}
>;

export const GET = (async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const { currentPage, resultsPerPage, search } = getPaginationParams(url.searchParams);
	const users = await listUsers(serviceAccount);
	const filteredUsers = search
		? users.filter(
				({ uid, email, displayName }) =>
					uid.toLowerCase().includes(search) ||
					email?.toLowerCase().includes(search) ||
					displayName?.toLowerCase().includes(search),
		  )
		: users;
	const pagination = paginate(filteredUsers, currentPage, resultsPerPage);

	return json<Endpoint['GET']>(pagination, {
		status: 200,
	});
}) satisfies RequestHandler;
