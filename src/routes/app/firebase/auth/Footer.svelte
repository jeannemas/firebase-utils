<script context="module" lang="ts">
	import PaginationComponent from '$components/Pagination.svelte';
	import { PAGINATION } from '$lib/constants';
	import { navigateQueryParams } from '$utils/navigate-query-params';
	import type { Pagination } from '$utils/pagination';
</script>

<script lang="ts">
	export let pagination: Pagination;
	export let resultsPerPage: number;

	function handleResultsPerPageInput(
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		},
	) {
		navigateQueryParams({ [PAGINATION.RESULTS_PER_PAGE.QUERY_PARAM]: event.currentTarget.value });
	}
</script>

<!-- TODO comment -->

<div class="flex flex-col lg:flex-row items-center justify-between gap-2">
	<PaginationComponent
		desktopMaxAdjacentPages="{5}"
		mobileMaxAdjacentPages="{3}"
		showFirstAndLast="{false}"
		pagination="{pagination}"
	/>

	<div class="my-2 flex flex-row items-center justify-end gap-x-2">
		<label for="maxResults"> Rows per page </label>

		<select
			class="select select-bordered select-sm"
			id="resultsPerPage"
			name="resultsPerPage"
			value="{resultsPerPage}"
			on:change="{handleResultsPerPageInput}"
		>
			<option value="{10}"> 10 </option>

			<option value="{25}"> 25 </option>

			<option value="{50}"> 50 </option>

			<option value="{100}"> 100 </option>

			<option value="{250}"> 250 </option>

			<option value="{500}"> 500 </option>

			<option value="{1000}"> 1000 </option>
		</select>
	</div>
</div>
