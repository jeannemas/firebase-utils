import type { ServiceAccount } from '@prisma/client';
import { stringify } from 'csv';
import { getAuth, type ListUsersResult, type UserRecord } from 'firebase-admin/auth';
import {
	z,
	type ZodBoolean,
	type ZodDefault,
	type infer as ZodInfer,
	type ZodObject,
	type ZodOptional,
	type ZodString,
} from 'zod';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

import { getFirebaseApp } from './firebase-app.service';

/** The public fields of a user record */
export type PublicUser = ReturnType<typeof extractFieldsFromUserRecord>;
/** The result of exporting users */
export type ExportResult = {
	/** The exported users */
	content: string;
	/** The content type of the exported users */
	contentType: string;
	/** The filename of the exported users */
	filename: string;
};
export type DownloadFormat = ZodInfer<typeof formatSchema>;

// TODO comment

const includeSchema = z.boolean().optional().default(true);
const nameSchema = z.string().trim().nonempty();

export const formatSchema = z.union([z.literal('csv'), z.literal('json')]);
export const exportConfigSchema = z.object({
	fields: z.object({
		creationTime: z.object({
			include: includeSchema,
			name: nameSchema.default('creationTime'),
		}),
		customClaims: z.object({
			include: includeSchema,
			name: nameSchema.default('customClaims'),
		}),
		disabled: z.object({
			include: includeSchema,
			name: nameSchema.default('disabled'),
		}),
		displayName: z.object({
			include: includeSchema,
			name: nameSchema.default('displayName'),
		}),
		email: z.object({
			include: includeSchema,
			name: nameSchema.default('email'),
		}),
		emailVerified: z.object({
			include: includeSchema,
			name: nameSchema.default('emailVerified'),
		}),
		lastSignInTime: z.object({
			include: includeSchema,
			name: nameSchema.default('lastSignInTime'),
		}),
		phoneNumber: z.object({
			include: includeSchema,
			name: nameSchema.default('phoneNumber'),
		}),
		photoURL: z.object({
			include: includeSchema,
			name: nameSchema.default('photoURL'),
		}),
		uid: z.object({
			include: includeSchema,
			name: nameSchema.default('uid'),
		}),
	}),

	format: formatSchema,
}) satisfies ZodObject<{
	fields: ZodObject<{
		[K in keyof PublicUser]: ZodObject<{
			include: ZodDefault<ZodOptional<ZodBoolean>>;
			name: ZodDefault<ZodString>;
		}>;
	}>;
}>;
export const fieldsWithLabels = {
	creationTime: 'Creation time',
	customClaims: 'Custom claims',
	disabled: 'Disabled',
	displayName: 'Display name',
	email: 'Email',
	emailVerified: 'Email verified',
	lastSignInTime: 'Last sign-in time',
	phoneNumber: 'Phone number',
	photoURL: 'Photo URL',
	uid: 'UID',
} satisfies { [K in keyof PublicUser]: string };
export const fieldNames = Object.keys(fieldsWithLabels).sort() as (keyof typeof fieldsWithLabels)[];

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
		creationTime: new Date(creationTime),
		customClaims,
		disabled,
		displayName,
		email,
		emailVerified,
		lastSignInTime: new Date(lastSignInTime),
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

export async function readOne(serviceAccount: ServiceAccount, uid: string) {
	// We first get the Firebase Auth instance.
	const auth = getFirebaseAuth(serviceAccount);

	return auth.getUser(uid);
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
 * @param config The export configuration.
 * @returns The exported data.
 */
export async function exportUsers(
	serviceAccount: ServiceAccount,
	config: ZodInfer<typeof exportConfigSchema>,
): Promise<ExportResult> {
	const { fields, format } = config;
	const users = await listUsers(serviceAccount);
	const { project_id } = getServiceAccountJSON(serviceAccount);
	const filename = `${project_id}_${serviceAccount.id}_users_export_${Date.now()}`;

	// TODO implement query logic

	if (format === 'csv') {
		return exportToCSV();
	} else if (format === 'json') {
		return exportToJSON();
	} else {
		throw new Error('Invalid export format');
	}

	async function exportToCSV(): Promise<ExportResult> {
		const content = await new Promise<string>((resolve, reject) =>
			stringify(
				users,
				{
					cast: {
						boolean: (value) => JSON.stringify(value),
						date: (value) => value.toISOString(),
						object: (value) => JSON.stringify(value),
					},
					columns: Object.entries(fields)
						.map(([key, { include, name }]) =>
							include
								? {
										key,
										header: name,
								  }
								: null,
						)
						.filter((option): option is NonNullable<typeof option> => option !== null),
					header: true,
				},
				(error, output) => (error ? reject(error) : resolve(output)),
			),
		);

		return {
			content,
			contentType: 'text/csv',
			filename: `${filename}.csv`,
		};
	}

	function exportToJSON(): ExportResult {
		const values: Record<string, unknown>[] = [];

		for (const user of users) {
			const entries: [key: string, value: unknown][] = [];

			for (const [key, value] of Object.entries(user) as [keyof PublicUser, unknown][]) {
				const field = fields[key];

				if (!field.include) {
					continue;
				}

				entries.push([field.name, value]);
			}

			values.push(Object.fromEntries(entries));
		}

		// TODO
		return {
			content: JSON.stringify(values),
			contentType: 'application/json',
			filename: `${filename}.json`,
		};
	}
}
