import { Storage } from '@google-cloud/storage';
import type { ServiceAccount } from '@prisma/client';

function getGoogleCloudStorage(serviceAccount: ServiceAccount) {
	const storage = new Storage({
		credentials: JSON.parse(serviceAccount.json),
	});

	return storage;
}

export async function getBuckets(serviceAccount: ServiceAccount) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const [buckets] = await storage.getBuckets();

	return buckets;
}

export async function getFiles(serviceAccount: ServiceAccount, bucket: string) {
	const storage = getGoogleCloudStorage(serviceAccount);
	const [files] = await storage.bucket(bucket).getFiles();

	return files;
}
