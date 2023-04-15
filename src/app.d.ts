import '$utils/fetch'; // This module defines the global type Fetch
import '$utils/typed-http'; // This module defines types for HTTP responses
import '$utils/utility-types'; // This module defines utility types

// TODO comment

declare global {
	// Fixes the missing type inference for the provided keys
	type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
