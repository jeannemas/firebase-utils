import type { RequestEvent as KitRequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import type { infer as ZodInfer, ZodObject, ZodRawShape, ZodType } from 'zod';

import { validateIncomingBody } from '$server/utils/validate-incoming-body';
import { validateSearchParams } from '$server/utils/validate-search-params';

import type { ParamsOf } from './firebase-types';

// TODO comment

type EndpointResponseType = MaybePromise<Response>;
type EndpointQuery = ZodObject<ZodRawShape>;
type EndpointBody = ZodType;

export type GetEnpointPath<E extends Endpoint> = E extends Endpoint<infer P> ? P : never;
export type GetEndpointQuery<E extends Endpoint> = E extends Endpoint<never, infer Q> ? Q : never;
export type GetEndpointBody<E extends Endpoint> = E extends Endpoint<never, never, infer B>
	? B
	: never;
export type GetEndpointResponse<E extends Endpoint> = E extends Endpoint<
	never,
	never,
	never,
	infer R
>
	? R
	: never;

interface Definer<RE extends KitRequestEvent> {
	<
		Query extends EndpointQuery,
		Body extends EndpointBody,
		ResponseType extends EndpointResponseType,
	>(
		query: Query,
		body: Body,
		endpointHandler: (
			event: RE & {
				query: ZodInfer<Query>;
				body: ZodInfer<Body>;
			},
		) => ResponseType,
	): Endpoint<NonNullable<RE['route']['id']>, ZodInfer<Query>, ZodInfer<Body>, ResponseType>;
}
interface Endpoint<
	Path extends string = string,
	Query extends ZodInfer<EndpointQuery> = Record<string, string>,
	Body extends ZodInfer<EndpointBody> = unknown,
	ResponseType extends EndpointResponseType = EndpointResponseType,
> {
	(event: KitRequestEvent): ResponseType;
}

export function createEndpointDefiner<RE extends KitRequestEvent>() {
	return function defineEndpoint<
		Query extends EndpointQuery,
		Body extends EndpointBody,
		ResponseType extends EndpointResponseType,
	>(
		querySchema: Query,
		bodySchema: Body,
		endpointHandler: (
			event: RE & {
				query: ZodInfer<Query>;
				body: ZodInfer<Body>;
			},
		) => ResponseType,
	) {
		return async function handler(event: RE) {
			const [query, body] = await Promise.all([
				validateSearchParams(event.url.searchParams, querySchema),
				validateIncomingBody(event.request, bodySchema),
			]);

			return endpointHandler({
				...event,
				query,
				body,
			});
		} as unknown as Endpoint<
			NonNullable<RE['route']['id']>,
			ZodInfer<Query>,
			ZodInfer<Body>,
			ResponseType
		>;
	} as Definer<RE>;
}

type EndpointJsonRequestInit<E extends string | Endpoint> = Omit<RequestInit, 'body' | 'method'> & {
	method: Uppercase<string>;
} & (E extends Endpoint
		? unknown extends GetEndpointBody<E>
			? { body?: unknown }
			: { body: GetEndpointBody<E> }
		: { body?: unknown }) &
	(E extends Endpoint
		? Record<string, string> extends ParamsOf<GetEnpointPath<E>>
			? { params?: Record<string, never> }
			: { params: ParamsOf<GetEnpointPath<E>> }
		: { params?: Record<string, never> }) &
	(E extends Endpoint
		? Record<string, string> extends GetEndpointQuery<E>
			? { query?: Record<string, string> }
			: { query: GetEndpointQuery<E> }
		: { query?: Record<string, string> });
type EndpointJsonFetcher = <E extends string | Endpoint = string>(
	path: E extends Endpoint ? GetEnpointPath<E> : E,
	init: EndpointJsonRequestInit<E>,
) => E extends Endpoint ? GetEndpointResponse<E> : Promise<Response>;

export function createJsonFetcher(fetch: Fetch = globalThis.fetch) {
	return fetch as EndpointJsonFetcher;
}
