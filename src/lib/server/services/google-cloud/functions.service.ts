import { CloudFunctionsServiceClient } from '@google-cloud/functions';
import type { ServiceAccount } from '@prisma/client';

function getGoogleCloudFunctions(serviceAccount: ServiceAccount) {
	const functions = new CloudFunctionsServiceClient({
		credentials: JSON.parse(serviceAccount.json),
	});

	return functions;
}

export async function listFunctions(serviceAccount: ServiceAccount) {
	const functions = getGoogleCloudFunctions(serviceAccount);
	const [funcs] = await functions.listFunctions({
		parent: `projects/${JSON.parse(serviceAccount.json).project_id}/locations/-`,
	});

	return funcs;
}
