declare module '@sveltejs/kit' {
	// We add a new function to the SvelteKit namespace to allow us to create a `Response` with a typed body.
	export function json<T>(data: T, init?: ResponseInit): JSONTypedResponse<T>;
}

/** A typed response used to represent a JSON response. */
export interface JSONTypedResponse<R> extends Response {
	json(): Promise<R>;
}

// TODO add support for Zod Schema to validate the response instead of blindly trusting the typing => we'll use zod-fetch
