import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { z, type infer as ZodInfer, type ZodObject, type ZodRawShape, type ZodType } from 'zod';

import { validateIncomingBody } from '$utils/validate-incoming-body';
import { validateSearchParams } from '$utils/validate-search-params';

// TODO comment

type Query = ZodObject<ZodRawShape>;
type Body = ZodType;
type Config<TQuery extends Query, TBody extends Body> = {
	query?: TQuery;
	body?: TBody;
};

export type PathOf<E> = E extends Endpoint<infer P> ? P : never;
export type QueryOf<E> = E extends Endpoint<never, infer Q> ? Q : never;
export type BodyOf<E> = E extends Endpoint<never, never, infer B> ? B : never;
export type ResponseOf<E> = E extends Endpoint<never, never, never, infer R> ? R : never;

export interface Endpoint<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	TPath extends string = string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	TQuery extends ZodInfer<Query> = Record<string, string>,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	TBody extends ZodInfer<Body> = unknown,
	TResponse extends Response = Response,
> {
	(event: RequestEvent): MaybePromise<TResponse>;
}

export function createEndpointDefiner<TRequestEvent extends RequestEvent>() {
	return function defineEndpoint<
		TQuery extends Query,
		TBody extends Body,
		TResponse extends Response,
	>(
		config: Config<TQuery, TBody> = {},
		endpointHandler: (
			event: TRequestEvent & {
				query: ZodInfer<TQuery>;
				body: ZodInfer<TBody>;
			},
		) => MaybePromise<TResponse>,
	): Endpoint<
		NonNullable<TRequestEvent['route']['id']>,
		ZodInfer<TQuery>,
		ZodInfer<TBody>,
		TResponse
	> {
		return async function handler(event: TRequestEvent) {
			const [query, body] = await Promise.all([
				validateSearchParams(event.url.searchParams, config.query || z.object({})),
				validateIncomingBody(event.request, config.body || z.unknown()),
			]);

			return endpointHandler({
				...event,
				query,
				body,
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any;
	};
}
