import { json } from '@sveltejs/kit';

import { listFunctions } from '$server/services/google-cloud/functions.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

import type { RequestHandler } from './$types';

// TODO comment

export const GET = (async ({ cookies }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const functions = await listFunctions(serviceAccount).then((functions) =>
		functions.map(({ name }) => name),
	);

	return json(functions, {
		status: 200,
	});
}) satisfies RequestHandler;

export type GET = Awaited<ReturnType<typeof GET>>;
