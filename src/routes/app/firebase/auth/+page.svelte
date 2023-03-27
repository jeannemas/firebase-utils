<script context="module" lang="ts">
	import { derived } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Pagination from '$components/Pagination.svelte';
	import {
		AUTH_MAX_RESULTS_DEFAULT_VALUE,
		AUTH_MAX_RESULTS_QUERY_PARAM,
		AUTH_SEARCH_DEFAULT_VALUE,
		AUTH_SEARCH_QUERY_PARAM,
	} from '$lib/constants';
	import { debounce } from '$utils/debounce';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	let searchInput: HTMLInputElement;

	$: records = data.queryResult.records ?? [];

	const maxResults = derived(
		page,
		({ url }) =>
			url.searchParams.get(AUTH_MAX_RESULTS_QUERY_PARAM) ?? AUTH_MAX_RESULTS_DEFAULT_VALUE,
	);
	const search = derived(
		page,
		({ url }) => url.searchParams.get(AUTH_SEARCH_QUERY_PARAM) ?? AUTH_SEARCH_DEFAULT_VALUE,
	);

	const handleSearchInput = debounce(500, (value: string) =>
		handleSearchParamsChange(AUTH_SEARCH_QUERY_PARAM, value).then(() => searchInput.focus()),
	);

	function handleMaxResultsInput(value: string) {
		handleSearchParamsChange(AUTH_MAX_RESULTS_QUERY_PARAM, value);
	}
	function handleSearchParamsChange(key: string, value: string) {
		const url = new URL($page.url);

		url.searchParams.set(key, value);

		return goto(url);
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="my-2 flex flex-row items-center justify-start gap-x-2">
	<!-- TODO fix the input loosing focus on navigation -->
	<input
		class="input input-sm input-bordered w-full md:max-w-xs"
		placeholder="Search for users..."
		type="text"
		value="{$search}"
		bind:this="{searchInput}"
		on:input="{({ currentTarget }) => handleSearchInput(currentTarget.value)}"
	/>
</div>

<div class="relative">
	<!-- TODO use js -->
	<div class="flex flex-col rounded-box shadow-lg">
		{#each records as record}
			<div class="collapse collapse-arrow" tabindex="-1">
				<div
					class="collapse-title items-center min-h-fit py-3 flex justify-between text-sm md:text-base"
				>
					<div>
						{record.email ?? ''}
					</div>

					<div class="hidden md:block">
						{record.uid}
					</div>
				</div>

				<div class="collapse-content overflow-x-auto">
					<pre><code>{JSON.stringify(record, null, 2)}</code></pre>
				</div>
			</div>
		{/each}
	</div>
</div>

<Pagination
	min="{data.queryResult.minPage}"
	current="{data.queryResult.currentPage}"
	max="{data.queryResult.maxPage}"
	maxAdjacentPages="{1}"
/>

<div class="my-2 flex flex-row items-center justify-end gap-x-2">
	<label for="maxResults"> Rows per page </label>

	<select
		class="select select-bordered select-sm"
		id="maxResults"
		name="maxResults"
		value="{$maxResults}"
		on:change="{(event) => handleMaxResultsInput(event.currentTarget.value)}"
	>
		<option value="10"> 10 </option>

		<option value="25"> 25 </option>

		<option value="50"> 50 </option>

		<option value="100"> 100 </option>

		<option value="250"> 250 </option>

		<option value="500"> 500 </option>

		<option value="1000"> 1000 </option>
	</select>
</div>
