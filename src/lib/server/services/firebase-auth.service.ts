import type { ServiceAccount } from '@prisma/client';
import { getAuth, type ListUsersResult, type UserRecord } from 'firebase-admin/auth';

import type { DownloadFormat } from '$models/DownloadFormat.model';
import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

import { getFirebaseApp } from './firebase-app.service';

/** The public fields of a user record */
export type PublicUser = ReturnType<typeof extractFieldsFromUserRecord>;
/** The result of exporting users */
export type ExportResult = {
	/** The exported users */
	content: string;
	/** The filename of the exported users */
	filename: string;
	/** The format of the exported users */
	format: DownloadFormat;
};

/**
 * Extract the public fields from a Firebase Auth user record.
 *
 * @param userRecord The user record to extract the fields from.
 * @returns The public fields.
 */
function extractFieldsFromUserRecord(userRecord: UserRecord) {
	const {
		customClaims = {},
		disabled,
		displayName = null,
		email = null,
		emailVerified,
		metadata,
		phoneNumber = null,
		photoURL = null,
		uid,
	} = userRecord;
	const { creationTime, lastSignInTime } = metadata;

	return {
		customClaims,
		disabled,
		displayName,
		email,
		emailVerified,
		metadata: {
			creationTime,
			lastSignInTime,
		},
		phoneNumber,
		photoURL,
		uid,
	};
}

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
	const records: PublicUser[] = [];

	let result: ListUsersResult | undefined;

	// We loop through all pages of records.
	do {
		result = await auth.listUsers(1000, result?.pageToken);

		records.push(...result.users.map((record) => extractFieldsFromUserRecord(record)));
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
): Promise<ExportResult> {
	const records = await listUsers(serviceAccount);

	if (query !== '*') {
		throw new Error('Not implemented'); // TODO
	}

	const { project_id } = getServiceAccountJSON(serviceAccount);
	const filename = `${project_id}_${serviceAccount.id}_users_${Date.now()}`;

	if (format === 'csv') {
		const rows: string[] = [];
		const keysSet = new Set<keyof PublicUser>();

		for (const record of records) {
			for (const key of Object.keys(record) as (keyof PublicUser)[]) {
				keysSet.add(key);
			}
		}

		const headers = [...keysSet.values()].sort();

		for (const record of records) {
			const row: string[] = [];

			for (const key of headers) {
				row.push(JSON.stringify(record[key]));
			}

			rows.push(row.join(','));
		}

		const csv = [headers.join(','), ...rows].join('\n');

		return {
			content: csv,
			filename: `${filename}.csv`,
			format,
		};
	} else if (format === 'json') {
		return {
			content: JSON.stringify(records),
			filename: `${filename}.json`,
			format,
		};
	} else {
		throw new Error('Invalid export format');
	}
}
