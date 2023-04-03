import { CloudFunctionsServiceClient } from '@google-cloud/functions';
import type { ServiceAccount } from '@prisma/client';

import { getServiceAccountJSON } from '$server/utils/getServiceAccountJSON';

/**
 * Get a Google Cloud Functions client for a Google Cloud project.
 * The project is identified by the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The Google Cloud Functions client.
 */
function getGoogleCloudFunctions(serviceAccount: ServiceAccount) {
	// We first parse the service account JSON.
	const { client_email, private_key } = getServiceAccountJSON(serviceAccount);
	// We then create the Google Cloud Functions client.
	const functions = new CloudFunctionsServiceClient({
		credentials: {
			client_email,
			private_key,
		},
	});

	return functions;
}

/**
 * List all functions from a Google Cloud project.
 * The project is identified by the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The functions.
 */
export async function listFunctions(serviceAccount: ServiceAccount) {
	// We first get the Google Cloud Functions client.
	const functions = getGoogleCloudFunctions(serviceAccount);
	// We then parse the service account JSON for the project ID.
	const { project_id } = getServiceAccountJSON(serviceAccount);
	// We then list all functions.
	const [funcs] = await functions.listFunctions({
		parent: `projects/${project_id}/locations/-`,
	});

	return funcs;
}
