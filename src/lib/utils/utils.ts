/**
 * Omit keys from an object.
 * This is roughly equivalent to the `Omit` type in TypeScript.
 *
 * @param object The object to omit keys from
 * @param keys The keys to omit
 * @returns The object without the omitted keys
 */
export function omit<O extends object, K extends (keyof O)[]>(object: O, keys: K) {
	const entries = Object.entries(object).filter(([key]) => !keys.includes(key as keyof O));

	return Object.fromEntries(entries) as Omit<O, K[number]>;
}

/**
 * Pick keys from an object.
 * This is roughly equivalent to the `Pick` type in TypeScript.
 *
 * @param object The object to pick keys from
 * @param keys The keys to pick
 * @returns The object with the picked keys
 */
export function pick<O extends object, K extends (keyof O)[]>(object: O, keys: K) {
	const entries = Object.entries(object).filter(([key]) => keys.includes(key as keyof O));

	return Object.fromEntries(entries) as Pick<O, K[number]>;
}
