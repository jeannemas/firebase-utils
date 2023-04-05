import type { DownloadFormat } from '$models/DownloadFormat.model';
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

/**
 * Export users from a Firebase project.
 * The Firebase project is identified using the given service account.
 *
 * @param serviceAccount The service account to use.
 * @param query The query used to filter users.
 * @param format The format to use for the export.
 * @returns The exported data.
 */
export async function exportUsers(
	serviceAccount: ServiceAccount,
	query: string,
	format: DownloadFormat,
) {
	const records = await listUsers(serviceAccount);

	console.log({ query, format });

	if (query !== '*') {
		throw new Error('Not implemented'); // TODO
	}

	if (format === 'csv') {
		const headers = [
			'disabled',
			'emailVerified',
			'metadata.creationTime',
			'metadata.lastSignInTime',
			'uid',
			'customClaims',
			'displayName',
			'email',
			'phoneNumber',
			'photoURL',
		] as const;
		const rows: [
			disabled: boolean,
			emailVerified: boolean,
			metadataCreationTime: string,
			metadataLastSignInTime: string,
			uid: string,
			customClaims: string,
			displayName: string,
			email: string,
			phoneNumber: string,
			photoURL: string,
		][] = [];

		for (const {
			disabled,
			emailVerified,
			metadata,
			uid,
			customClaims,
			displayName,
			email,
			phoneNumber,
			photoURL,
		} of records) {
			rows.push([
				disabled,
				emailVerified,
				JSON.stringify(metadata.creationTime),
				JSON.stringify(metadata.lastSignInTime),
				JSON.stringify(uid),
				JSON.stringify(customClaims),
				JSON.stringify(displayName ?? ''),
				JSON.stringify(email ?? ''),
				JSON.stringify(phoneNumber ?? ''),
				JSON.stringify(photoURL ?? ''),
			]);
		}

		const csv = [headers, ...rows.map((row) => row.join(','))].join('\n');

		return {
			filename: `${serviceAccount.id}_users_${Date.now()}.csv`,
			content: csv,
		};
	} else if (format === 'json') {
		const json = records.map(
			({
				disabled,
				emailVerified,
				metadata,
				uid,
				customClaims,
				displayName,
				email,
				phoneNumber,
				photoURL,
			}) => ({
				disabled,
				emailVerified,
				metadata: {
					creationTime: metadata.creationTime,
					lastSignInTime: metadata.lastSignInTime,
				},
				uid,
				customClaims,
				displayName,
				email,
				phoneNumber,
				photoURL,
			}),
		);

		return {
			filename: `${serviceAccount.id}_users_${Date.now()}.json`,
			content: JSON.stringify(json),
		};
	} else {
		throw new Error('Invalid export format');
	}
}
