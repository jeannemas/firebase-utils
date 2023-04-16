declare module '@sveltejs/kit' {
	// We add a new function to the SvelteKit namespace to allow us to create a `Response` with a typed body.
	export function json<T>(data: T, init?: ResponseInit): JSONTypedResponse<T>;
}

/** A typed response used to represent a JSON response. */
export interface JSONTypedResponse<R> extends Response {
	json(): Promise<R>;
}

/** A type guard to check if a response is a JSONTypedResponse. */
export type GetJSONResponseType<R> = R extends JSONTypedResponse<infer T> ? T : never;

// TODO add support for Zod Schema to validate the response instead of blindly trusting the typing => we'll use zod-fetch
