import type { ZodType } from 'zod';

type ExpandToPrimitive<T> = T extends string
	? string
	: T extends number
	? number
	: T extends boolean
	? boolean
	: T extends bigint
	? bigint
	: T extends symbol
	? symbol
	: T extends undefined
	? undefined
	: T extends null
	? null
	: T;

/**
 * An utility function to get a search param from a URLSearchParams object.
 *
 * @param searchParams The URLSearchParams object
 * @param key The key of the searched param
 * @param validator The validator to use
 * @param defaultValue The default value to return if the param is not found or invalid
 * @returns The value of the param or the default value
 */
export function getSearchParam<V extends ZodType, D extends V['_output'] | null>(
	searchParams: URLSearchParams,
	key: string,
	validator: V,
	defaultValue: D = null as D,
): ExpandToPrimitive<D> {
	// We first check if the param is present in the URLSearchParams object.
	if (!searchParams.has(key)) {
		// Since the param is not present, we return the default value.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return defaultValue as any;
	}

	// We then get the value of the param.
	const value = searchParams.get(key);
	// We finally validate the value against the validator.
	const result = validator.safeParse(value);

	if (!result.success) {
		// Since the value is invalid, we return the default value.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return defaultValue as any;
	}

	return result.data;
}
