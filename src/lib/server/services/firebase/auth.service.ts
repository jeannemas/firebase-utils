import type { ServiceAccount } from '@prisma/client';
import { getAuth, type ListUsersResult, type UserRecord } from 'firebase-admin/auth';

import { getFirebaseApp } from './app.service';

/**
 * Get a Firebase Auth instance from a Firebase project.
 * The project is identified using the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The Firebase Auth instance.
 */
function getFirebaseAuth(serviceAccount: ServiceAccount) {
	// We first get the Firebase app instance.
	const app = getFirebaseApp(serviceAccount);
	// We then get the Auth instance from the app.
	const auth = getAuth(app);

	return auth;
}

/**
 * List all auth users from a Firebase project.
 * The Firebase project is identified using the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The array of `UserRecord`.
 */
export async function listUsers(serviceAccount: ServiceAccount) {
	// We first get the Firebase Auth instance.
	const auth = getFirebaseAuth(serviceAccount);
	const records: UserRecord[] = [];

	let result: ListUsersResult | undefined;

	// We loop through all pages of records.
	do {
		result = await auth.listUsers(1000, result?.pageToken);

		records.push(...result.users);
	} while (result.pageToken);

	return records;
}
