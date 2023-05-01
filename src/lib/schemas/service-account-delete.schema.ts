import { z } from 'zod';

/**
 * This schema is used to validate the incoming data for deleting a service account.
 */
export const schema = z.object({
	/** The service account's id */
	id: z.string().uuid(),
});

/**
 * This type represents the data that is expected to be received from the client.
 */
export type Schema = z.infer<typeof schema>;
