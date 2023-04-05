import type { ServiceAccount } from '@prisma/client';

import type {
	POST as Create,
	POSTPayload as CreatePayload,
	GET as ReadAll,
} from '$routes/api/v1/service-accounts/+server';
import type {
	DELETE as Delete,
	GET as ReadOne,
	PATCH as Update,
	PATCHPayload as UpdatePayload,
} from '$routes/api/v1/service-accounts/[serviceAccountId]/+server';

const BASE_PATH = '/api/v1/service-accounts';

/**
 * Perform the necessary API calls to create a new service account.
 *
 * @param fetch The fetch function to use.
 * @param data The data to send to the API; in this case, the service account's JSON as well as it's label.
 * @returns The newly created service account.
 */
export async function create(fetch: Fetch, data: CreatePayload) {
	const response = await fetch<Create>(`${BASE_PATH}`, {
		body: JSON.stringify(data),
		headers: {
			Acceot: 'application/json',
			// TODO in the future, we'll pass the bearer token here.
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
}

/**
 * Perform the necessary API calls to read a single service account using it's ID.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to read.
 * @returns The service account with the given ID.
 */
export async function readOne(fetch: Fetch, id: ServiceAccount['id']) {
	const response = await fetch<ReadOne>(`${BASE_PATH}/${id}`, {
		headers: {
			Accept: 'application/json',
			// TODO in the future, we'll pass the bearer token here.
		},
		method: 'GET',
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
}

/**
 * Perform the necessary API calls to read all service accounts.
 *
 * @param fetch The fetch function to use.
 * @returns All service accounts.
 */
export async function readAll(fetch: Fetch) {
	const response = await fetch<ReadAll>(`${BASE_PATH}`, {
		headers: {
			Accept: 'application/json',
			// TODO in the future, we'll pass the bearer token here.
		},
		method: 'GET',
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
}

/**
 * Perform the necessary API calls to update a service account.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to update.
 * @param data The data to send to the API; in this case, the service account's label.
 * @returns The updated service account.
 */
export async function update(fetch: Fetch, id: ServiceAccount['id'], data: UpdatePayload) {
	const response = await fetch<Update>(`${BASE_PATH}/${id}`, {
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			// TODO in the future, we'll pass the bearer token here.
			'Content-Type': 'application/json',
		},
		method: 'PATCH',
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
}

/**
 * Perform the necessary API calls to delete a service account.
 *
 * @param fetch The fetch function to use.
 * @param id The ID of the service account to delete.
 * @returns The deleted service account.
 */
export async function del(fetch: Fetch, id: ServiceAccount['id']) {
	const response = await fetch<Delete>(`${BASE_PATH}/${id}`, {
		headers: {
			Accept: 'application/json',
			// TODO in the future, we'll pass the bearer token here.
		},
		method: 'DELETE',
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
}

// We need to export those types so that we can consume them easily from the client.
export { CreatePayload, UpdatePayload };
