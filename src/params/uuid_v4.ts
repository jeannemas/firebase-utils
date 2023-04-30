import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	// UUID v4 regex
	const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

	return regex.test(param);
}) satisfies ParamMatcher;
