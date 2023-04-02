declare global {
	export interface Response {
		// We fix the default return type of Response#json() to be `unknown` instead of `any` to enforece type safety.
		json(): Promise<unknown>;
	}

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

// TODO add support for Zod Schema to validate the response instead of blindly trusting the typing
