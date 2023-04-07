import { json } from '@sveltejs/kit';
import { z } from 'zod';

import { exportUsers, type ExportResult } from '$server/services/firebase-auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';
import { validateSearchParams } from '$server/utils/validate-search-params';

// TODO comment

export type Endpoint = Like<
	Metadata,
	{
		GET: ExportResult;
	}
>;

export const GET = async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const { format, query } = await validateSearchParams(
		url.searchParams,
		z.object({
			format: z.union([z.literal('csv'), z.literal('json')]),
			query: z.string().optional().default('*'),
		}),
	);

	const exportedData = await exportUsers(serviceAccount, query, format);

	return json<Endpoint['GET']>(exportedData, {
		status: 200,
	});
};
