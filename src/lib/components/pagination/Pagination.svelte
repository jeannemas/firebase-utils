<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { derived, type Readable } from 'svelte/store';
</script>

<script lang="ts">
	const dispatch = createEventDispatcher();

	export let showFirstAndLast = true;
	export let maxAdjacentPages = 3;
	export let min: Readable<number>;
	export let current: Readable<number | null>;
	export let max: Readable<number>;

	const previousPages = derived([min, current], ([$min, $current]) => {
		if ($current === null) {
			return [];
		}

		const pages: number[] = [];

		for (let i = $min; i < $current; i++) {
			pages.push(i);
		}

		return pages;
	});
	const previousAdjacentPages = derived(previousPages, ($previousPages) =>
		$previousPages.slice(-maxAdjacentPages),
	);
	const nextPages = derived([current, max], ([$current, $max]) => {
		if ($current === null) {
			return [];
		}

		const pages: number[] = [];

		for (let i = $current + 1; i <= $max; i++) {
			pages.push(i);
		}

		return pages;
	});
	const nextAdjacentPages = derived(nextPages, ($nextPages) =>
		$nextPages.slice(0, maxAdjacentPages),
	);

	function handlePageChange(page: number) {
		dispatch('pageChange', page);
	}
</script>

{#if $current && ($previousAdjacentPages.length || $nextAdjacentPages.length)}
	<div class="btn-group flex flex-row justify-center items-center m-4">
		{#if showFirstAndLast && !$previousAdjacentPages.includes($min) && $min !== $current}
			<button class="btn" on:click="{() => handlePageChange($min)}">
				{$min}
			</button>

			<button class="btn btn-disabled"> ... </button>
		{/if}

		{#each $previousAdjacentPages as page}
			<button class="btn" on:click="{() => handlePageChange(page)}">
				{page}
			</button>
		{/each}

		<button class="btn btn-active">
			{$current}
		</button>

		{#each $nextAdjacentPages as page}
			<button class="btn" on:click="{() => handlePageChange(page)}">
				{page}
			</button>
		{/each}

		{#if showFirstAndLast && !$nextAdjacentPages.includes($max) && $max !== $current}
			<button class="btn btn-disabled"> ... </button>

			<button class="btn" on:click="{() => handlePageChange($max)}">
				{$max}
			</button>
		{/if}
	</div>
{/if}
