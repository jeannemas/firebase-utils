import { redirect } from '@sveltejs/kit';

import { readOne } from '$client/services/service-account.service';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (async ({ fetch, params }) => {
	const { serviceAccountId } = params;
	const serviceAccount = await readOne(fetch, serviceAccountId);

	if (!serviceAccount) {
		throw redirect(303, '/app/service-accounts');
	}

	return {
		serviceAccount,
	};
}) satisfies PageServerLoad;
