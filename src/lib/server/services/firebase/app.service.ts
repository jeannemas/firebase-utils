import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';
import type { ServiceAccount } from '@prisma/client';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

export function getFirebaseApp(serviceAccount: ServiceAccount) {
	const apps = getApps();
	const app = apps.find(({ name }) => name === serviceAccount.id);

	if (app) {
		return app;
	}

	const { project_id, client_email, private_key } = getServiceAccountJSON(serviceAccount);

	return initializeApp(
		{
			credential: cert({
				projectId: project_id,
				clientEmail: client_email,
				privateKey: private_key,
			}),
		},
		serviceAccount.id,
	);
}
