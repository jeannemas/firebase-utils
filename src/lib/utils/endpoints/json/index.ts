import type { BodyOf, Endpoint, PathOf, QueryOf, ResponseOf } from '$utils/endpoints';
import type { ParamsOf } from '$utils/firebase-types';

// TODO comment

type Body<E extends Endpoint> = unknown extends BodyOf<E>
	? { body?: undefined }
	: { body: BodyOf<E> };
type Params<E extends Endpoint> = Record<string, string> extends ParamsOf<PathOf<E>>
	? { params?: undefined }
	: { params: ParamsOf<PathOf<E>> };
type Query<E extends Endpoint> = Record<string, string> extends QueryOf<E>
	? { query?: undefined }
	: { query: QueryOf<E> };
type JsonRequestInit<E extends Endpoint> = Omit<RequestInit, 'body' | 'method'> & {
	method: Uppercase<string>;
} & Body<E> &
	Params<E> &
	Query<E>;

export async function fetchJson<E extends Endpoint>(
	fetch = globalThis.fetch,
	path: PathOf<E>,
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
