import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export type NavigationMode = 'merge' | 'replace';

export function navigateQueryParams(
	params: Record<string, string>,
	mode: NavigationMode = 'merge',
) {
	const $page = get(page);
	const url = new URL($page.url);

	if (mode === 'replace') {
		url.search = '';
	}

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	return goto(url);
}
