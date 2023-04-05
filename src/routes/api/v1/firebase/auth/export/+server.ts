import { fail, json } from '@sveltejs/kit';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { exportUsers } from '$server/services/firebase/auth.service';
import { getServiceAccountFromCookies } from '$server/utils/getServiceAccountFromCookies';

// TODO comment

const formatSchema = z.union([z.literal('csv'), z.literal('json')]);
const querySchema = z.string().optional().default('*');

export type GETResponse = Awaited<ReturnType<typeof exportUsers>>;

export const GET = async ({ cookies, url }) => {
	const serviceAccount = await getServiceAccountFromCookies(cookies);
	const formatResult = formatSchema.safeParse(url.searchParams.get('format'));

	if (!formatResult.success) {
		const { details, message, name, cause } = fromZodError(formatResult.error);

		throw fail(400, {
			details,
			message,
			name,
			cause,
		});
	}

	const queryResult = querySchema.safeParse(url.searchParams.get('query'));

	if (!queryResult.success) {
		const { details, message, name, cause } = fromZodError(queryResult.error);

		throw fail(400, {
			details,
			message,
			name,
			cause,
		});
	}

	const exportedData = await exportUsers(serviceAccount, queryResult.data, formatResult.data);

	return json<GETResponse>(exportedData, {
		status: 200,
	});
};
