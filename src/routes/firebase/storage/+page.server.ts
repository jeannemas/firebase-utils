import type { GET as APIv1GoogleCloudStorageGetBucketsResponse } from '$routes/api/v1/google-cloud/storage/getBuckets/+server';
import type { GET as APIv1GoogleCloudStorageGetFilesResponse } from '$routes/api/v1/google-cloud/storage/getFiles/+server';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const buckets = await fetch<APIv1GoogleCloudStorageGetBucketsResponse>(
		'/api/v1/google-cloud/storage/getBuckets',
	).then((response) => response.json());
	const files = await fetch<APIv1GoogleCloudStorageGetFilesResponse>(
		`/api/v1/google-cloud/storage/getFiles?${url.searchParams.toString()}`,
	).then((response) => response.json());

	return {
		buckets,
		files,
	};
}) satisfies PageServerLoad;
