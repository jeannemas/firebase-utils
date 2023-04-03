import { error, type Cookies } from '@sveltejs/kit';

import { SERVICE_ACCOUNT_ID_COOKIE } from '$lib/constants';
import { readOne } from '$server/services/service-account.service';

/**
 * An utility function to get the service account from cookies.
 *
 * @param cookies The cookies
 * @returns The service account
 */
export async function getServiceAccountFromCookies(cookies: Cookies) {
	// We first get the service account ID from the cookies.
	const serviceAccountId = cookies.get(SERVICE_ACCOUNT_ID_COOKIE) ?? null;

	if (!serviceAccountId) {
		// We throw an error if the service account ID is not found.
		throw error(401, {
			message: 'Unauthorized',
		});
	}

	// We then get the service account from the database.
	const serviceAccount = await readOne(serviceAccountId);

	if (!serviceAccount) {
		// We throw an error if the service account is not found.
		throw error(404, {
			message: 'Service account not found',
		});
	}

	return serviceAccount;
}
