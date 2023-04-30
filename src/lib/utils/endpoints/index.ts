import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { z, type infer as ZodInfer, type ZodObject, type ZodRawShape, type ZodType } from 'zod';

import { validateIncomingBody } from '$utils/validate-incoming-body';
import { validateSearchParams } from '$utils/validate-search-params';

/** A wrapper type representing and endpoint. */
export interface Endpoint<
	TConfig extends {
		/** The request */
		request: {
			/** The request event */
			event: RequestEvent;
			/** The query parameters */
			query: Record<string, unknown>;
			/** The request body */
			body: unknown;
		};
		/** The response */
		response: {
			/** The response body */
			body: Response;
		};
	},
> {
	(event: RequestEvent): MaybePromise<TConfig['response']['body']>;
}

/**
 * Creates a function that can be used to define an endpoint.
 *
 * @returns A function that can be used to define an endpoint.
 */
export function createEndpointDefiner<TRequestEvent extends RequestEvent>() {
	/**
	 * Defines an endpoint.
	 *
	 * @param config The configuration for the endpoint.
	 * @param endpointHandler The handler for the endpoint.
	 * @returns The endpoint.
	 */
	function defineEndpoint<
		TQuery extends ZodObject<ZodRawShape>,
		TBody extends ZodType,
		TResponse extends Response,
	>(
		config: {
			query?: TQuery;
			body?: TBody;
		} = {},
		endpointHandler: (
			event: TRequestEvent & {
				query: ZodInfer<TQuery>;
				body: ZodInfer<TBody>;
			},
		) => MaybePromise<TResponse>,
	) {
		/**
		 * The endpoint.
		 *
		 * @param event The request event.
		 */
		async function handler(event: TRequestEvent) {
			const [query, body] = await Promise.all([
				validateSearchParams(event.url.searchParams, config.query || z.object({})),
				validateIncomingBody(event.request, config.body || z.unknown()),
			]);

			return endpointHandler({
				...event,
				query,
				body,
			});
		}

		return handler as Endpoint<{
			request: {
				event: TRequestEvent;
				query: ZodInfer<TQuery>;
				body: ZodInfer<TBody>;
			};
			response: {
				body: TResponse;
			};
		}>;
	}

	return defineEndpoint;
}
