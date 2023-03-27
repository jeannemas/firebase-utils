import { z } from 'zod';

export const schema = z.object({
	json: z.string(),
	label: z.string().trim().min(1),
});

export type Schema = z.infer<typeof schema>;
