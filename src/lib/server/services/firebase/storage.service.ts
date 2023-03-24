import type { ServiceAccount } from '@prisma/client';
import { getStorage } from 'firebase-admin/storage';

import { getFirebaseApp } from './app.service';

function getFirebaseStorage(serviceAccount: ServiceAccount) {
	const app = getFirebaseApp(serviceAccount);
	const storage = getStorage(app);

	return storage;
}
