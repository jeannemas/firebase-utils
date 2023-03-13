import type { ServiceAccount } from '@prisma/client';
import { cert, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const apps = new Map<ServiceAccount['id'], App>();

function getFirebaseAuth(serviceAccount: ServiceAccount) {
	if (!apps.has(serviceAccount.id)) {
		apps.set(
			serviceAccount.id,
			initializeApp(
				{
					credential: cert(JSON.parse(serviceAccount.json)),
				},
				crypto.randomUUID(),
			),
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const app = apps.get(serviceAccount.id)!;
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
