import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export type NavigationMode = 'merge' | 'replace';

/**
 * An utility function to navigate to a new URL with query parameters.
 *
 * @param params The query parameters to add to the URL as an object
 * @param mode The navigation mode. Defaults to `merge`
 * @returns The navigation promise
 */
export function navigateQueryParams(
	params: Record<string, string>,
	mode: NavigationMode = 'merge',
) {
	// We first get the current page.
	const $page = get(page);
	// We then create a new URL from the current page URL.
	const url = new URL($page.url);

	if (mode === 'replace') {
		// We clear the search params if the navigation mode is `replace`.
		url.search = '';
	}

	// We then add the query parameters to the URL.
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	// We finally navigate to the new URL.
	return goto(url);
}
