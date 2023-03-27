import { z } from 'zod';

export const schema = z.object({
	type: z.literal('service_account'),
	project_id: z.string(),
	private_key_id: z.string(),
	private_key: z.string(),
	client_email: z.string().email(),
	client_id: z.string().regex(/^\d+$/),
	auth_uri: z.string().url(),
	token_uri: z.string().url(),
	auth_provider_x509_cert_url: z.string().url(),
	client_x509_cert_url: z.string().url(),
});

export type Schema = z.infer<typeof schema>;
