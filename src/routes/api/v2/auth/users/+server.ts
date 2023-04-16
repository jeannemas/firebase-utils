import { json } from '@sveltejs/kit';
import { z } from 'zod';

import { listUsers } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { createEndpointDefiner } from '$utils/endpoints';
import { getPaginationParams, paginate } from '$utils/pagination';

import type { RequestEvent } from './$types';

// TODO comment

const defineEndpoint = createEndpointDefiner<RequestEvent>();

export const GET = defineEndpoint(z.object({}), z.unknown(), async ({ cookies, url }) => {
	const { currentPage, resultsPerPage, search } = getPaginationParams(url.searchParams);
	const users = await getServiceAccountFromCookies(cookies).then((serviceAccount) =>
		listUsers(serviceAccount),
	);
	const filteredUsers = search
		? users.filter(
				({ uid, email, displayName }) =>
					uid.toLowerCase().includes(search) ||
					email?.toLowerCase().includes(search) ||
					displayName?.toLowerCase().includes(search),
		  )
		: users;
	const pagination = paginate(filteredUsers, currentPage, resultsPerPage);

	return json(pagination, {
		status: 200,
	});
});
