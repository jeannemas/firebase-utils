import { downloadBlob } from '$client/utils/download-blob';
import type { DownloadFormat } from '$models/DownloadFormat.model';
import type { GET as GET_APIv2AuthUsers } from '$routes/api/v2/auth/users/+server';
import type { POST as POST_APIv2AuthUsersExport } from '$routes/api/v2/auth/users/export/+server';
import { fetchJson } from '$utils/endpoints/json';

// TODO comment

export async function readAll(fetch: typeof globalThis.fetch) {
	const response = await fetchJson<typeof GET_APIv2AuthUsers>(fetch, '/api/v2/auth/users', {
		method: 'GET',
	});

	return response;
}

// TODO
export async function download(format: DownloadFormat) {
	const { content, contentType, filename } = await fetchJson<typeof POST_APIv2AuthUsersExport>(
		fetch,
		'/api/v2/auth/users/export',
		{
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
		},
	);
	const blob = new Blob([content], { type: contentType });

	downloadBlob(blob, filename);
}
