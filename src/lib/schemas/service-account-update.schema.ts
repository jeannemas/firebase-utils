import { z } from 'zod';

export const schema = z.object({
	label: z.string().trim().min(1).optional(),
});

export type Schema = z.infer<typeof schema>;
