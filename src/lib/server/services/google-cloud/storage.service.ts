import { Storage } from '@google-cloud/storage';
import type { ServiceAccount } from '@prisma/client';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

function getGoogleCloudStorage(serviceAccount: ServiceAccount) {
	const storage = new Storage({
		credentials: getServiceAccountJSON(serviceAccount),
	});

	return storage;
}

export async function getBuckets(serviceAccount: ServiceAccount) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const [buckets] = await storage.getBuckets();

	return buckets;
}

export async function getDefaultBucket(serviceAccount: ServiceAccount) {
	const buckets = await getBuckets(serviceAccount);
	const name = `${getServiceAccountJSON(serviceAccount).project_id}.appspot.com`;

	return buckets.find((bucket) => bucket.name === name) ?? null;
}

export async function getFiles(serviceAccount: ServiceAccount, bucket: string) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const [files] = await storage.bucket(bucket).getFiles();

	return files;
}

export async function getSignedUrl(
	serviceAccount: ServiceAccount,
	bucketName: string,
	filePath: string,
	expiresIn = 1000 * 60 * 60, // 1 hour
) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const bucket = storage.bucket(bucketName);
	const file = bucket.file(filePath);
	const response = await file.exists().then(([exists]) =>
		exists
			? file.getSignedUrl({
					action: 'read',
					expires: Date.now() + expiresIn,
			  })
			: null,
	);

	return response?.[0] ?? null;
}

export async function getFileMetadata(
	serviceAccount: ServiceAccount,
	bucketName: string,
	filePath: string,
) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const bucket = storage.bucket(bucketName);
	const file = bucket.file(filePath);
	const data = await file.exists().then(([exists]) => (exists ? file.getMetadata() : null));
	const metadata = data?.[0] ?? null;

	return metadata;
}
