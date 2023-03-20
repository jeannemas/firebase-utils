import type { ServiceAccount } from '@prisma/client';
import { getAuth, type ListUsersResult, type UserRecord } from 'firebase-admin/auth';

import { getFirebaseApp } from './app.service';

function getFirebaseAuth(serviceAccount: ServiceAccount) {
	const app = getFirebaseApp(serviceAccount);
	const auth = getAuth(app);

	return auth;
}

export async function listUsers(serviceAccount: ServiceAccount) {
	const auth = getFirebaseAuth(serviceAccount);
	const records: UserRecord[] = [];

	let result: ListUsersResult | undefined;

	do {
		result = await auth.listUsers(1000, result?.pageToken);

		records.push(...result.users);
	} while (result.pageToken);

	return records;
}
