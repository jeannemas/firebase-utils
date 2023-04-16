import { z } from 'zod';

import { PAGINATION } from '$lib/constants';
import { getSearchParam } from '$utils/search-params-utils';

type P = {
	results: unknown[];
	limit: number;
	skip: number;
	total: number;
};

// TODO rework

export type Pagination<T = unknown> = {
	/** The minimum possible page. */
	minimumPage: typeof PAGINATION.CURRENT_PAGE.MINIMUM_VALUE;
	/** The current page. */
	currentPage: number;
	/** The maximum possible page. */
	maximumPage: number;
	/** The number of results per page. */
	resultsPerPage: number;
	/** The total number of results. */
	totalResults: number;
	/** The number of results on the current page. */
	resultsOnPage: number;
	/** The results on the current page. */
	results: T[];
};
export type PaginationParams = Pick<Pagination, 'currentPage' | 'resultsPerPage'> & {
	/** The search query. */
	search: string;
};

/**
 * An utility function to paginate data.
 *
 * @param data The data to paginate.
 * @param currentPage The current page.
 * @param resultsPerPage The number of results per page.
 * @returns The pagination object.
 */
export function paginate<T>(data: T[], currentPage: number, resultsPerPage: number): Pagination<T> {
	const results = data.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
	const maximumPage = Math.ceil(data.length / resultsPerPage);

	return {
		minimumPage: PAGINATION.CURRENT_PAGE.MINIMUM_VALUE,
		currentPage,
		maximumPage,
		resultsPerPage,
		totalResults: data.length,
		resultsOnPage: results.length,
		results,
	};
}

const resultsPerPageSchema = z
	.string() // String
	.regex(/^\d+$/) // Only digits
	.transform((string) => Number.parseInt(string, 10)) // Convert the string into a number
	.transform((number) =>
		Number.isNaN(number) ? PAGINATION.RESULTS_PER_PAGE.DEFAULT_VALUE : number,
	) // If the number is NaN, use the default value
	.transform((number) => (Number.isInteger(number) ? number : Math.round(number))) // Round the number
	.transform((number) => Math.max(number, PAGINATION.RESULTS_PER_PAGE.MINIMUM_VALUE)) // If the number is less than the minimum, use the latter
	.transform((number) => Math.min(number, PAGINATION.RESULTS_PER_PAGE.MAXIMUM_VALUE)); // If the number is greater than the maximum, use the latter
const searchSchema = z.string().trim();
const pageSchema = z
	.string() // String
	.regex(/^\d+$/) // Only digits
	.transform((string) => Number.parseInt(string, 10)) // Convert the string into a number
	.transform((number) => (Number.isNaN(number) ? PAGINATION.CURRENT_PAGE.MINIMUM_VALUE : number)) // If the number is NaN, use the minimum value
	.transform((number) => (Number.isInteger(number) ? number : Math.round(number))) // Round the number
	.transform((number) => Math.max(number, PAGINATION.CURRENT_PAGE.MINIMUM_VALUE)); // If the number is less than the minimum, use the latter

/**
 * Get the pagination parameters from the search parameters.
 *
 * @param searchParams The search parameters.
 * @returns The pagination parameters.
 */
export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
	const currentPage = getSearchParam(
		searchParams,
		PAGINATION.CURRENT_PAGE.QUERY_PARAM,
		pageSchema,
		PAGINATION.CURRENT_PAGE.MINIMUM_VALUE,
	);
	const resultsPerPage = getSearchParam(
		searchParams,
		PAGINATION.RESULTS_PER_PAGE.QUERY_PARAM,
		resultsPerPageSchema,
		PAGINATION.RESULTS_PER_PAGE.DEFAULT_VALUE,
	);
	const search = getSearchParam(
		searchParams,
		PAGINATION.SEARCH.QUERY_PARAM,
		searchSchema,
		PAGINATION.SEARCH.DEFAULT_VALUE,
	);

	return {
		currentPage,
		resultsPerPage,
		search,
	};
}

/**
 * Build the pagination parameters into a `URLSearchParams` object.
 *
 * @param params The pagination parameters.
 * @returns The `URLSearchParams` object.
 */
export function buildPaginationParams(params: Partial<PaginationParams> = {}): URLSearchParams {
	const searchParams = new URLSearchParams();

	searchParams.set(
		PAGINATION.CURRENT_PAGE.QUERY_PARAM,
		(params.currentPage ?? PAGINATION.CURRENT_PAGE.MINIMUM_VALUE).toString(),
	);
	searchParams.set(
		PAGINATION.RESULTS_PER_PAGE.QUERY_PARAM,
		(params.resultsPerPage ?? PAGINATION.RESULTS_PER_PAGE.DEFAULT_VALUE).toString(),
	);
	searchParams.set(PAGINATION.SEARCH.QUERY_PARAM, params.search ?? PAGINATION.SEARCH.DEFAULT_VALUE);

	return searchParams;
}

// TODO drop the search logic as this is not really related to pagination
