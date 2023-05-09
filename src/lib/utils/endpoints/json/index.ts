/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Endpoint } from '$utils/endpoints';

// TODO comment

export type ConfigOf<E extends Endpoint<any>> = E extends Endpoint<infer C> ? C : never;
export type RouteOf<E extends Endpoint<any>> = Exclude<
	ConfigOf<E>['request']['event']['route']['id'],
	null
>;
export type QueryOf<E extends Endpoint<any>> = ConfigOf<E>['request']['query'];
export type BodyOf<E extends Endpoint<any>> = ConfigOf<E>['request']['body'];

export function fetchJson<E extends Endpoint<any>>(
	fetch = globalThis.fetch,
	path: RouteOf<E>,
	init: Omit<RequestInit, 'body' | 'method'> & {
		method: Uppercase<string>;
	} & (unknown extends BodyOf<E> ? { body?: undefined } : { body: BodyOf<E> }) &
		(Partial<Record<string, string>> extends ConfigOf<E>['request']['event']['params']
			? { params?: undefined }
			: { params: ConfigOf<E>['request']['event']['params'] }) &
		(Record<string, string> extends QueryOf<E> ? { query?: undefined } : { query: QueryOf<E> }),
): Promise<Awaited<ReturnType<E>>> {
	const { body, params, query } = init;
	const searchParams = new URLSearchParams(query ?? {});

	searchParams.set(crypto.randomUUID(), Date.now().toString()); // Make sure the request is not cached

	let pathname: string = path;

	for (const [key, value] of Object.entries(params ?? {})) {
		pathname = String(path).replace(new RegExp(`\\[${key}(=\\w+)?\\]`), String(value));
	}

	return fetch(`${pathname}?${searchParams.toString()}`, {
		...init,
		body: body ? JSON.stringify(body) : null,
	});
}
