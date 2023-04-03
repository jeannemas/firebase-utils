import type { ServiceAccount } from '@prisma/client';

import type { Schema as ServiceAccountJSON } from '$schemas/service-account-json.schema';

/**
 * An utility function to get the JSON object of a service account.
 *
 * @param serviceAccount The service account
 * @returns The JSON object
 */
export function getServiceAccountJSON(serviceAccount: ServiceAccount): ServiceAccountJSON {
	return JSON.parse(serviceAccount.json);
}
