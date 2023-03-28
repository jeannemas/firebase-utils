import { STORAGE_BUCKET_QUERY_PARAM } from '$lib/constants';
import type { GET as APIv1GoogleCloudStorageGetBucketsResponse } from '$routes/api/v1/google-cloud/storage/getBuckets/+server';
import type { GET as APIv1GoogleCloudStorageGetDefaultBucketResponse } from '$routes/api/v1/google-cloud/storage/getDefaultBucket/+server';
import type { GET as APIv1GoogleCloudStorageGetFilesResponse } from '$routes/api/v1/google-cloud/storage/getFiles/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const buckets = fetch<APIv1GoogleCloudStorageGetBucketsResponse>(
		'/api/v1/google-cloud/storage/getBuckets',
	).then((response) => response.json());
	const defaultBucket = fetch<APIv1GoogleCloudStorageGetDefaultBucketResponse>(
		'/api/v1/google-cloud/storage/getDefaultBucket',
	).then((response) => response.json());
	const files = defaultBucket.then((defaultBucket) => {
		const params = new URLSearchParams(url.searchParams);

		if (!params.has(STORAGE_BUCKET_QUERY_PARAM) && defaultBucket) {
			params.set(STORAGE_BUCKET_QUERY_PARAM, defaultBucket);
		}

		return fetch<APIv1GoogleCloudStorageGetFilesResponse>(
			`/api/v1/google-cloud/storage/getFiles?${params.toString()}`,
		).then((response) => response.json());
	});

	return {
		streamed: {
			buckets,
			defaultBucket,
			files,
		},
	};
}) satisfies PageServerLoad;
