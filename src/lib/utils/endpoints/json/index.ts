import type { Endpoint } from '$utils/endpoints';

// TODO comment

export type ConfigOf<E> = E extends Endpoint<infer C> ? C : never;
export type RouteOf<E> = Exclude<ConfigOf<E>['request']['event']['route']['id'], null>;
export type QueryOf<E> = ConfigOf<E>['request']['query'];
export type BodyOf<E> = ConfigOf<E>['request']['body'];
export type ResponseOf<E> = ConfigOf<E>['response']['body'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchJson<E extends Endpoint<any>>(
	fetch = globalThis.fetch,
	path: RouteOf<E>,
	init: Omit<RequestInit, 'body' | 'method'> & {
		method: Uppercase<string>;
	} & (unknown extends BodyOf<E> ? { body?: undefined } : { body: BodyOf<E> }) &
		(Partial<Record<string, string>> extends ConfigOf<E>['request']['event']['params']
			? { params?: undefined }
			: { params: ConfigOf<E>['request']['event']['params'] }) &
		(Record<string, string> extends QueryOf<E> ? { query?: undefined } : { query: QueryOf<E> }),
): Promise<Awaited<ReturnType<ResponseOf<E>['json']>>> {
	const { body, params, query } = init;
	const searchParams = new URLSearchParams(query ?? {});

	let pathname: string = path;

	for (const [key, value] of Object.entries(params ?? {})) {
		pathname = path.replace(`[${key}]`, String(value));
	}

	const url = `${pathname}?${searchParams.toString()}`;
	const response = await fetch(url, {
		...init,
		body: body ? JSON.stringify(body) : null,
	});

	if (!response.ok) {
		throw response;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return response.json() as any;
}
