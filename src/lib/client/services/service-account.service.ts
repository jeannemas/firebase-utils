import type { ServiceAccount } from '@prisma/client';

import type {
	GET as GET_APIv2ServiceAccounts,
	POST as POST_APIv2ServiceAccounts,
} from '$routes/api/v2/service-accounts/+server';
import type {
	DELETE as DELETE_APIv2ServiceAccountsServiceAccountId,
	GET as GET_APIv2ServiceAccountsServiceAccountId,
	PATCH as PATCH_APIv2ServiceAccountsServiceAccountId,
} from '$routes/api/v2/service-accounts/[serviceAccountId=uuid_v4]/+server';
import { fetchJson, type BodyOf } from '$utils/endpoints/json';

/**
 * Perform the necessary API calls to create a new service account.
 *
 * @param fetch The fetch function to use.
 * @param data The data to send to the API; in this case, the service account's JSON as well as it's label.
 * @returns The newly created service account.
 */
export function create(
	fetch: typeof globalThis.fetch,
	data: BodyOf<typeof POST_APIv2ServiceAccounts>,
) {
	return fetchJson<typeof POST_APIv2ServiceAccounts>(fetch, '/api/v2/service-accounts', {
		body: data,
		method: 'POST',
	});
}

/**
 * Perform the necessary API calls to read a single service account using it's ID.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to read.
 * @returns The service account with the given ID.
 */
export function readOne(fetch: typeof globalThis.fetch, id: ServiceAccount['id']) {
	return fetchJson<typeof GET_APIv2ServiceAccountsServiceAccountId>(
		fetch,
		'/api/v2/service-accounts/[serviceAccountId=uuid_v4]',
		{
			method: 'GET',
			params: {
				serviceAccountId: id,
			},
		},
	);
}

/**
 * Perform the necessary API calls to read all service accounts.
 *
 * @param fetch The fetch function to use.
 * @returns All service accounts.
 */
export function readAll(fetch: typeof globalThis.fetch) {
	return fetchJson<typeof GET_APIv2ServiceAccounts>(fetch, '/api/v2/service-accounts', {
		method: 'GET',
	});
}

/**
 * Perform the necessary API calls to update a service account.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to update.
 * @param data The data to send to the API; in this case, the service account's label.
 * @returns The updated service account.
 */
export function update(
	fetch: typeof globalThis.fetch,
	id: ServiceAccount['id'],
	data: BodyOf<typeof PATCH_APIv2ServiceAccountsServiceAccountId>,
) {
	return fetchJson<typeof PATCH_APIv2ServiceAccountsServiceAccountId>(
		fetch,
		'/api/v2/service-accounts/[serviceAccountId=uuid_v4]',
		{
			body: data,
			method: 'PATCH',
			params: {
				serviceAccountId: id,
			},
		},
	);
}

/**
 * Perform the necessary API calls to delete a service account.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to delete.
 * @returns The deleted service account.
 */
export function remove(fetch: typeof globalThis.fetch, id: ServiceAccount['id']) {
	return fetchJson<typeof DELETE_APIv2ServiceAccountsServiceAccountId>(
		fetch,
		'/api/v2/service-accounts/[serviceAccountId=uuid_v4]',
		{
			method: 'DELETE',
			params: {
				serviceAccountId: id,
			},
		},
	);
}
