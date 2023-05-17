import type { GET as GET_APIv2AuthUsers } from '$routes/api/v2/auth/users/+server';
import type { GET as GET_APIv2AuthUsersUserUID } from '$routes/api/v2/auth/users/[userUid]/+server';
import { fetchJson } from '$utils/endpoints/json';

// TODO comment

export function readAll(fetch: typeof globalThis.fetch) {
	return fetchJson<typeof GET_APIv2AuthUsers>(fetch, '/api/v2/auth/users', {
		method: 'GET',
	}).then((response) => response.json());
}

export function readOne(fetch: typeof globalThis.fetch, uid: string) {
	return fetchJson<typeof GET_APIv2AuthUsersUserUID>(fetch, '/api/v2/auth/users/[userUid]', {
		method: 'GET',
		params: {
			userUid: uid,
		},
	}).then((response) => response.json());
}
