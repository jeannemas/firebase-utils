import type { GETResponse as ListUsersAPIResponse } from '$routes/api/v1/firebase/auth/listUsers/+server';
import { buildPaginationParams, type PaginationParams } from '$utils/pagination';

type DownloadFormat = 'csv' | 'json';

// TODO comment

export function create(fetch: Fetch) {
	// TODO
	throw new Error('Not implemented');
}

export function readOne(fetch: Fetch) {
	// TODO
	throw new Error('Not implemented');
}

export function readAll(fetch: Fetch, pagination?: PaginationParams) {
	const params = buildPaginationParams(pagination).toString();
	const response = fetch(`/api/v1/firebase/auth/listUsers?${params}`).then(
		(response) => response.json() as Promise<ListUsersAPIResponse>,
	);

	return response;
}

export function update(fetch: Fetch) {
	// TODO
	throw new Error('Not implemented');
}

export function remove(fetch: Fetch) {
	// TODO
	throw new Error('Not implemented');
}

// TODO
export function download(users: unknown[], format: DownloadFormat) {
	//
}
