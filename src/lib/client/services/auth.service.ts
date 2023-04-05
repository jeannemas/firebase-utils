import type { DownloadFormat } from '$models/DownloadFormat.model';
import type { GETResponse as ExportUsersAPIResponse } from '$routes/api/v1/firebase/auth/export/+server';
import type { GETResponse as ListUsersAPIResponse } from '$routes/api/v1/firebase/auth/listUsers/+server';
import { buildPaginationParams, type PaginationParams } from '$utils/pagination';
import type { JSONTypedResponse } from '$utils/typed-http';
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
	const response = fetch<JSONTypedResponse<ListUsersAPIResponse>>(
		`/api/v1/firebase/auth/listUsers?${params}`,
	).then((response) => response.json());

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
export async function download(query: string, format: DownloadFormat) {
	const searchParams = new URLSearchParams();

	searchParams.set('query', query);
	searchParams.set('format', format);

	const { content, contentType, filename } = await fetch<JSONTypedResponse<ExportUsersAPIResponse>>(
		`/api/v1/firebase/auth/export?${searchParams.toString()}`,
	).then((response) => response.json());
	const blob = new Blob([content], { type: 'octet/stream' });
	const link = document.createElement('a');

	link.style.display = 'none';
	link.href = URL.createObjectURL(blob);
	link.download = filename;

	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);

	URL.revokeObjectURL(link.href);
}
