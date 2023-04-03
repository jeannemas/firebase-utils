import { Storage } from '@google-cloud/storage';
import type { ServiceAccount } from '@prisma/client';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

/**
 * Get a Google Cloud Storage client for a Google Cloud project.
 * The project is identified by the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The Google Cloud Storage client.
 */
function getGoogleCloudStorage(serviceAccount: ServiceAccount) {
	// We first parse the service account JSON.
	const { client_email, private_key } = getServiceAccountJSON(serviceAccount);
	// We then create the Google Cloud Storage client.
	const storage = new Storage({
		credentials: {
			client_email,
			private_key,
		},
	});

	return storage;
}

/**
 * Get all buckets from a Google Cloud project.
 * The project is identified by the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns An array of `Bucket`.
 */
export async function getBuckets(serviceAccount: ServiceAccount) {
	// We first get the Google Cloud Storage client.
	const storage = getGoogleCloudStorage(serviceAccount);
	// We then list all the buckets.
	const [buckets] = await storage.getBuckets();

	return buckets;
}

/**
 * Get the default bucket from a Google Cloud project.
 * The project is identified by the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The default bucket or `null` if it doesn't exist.
 */
export async function getDefaultBucket(serviceAccount: ServiceAccount) {
	// We first get all the buckets.
	const buckets = await getBuckets(serviceAccount);
	// We then parse the service account JSON for the project ID.
	const { project_id } = getServiceAccountJSON(serviceAccount);
	// We then compile the default bucket name.
	const bucketName = `${project_id}.appspot.com`;
	// We finally find the default bucket.
	const bucket = buckets.find(({ name }) => name === bucketName) ?? null;

	return bucket;
}

/**
 * Get all files from a Google Cloud Storage bucket.
 * The bucket is identified by the given bucket name inside the Google Cloud project.
 *
 * @param serviceAccount The service account to use.
 * @param bucket The bucket name.
 * @returns An array of `File`.
 */
export async function getFiles(serviceAccount: ServiceAccount, bucket: string) {
	// We first get the Google Cloud Storage client.
	const storage = getGoogleCloudStorage(serviceAccount);
	// We then get a reference to the bucket.
	const bucketRef = storage.bucket(bucket);
	// We finally list all the files.
	const [files] = await bucketRef.getFiles();

	return files;
}

/**
 * Get a signed URL for a file in a Google Cloud Storage bucket.
 * The bucket is identified by the given bucket name inside the Google Cloud project.
 *
 * @param serviceAccount The service account to use.
 * @param bucketName The bucket name.
 * @param filePath The file path.
 * @param expiresIn The expiration time in milliseconds. Defaults to 1 hour.
 * @returns The signed URL or `null` if the file doesn't exist.
 */
export async function getSignedUrl(
	serviceAccount: ServiceAccount,
	bucketName: string,
	filePath: string,
	expiresIn = 1000 * 60 * 60, // 1 hour
) {
	// We first get the Google Cloud Storage client.
	const storage = getGoogleCloudStorage(serviceAccount);
	// We then get a reference to the bucket.
	const bucketRef = storage.bucket(bucketName);
	// We finally get a reference to the file.
	const file = bucketRef.file(filePath);

	// We check if the file exists.
	if (!(await file.exists().then(([exists]) => exists))) {
		// If the file doesn't exist, we return `null`.
		return null;
	}

	// We then get the signed URL.
	const [url] = await file.getSignedUrl({
		action: 'read',
		expires: Date.now() + expiresIn,
	});

	return url;
}

/**
 * Get the metadata of a file in a Google Cloud Storage bucket.
 * The bucket is identified by the given bucket name inside the Google Cloud project.
 *
 * @param serviceAccount The service account to use.
 * @param bucketName The bucket name.
 * @param filePath The file path.
 * @returns The file metadata or `null` if the file doesn't exist.
 */
export async function getFileMetadata(
	serviceAccount: ServiceAccount,
	bucketName: string,
	filePath: string,
) {
	// We first get the Google Cloud Storage client.
	const storage = getGoogleCloudStorage(serviceAccount);
	// We then get a reference to the bucket.
	const bucketRef = storage.bucket(bucketName);
	// We finally get a reference to the file.
	const file = bucketRef.file(filePath);

	// We check if the file exists.
	if (!(await file.exists().then(([exists]) => exists))) {
		// If the file doesn't exist, we return `null`.
		return null;
	}

	// We then get the file metadata.
	const [metadata] = await file.getMetadata();

	return metadata;
}
