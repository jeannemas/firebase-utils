import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import type { infer as ZodInfer, ZodObject, ZodRawShape, ZodType } from 'zod';

import { validateIncomingBody } from '$utils/validate-incoming-body';
import { validateSearchParams } from '$utils/validate-search-params';

// TODO comment

type Query = ZodObject<ZodRawShape>;
type Body = ZodType;
type Handler<
	TRequestEvent extends RequestEvent,
	TQuery extends Query,
	TBody extends Body,
	TResponse extends Response,
> = (
	event: TRequestEvent & {
		query: ZodInfer<TQuery>;
		body: ZodInfer<TBody>;
	},
) => MaybePromise<TResponse>;

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
		querySchema: TQuery,
		bodySchema: TBody,
		endpointHandler: Handler<TRequestEvent, TQuery, TBody, TResponse>,
	): Endpoint<
		NonNullable<TRequestEvent['route']['id']>,
		ZodInfer<TQuery>,
		ZodInfer<TBody>,
		TResponse
	> {
		return async function handler(event: TRequestEvent) {
			const [query, body] = await Promise.all([
				validateSearchParams(event.url.searchParams, querySchema),
				validateIncomingBody(event.request, bodySchema),
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
