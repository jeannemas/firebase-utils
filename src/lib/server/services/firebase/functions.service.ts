import type { ServiceAccount } from '@prisma/client';
import { getFunctions } from 'firebase-admin/functions';

import { getFirebaseApp } from './app.service';

function getFirebaseFunctions(serviceAccount: ServiceAccount) {
	const app = getFirebaseApp(serviceAccount);
	const functions = getFunctions(app);

	return functions;
}
