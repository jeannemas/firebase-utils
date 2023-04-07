import type { ServiceAccount } from '@prisma/client';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

/**
 * Get a Firebase app instance from a given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The Firebase app instance.
 */
export function getFirebaseApp(serviceAccount: ServiceAccount) {
	const apps = getApps();
	// We search through the already created apps for one that matches the service account ID.
	const app = apps.find(({ name }) => name === serviceAccount.id);

	if (app) {
		// The app already exists, so we return it.
		return app;
	}

	// We parse the service account JSON to get the project ID, client email, and private key.
	const { project_id, client_email, private_key } = getServiceAccountJSON(serviceAccount);

	// We initialize a new app with the service account credentials.
	return initializeApp(
		{
			credential: cert({
				projectId: project_id,
				clientEmail: client_email,
				privateKey: private_key,
			}),
		},
		serviceAccount.id, // We use the service account ID as the app name to be able to find it later.
	);
}
