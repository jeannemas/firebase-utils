import '$utils/typed-http'; // This module defines types for HTTP responses

// TODO comment

declare global {
	// Fixes the missing type inference for the provided keys
	export type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

	// We add a new function to the global namespace to allow us to create a typed `Response`.
	// Warning: this function is purely for type safety and does not actually validate the response.
	export function fetch<R extends Response = Response>(
		input: RequestInfo | URL,
		init?: RequestInit | undefined,
	): Promise<R>;

	export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
	export type JSONValue =
		| string
		| number
		| boolean
		| null
		| { [key: string]: JSONValue }
		| JSONValue[];

	export interface Response {
		// We fix the default return type of Response#json() to be `unknown` instead of `any` to enforece type safety.
		json(): Promise<unknown>;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
