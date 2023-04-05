import { readAll } from '$client/services/auth.service';
import { getPaginationParams } from '$utils/pagination.js';

// TODO comment

export const load = ({ fetch, url }) => {
	const response = readAll(fetch, getPaginationParams(url.searchParams));

	return {
		streamed: {
			response,
		},
	};
};
