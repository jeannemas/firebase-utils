import type { ServiceAccount } from '@prisma/client';

import type { Schema as ServiceAccountJSON } from '$schemas/service-account-json.schema';

export function getServiceAccountJSON(serviceAccount: ServiceAccount): ServiceAccountJSON {
	return JSON.parse(serviceAccount.json);
}
