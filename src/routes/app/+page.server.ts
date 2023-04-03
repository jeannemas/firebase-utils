import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

// TODO comment

export const load = (async () => {
	throw redirect(307, '/app/service-accounts');
}) satisfies PageServerLoad;
