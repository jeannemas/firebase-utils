import { CloudFunctionsServiceClient } from '@google-cloud/functions';
import type { ServiceAccount } from '@prisma/client';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

function getGoogleCloudFunctions(serviceAccount: ServiceAccount) {
	const functions = new CloudFunctionsServiceClient({
		credentials: getServiceAccountJSON(serviceAccount),
	});

	return functions;
}

export async function listFunctions(serviceAccount: ServiceAccount) {
	const functions = getGoogleCloudFunctions(serviceAccount);
	const [funcs] = await functions.listFunctions({
		parent: `projects/${getServiceAccountJSON(serviceAccount).project_id}/locations/-`,
	});

	return funcs;
}
