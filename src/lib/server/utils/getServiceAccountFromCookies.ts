import { error, type Cookies } from '@sveltejs/kit';

import { SERVICE_ACCOUNT_ID_COOKIE } from '$lib/constants';
import { readOne } from '$server/services/service-account.service';

export async function getServiceAccountFromCookies(cookies: Cookies) {
	const serviceAccountId = cookies.get(SERVICE_ACCOUNT_ID_COOKIE) ?? null;

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

	return serviceAccount;
}
