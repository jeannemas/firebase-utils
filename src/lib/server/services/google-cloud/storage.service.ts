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
