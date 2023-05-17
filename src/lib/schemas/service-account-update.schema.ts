import { z } from 'zod';

/**
 * This schema is used to validate the incoming data for updating a service account.
 */
export const schema = z.object({
	/** The new service account's label */
	label: z.string().trim().nonempty(),
});

/**
 * This type represents the data that is expected to be received from the client.
 */
export type Schema = z.infer<typeof schema>;
