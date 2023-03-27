import type { GET as APIv1GoogleCloudStorageGetBucketsResponse } from '$routes/api/v1/google-cloud/storage/getBuckets/+server';
import type { GET as APIv1GoogleCloudStorageGetDefaultBucketResponse } from '$routes/api/v1/google-cloud/storage/getDefaultBucket/+server';
import type { GET as APIv1GoogleCloudStorageGetFilesResponse } from '$routes/api/v1/google-cloud/storage/getFiles/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const params = new URLSearchParams(url.searchParams);
	const buckets = await fetch<APIv1GoogleCloudStorageGetBucketsResponse>(
		'/api/v1/google-cloud/storage/getBuckets',
	).then((response) => response.json());
	const defaultBucket = await fetch<APIv1GoogleCloudStorageGetDefaultBucketResponse>(
		'/api/v1/google-cloud/storage/getDefaultBucket',
	).then((response) => response.json());

	if (!params.has('bucket') && defaultBucket) {
		params.set('bucket', defaultBucket);
	}

	const files = await fetch<APIv1GoogleCloudStorageGetFilesResponse>(
		`/api/v1/google-cloud/storage/getFiles?${params.toString()}`,
	).then((response) => response.json());

	return {
		buckets,
		defaultBucket,
		files,
	};
}) satisfies PageServerLoad;
