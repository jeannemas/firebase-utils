<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { PAGINATION_PAGE_QUERY_PARAM } from '$lib/constants';
</script>

<script lang="ts">
	export let showFirstAndLast = true;
	export let desktopMaxAdjacentPages = 3;
	export let mobileMaxAdjacentPages = 1;
	export let min: number;
	export let current: number | null;
	export let max: number;

	let previousPages: number[] = [];
	let nextPages: number[] = [];
	let previousAdjacentPagesDesktop: number[] = [];
	let previousAdjacentPagesMobile: number[] = [];
	let nextAdjacentPagesDesktop: number[] = [];
	let nextAdjacentPagesMobile: number[] = [];

	$: {
		previousPages = [];
		nextPages = [];

		if (current) {
			for (let i = min; i < current; i++) {
				previousPages.push(i);
			}

			for (let i = current + 1; i <= max; i++) {
				nextPages.push(i);
			}
		}

		previousAdjacentPagesDesktop = previousPages.slice(-desktopMaxAdjacentPages);
		previousAdjacentPagesMobile = previousPages.slice(-mobileMaxAdjacentPages);
		nextAdjacentPagesDesktop = nextPages.slice(0, desktopMaxAdjacentPages);
		nextAdjacentPagesMobile = nextPages.slice(0, mobileMaxAdjacentPages);
	}

	if (current) {
		for (let i = min; i < current; i++) {
			previousPages.push(i);
		}

		for (let i = current + 1; i <= max; i++) {
			nextPages.push(i);
		}
	}

	function handlePageChange(pageNumber: number) {
		const url = new URL($page.url);

		url.searchParams.set(PAGINATION_PAGE_QUERY_PARAM, pageNumber.toString());

		return url.toString();
	}
</script>

<style lang="postcss">
	.button {
		@apply btn-outline btn-sm btn shadow-md;
	}
</style>

<div class="flex flex-row items-center justify-center gap-2">
	{#if current}
		{#if showFirstAndLast && !previousAdjacentPagesDesktop.includes(min) && !previousAdjacentPagesMobile.includes(min) && min !== current}
			<a class="button" href="{handlePageChange(min)}">
				{min}
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
			{current}
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

		{#if showFirstAndLast && !nextAdjacentPagesDesktop.includes(max) && !nextAdjacentPagesMobile.includes(max) && max !== current}
			<a class="button" href="{handlePageChange(max)}">
				{max}
			</a>
		{/if}
	{/if}
</div>
