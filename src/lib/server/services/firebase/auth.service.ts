import type { ServiceAccount } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';

import { getFirebaseApp } from './app.service';

function getFirebaseAuth(serviceAccount: ServiceAccount) {
	const app = getFirebaseApp(serviceAccount);
	const auth = getAuth(app);

	return auth;
}

const DEFAULT_MAX_RESULTS = 10;

export async function listUsers(
	serviceAccount: ServiceAccount,
	maxResults = DEFAULT_MAX_RESULTS,
	pageToken?: string,
) {
	const auth = getFirebaseAuth(serviceAccount);

	return await auth.listUsers(
		Number.isNaN(maxResults) ? DEFAULT_MAX_RESULTS : maxResults,
		pageToken,
	);
}
