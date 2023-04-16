import type { Endpoint } from '$utils/endpoints';
// import type { ParamsOf } from '$utils/firebase-types';

// TODO comment

type ConfigOf<E> = E extends Endpoint<infer C> ? C : never;
type RouteOf<E> = Exclude<ConfigOf<E>['request']['event']['route']['id'], null>;
type QueryOf<E> = ConfigOf<E>['request']['query'];
type BodyOf<E> = ConfigOf<E>['request']['body'];
type ResponseOf<E> = ConfigOf<E>['response']['body'];
type Body<E> = unknown extends BodyOf<E> ? { body?: undefined } : { body: BodyOf<E> };
type Params<E> = /* Record<string, string> extends ParamsOf<RouteOf<E>>
	? { params?: undefined }
	: { params: ParamsOf<RouteOf<E>> }; */ ConfigOf<E>['request']['event']['params'] extends Record<
	string,
	string
>
	? { params?: undefined }
	: { params: ConfigOf<E>['request']['event']['params'] };
type Query<E> = Record<string, string> extends QueryOf<E>
	? { query?: undefined }
	: { query: QueryOf<E> };
type JsonRequestInit<E> = Omit<RequestInit, 'body' | 'method'> & {
	method: Uppercase<string>;
} & Body<E> &
	Params<E> &
	Query<E>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchJson<E extends Endpoint<any>>(
	fetch = globalThis.fetch,
	path: RouteOf<E>,
	init: JsonRequestInit<E>,
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
