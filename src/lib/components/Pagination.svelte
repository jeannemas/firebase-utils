<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	export let showFirstAndLast = true;
	export let maxAdjacentPages = 3;
	export let min: number;
	export let current: number | null;
	export let max: number;

	let previousPages: number[] = [];
	let nextPages: number[] = [];
	let previousAdjacentPages: number[] = [];
	let nextAdjacentPages: number[] = [];

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

		previousAdjacentPages = previousPages.slice(-maxAdjacentPages);
		nextAdjacentPages = nextPages.slice(0, maxAdjacentPages);
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

		url.searchParams.set('page', pageNumber.toString());

		return url.toString();
	}
</script>

{#if current && (previousAdjacentPages.length || nextAdjacentPages.length)}
	<div class="btn-group flex flex-row justify-center items-center m-4">
		{#if showFirstAndLast && !previousAdjacentPages.includes(min) && min !== current}
			<a class="btn" href="{handlePageChange(min)}">
				{min}
			</a>

			<button class="btn btn-disabled"> ... </button>
		{/if}

		{#each previousAdjacentPages as page}
			<a class="btn" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		<button class="btn btn-active">
			{current}
		</button>

		{#each nextAdjacentPages as page}
			<a class="btn" href="{handlePageChange(page)}">
				{page}
			</a>
		{/each}

		{#if showFirstAndLast && !nextAdjacentPages.includes(max) && max !== current}
			<button class="btn btn-disabled"> ... </button>

			<a class="btn" href="{handlePageChange(max)}">
				{max}
			</a>
		{/if}
	</div>
{/if}
