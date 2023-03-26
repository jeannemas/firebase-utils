import type { Handle } from '@sveltejs/kit';

// TODO Add auth
// TODO: add a batch of comments in the project to document the business rules

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event);

	return response;
}) satisfies Handle;
