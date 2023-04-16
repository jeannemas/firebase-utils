import { fail } from '@sveltejs/kit';
import type { infer as ZodInfer, ZodType } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * An utility function to validate the incoming search params of a request.
 *
 * @param searchParams The search params to validate
 * @param schema The schema to validate the search params against
 * @returns The validated search params
 */
export async function validateSearchParams<S extends ZodType>(
	searchParams: URLSearchParams,
	schema: S,
): Promise<ZodInfer<S>> {
	// We then validate the body against the schema.
	const result = schema.safeParse(
		Object.fromEntries(
			[...searchParams.entries()]
				.reduce((map, [key, value]) => {
					const existingValue = map.get(key);

					if (existingValue === undefined) {
						return map.set(key, value);
					}

					if (Array.isArray(existingValue)) {
						existingValue.push(value);
					} else {
						map.set(key, [existingValue, value]);
					}

					return map;
				}, new Map<string, string | string[]>())
				.entries(),
		),
	);

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
