import type { ServiceAccount } from '@prisma/client';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

export function getFirebaseApp(serviceAccount: ServiceAccount) {
	const apps = getApps();
	const app = apps.find(({ name }) => name === serviceAccount.id);

	if (app) {
		return app;
	}

	return initializeApp(
		{
			credential: cert(JSON.parse(serviceAccount.json)),
		},
		serviceAccount.id,
	);
}
