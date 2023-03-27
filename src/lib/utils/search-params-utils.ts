import type { z } from 'zod';

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

export function getSearchParam<V extends z.ZodType, D extends z.infer<V> | null>(
	searchParams: URLSearchParams,
	key: string,
	validator: V,
	defaultValue: D = null as D,
): ExpandToPrimitive<D> {
	if (!searchParams.has(key)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return defaultValue as any;
	}

	const result = validator.safeParse(searchParams.get(key));

	if (!result.success) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return defaultValue as any;
	}

	return result.data;
}
