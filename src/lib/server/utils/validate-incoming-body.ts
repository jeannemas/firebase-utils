import { error } from '@sveltejs/kit';
import type { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export async function validateIncomingBody<S extends z.ZodType>(
	request: Request,
	schema: S,
): Promise<z.infer<S>> {
	const result = schema.safeParse(await request.json());

	if (!result.success) {
		throw error(400, fromZodError(result.error));
	}

	return result.data;
}
