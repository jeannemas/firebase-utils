import type { ServiceAccount } from '@prisma/client';
import { error } from '@sveltejs/kit';

import { readOne } from '$lib/server/services/service-account.service';

export async function getServiceAccountFromId(serviceAccountId: ServiceAccount['id']) {
	if (Number.isNaN(serviceAccountId)) {
		throw error(400, {
			message: 'Invalid service account ID',
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
