<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { PAGINATION } from '$lib/constants';
	import type { Pagination } from '$utils/pagination';
</script>

<script lang="ts">
	export let showFirstAndLast = true;
	export let desktopMaxAdjacentPages = 3;
	export let mobileMaxAdjacentPages = 1;

	export let pagination: Pagination;

	/* TODO rework the pagination to get the pages from the backend instead of manually calculating them inside the frontend */

	let previousPages: number[] = [];
	let nextPages: number[] = [];
	let previousAdjacentPagesDesktop: number[] = [];
	let previousAdjacentPagesMobile: number[] = [];
	let nextAdjacentPagesDesktop: number[] = [];
	let nextAdjacentPagesMobile: number[] = [];

	$: {
		previousPages = [];
		nextPages = [];

		if (pagination.currentPage) {
			for (let i = pagination.minimumPage; i < pagination.currentPage; i++) {
				previousPages.push(i);
			}

			for (let i = pagination.currentPage + 1; i <= pagination.maximumPage; i++) {
				nextPages.push(i);
			}
		}

		previousAdjacentPagesDesktop = previousPages.slice(-desktopMaxAdjacentPages);
		previousAdjacentPagesMobile = previousPages.slice(-mobileMaxAdjacentPages);
		nextAdjacentPagesDesktop = nextPages.slice(0, desktopMaxAdjacentPages);
		nextAdjacentPagesMobile = nextPages.slice(0, mobileMaxAdjacentPages);
	}

	if (pagination.currentPage) {
		for (let i = pagination.minimumPage; i < pagination.currentPage; i++) {
			previousPages.push(i);
		}

		for (let i = pagination.currentPage + 1; i <= pagination.maximumPage; i++) {
			nextPages.push(i);
		}
	}

	function handlePageChange(pageNumber: number) {
		const url = new URL($page.url);

		url.searchParams.set(PAGINATION.CURRENT_PAGE.QUERY_PARAM, pageNumber.toString());

		return url.toString();
	}
</script>

<!-- TODO comment -->
<style lang="postcss">
	.button {
		@apply btn-outline btn-sm btn shadow-md;
	}
</style>

<div class="flex flex-row items-center justify-center gap-2">
	{#if pagination.currentPage && pagination.minimumPage !== pagination.maximumPage}
		{#if showFirstAndLast && !previousAdjacentPagesDesktop.includes(pagination.minimumPage) && !previousAdjacentPagesMobile.includes(pagination.minimumPage) && pagination.minimumPage !== pagination.currentPage}
			<a class="button" href="{handlePageChange(pagination.minimumPage)}">
				{pagination.minimumPage}
			</a>
		{/if}

		{#each previousAdjacentPagesDesktop as page}
			<a class="button !hidden lg:!inline-flex" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		{#each previousAdjacentPagesMobile as page}
			<a class="button lg:!hidden" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		<button class="button btn-secondary btn-active">
			{pagination.currentPage}
		</button>

		{#each nextAdjacentPagesMobile as page}
			<a class="button lg:!hidden" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		{#each nextAdjacentPagesDesktop as page}
			<a class="button !hidden lg:!inline-flex" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		{#if showFirstAndLast && !nextAdjacentPagesDesktop.includes(pagination.maximumPage) && !nextAdjacentPagesMobile.includes(pagination.maximumPage) && pagination.maximumPage !== pagination.currentPage}
			<a class="button" href="{handlePageChange(pagination.maximumPage)}">
				{pagination.maximumPage}
			</a>
		{/if}
	{/if}
</div>
