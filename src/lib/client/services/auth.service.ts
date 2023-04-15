import { downloadBlob } from '$client/utils/download-blob';
import type { DownloadFormat } from '$models/DownloadFormat.model';
import type { Endpoint as AuthUsersEndpoint } from '$routes/api/v2/auth/users/+server';
import type { POST } from '$routes/api/v2/auth/users/export/+server';
import { buildPaginationParams, type PaginationParams } from '$utils/pagination';
import { createJsonFetcher } from '$utils/typed-endpoints';
import type { JSONTypedResponse } from '$utils/typed-http';

// TODO comment

export function readAll(fetch: Fetch, pagination?: PaginationParams) {
	const params = buildPaginationParams(pagination).toString();
	const response = fetch<JSONTypedResponse<AuthUsersEndpoint['GET']>>(
		`/api/v2/auth/users?${params}`,
	).then((response) => response.json());

	return response;
}

export function update(fetch: Fetch) {
	// TODO
	throw new Error('Not implemented');
}

// TODO
export async function download(query: string, format: DownloadFormat) {
	const searchParams = new URLSearchParams();

	searchParams.set('query', query);
	searchParams.set('format', format);

	const fetcher = createJsonFetcher(fetch);
	const { content, filename } = await fetcher<POST>('/api/v2/auth/users/export', {
		body: {
			fields: {
				creationTime: {
					include: true,
					name: 'creationTime',
				},
				customClaims: {
					include: true,
					name: 'customClaims',
				},
				disabled: {
					include: true,
					name: 'disabled',
				},
				displayName: {
					include: true,
					name: 'displayName',
				},
				email: {
					include: true,
					name: 'email',
				},
				emailVerified: {
					include: true,
					name: 'emailVerified',
				},
				lastSignInTime: {
					include: true,
					name: 'lastSignInTime',
				},
				phoneNumber: {
					include: true,
					name: 'phoneNumber',
				},
				photoURL: {
					include: true,
					name: 'photoURL',
				},
				uid: {
					include: true,
					name: 'uid',
				},
			},
			format,
		},
		method: 'POST',
	}).then((response) => response.json());
	const blob = new Blob([content], { type: 'octet/stream' });

	downloadBlob(blob, filename);
}
