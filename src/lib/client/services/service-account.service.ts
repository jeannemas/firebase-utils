import type { ServiceAccount } from '@prisma/client';

import type {
	GET as ReadAll,
	POST as Create,
	POSTPayload as CreatePayload,
} from '$routes/api/v1/service-accounts/+server';
import type {
	DELETE as Delete,
	GET as ReadOne,
	PATCH as Update,
	PATCHPayload as UpdatePayload,
} from '$routes/api/v1/service-accounts/[serviceAccountId]/+server';

type Fetch = typeof globalThis.fetch;

export async function create(fetch: Fetch, data: CreatePayload) {
	const response = await fetch<Create>('/api/v1/service-accounts', {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw response;
	}

	return await response.json();
}

export async function readOne(fetch: Fetch, id: ServiceAccount['id']) {
	const response = await fetch<ReadOne>(`/api/v1/service-accounts/${id}`);

	if (!response.ok) {
		throw response;
	}

	return await response.json();
}

export async function readAll(fetch: Fetch) {
	const response = await fetch<ReadAll>('/api/v1/service-accounts');

	if (!response.ok) {
		throw response;
	}

	return await response.json();
}

export async function update(fetch: Fetch, id: ServiceAccount['id'], data: UpdatePayload) {
	const response = await fetch<Update>(`/api/v1/service-accounts/${id}`, {
		body: JSON.stringify(data),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw response;
	}

	return await response.json();
}

export async function del(fetch: Fetch, id: ServiceAccount['id']) {
	const response = await fetch<Delete>(`/api/v1/service-accounts/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw response;
	}

	return await response.json();
}

export { CreatePayload, UpdatePayload };
