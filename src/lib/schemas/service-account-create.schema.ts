import { z } from 'zod';

import { schema as jsonSchema } from './service-account-json.schema';

/**
 * This schema is used to validate the incoming data for adding a new service account.
 */
export const schema = z.object({
	/** The service account's JSON */
	json: z.string().superRefine((value, context) => {
		let json: unknown;

		try {
			json = JSON.parse(value);
		} catch {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Invalid JSON structure. Provided value is not a valid JSON string.',
			});
		}

		const { success } = jsonSchema.safeParse(json);

		if (!success) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Invalid service-account structure.',
			});
		}
	}),
	/** The service account's label */
	label: z.string().trim().nonempty(),
});

/**
 * This type represents the data that is expected to be received from the client.
 */
export type Schema = z.infer<typeof schema>;
