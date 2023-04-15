import { fail } from '@sveltejs/kit';
import type { infer as ZodInfer, ZodType } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * An utility function to validate the incoming body of a request.
 *
 * @param request The request
 * @param schema The schema to validate the body against
 * @returns The validated body
 */
export async function validateIncomingBody<S extends ZodType>(
	request: Request,
	schema: S,
): Promise<ZodInfer<S>> {
	// We first parse the body of the request.
	const body = await request.json();
	// We then validate the body against the schema.
	const result = schema.safeParse(body);

	if (!result.success) {
		const { details, message, name, cause } = fromZodError(result.error);

		// We throw an error if the body is invalid.
		throw fail(400, {
			details,
			message,
			name,
			cause,
		});
	}

	return result.data;
}
