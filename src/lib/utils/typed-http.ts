declare global {
	export function fetch<R extends Response = Response>(
		input: RequestInfo | URL,
		init?: RequestInit | undefined,
	): Promise<R>;
}
declare module '@sveltejs/kit' {
	export function json<T>(data: T, init?: ResponseInit): JSONTypedResponse<T>;
}

export interface JSONTypedResponse<R> extends Response {
	json(): Promise<R>;
}

export type GetJSONResponseType<R> = R extends JSONTypedResponse<infer T> ? T : never;
