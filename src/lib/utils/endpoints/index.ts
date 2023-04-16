import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { z, type infer as ZodInfer, type ZodObject, type ZodRawShape, type ZodType } from 'zod';

import { validateIncomingBody } from '$utils/validate-incoming-body';
import { validateSearchParams } from '$utils/validate-search-params';

// TODO comment

type Query = ZodObject<ZodRawShape>;
type Body = ZodType;

export interface Endpoint<
	TConfig extends {
		request: {
			event: RequestEvent;
			query: ZodInfer<Query>;
			body: ZodInfer<Body>;
		};
		response: {
			body: Response;
		};
	},
> {
	(event: RequestEvent): MaybePromise<TConfig['response']['body']>;
}

export function createEndpointDefiner<TRequestEvent extends RequestEvent>() {
	return function defineEndpoint<
		TQuery extends Query,
		TBody extends Body,
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
	): Endpoint<{
		request: {
			event: TRequestEvent;
			query: ZodInfer<TQuery>;
			body: ZodInfer<TBody>;
		};
		response: {
			body: TResponse;
		};
	}> {
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
