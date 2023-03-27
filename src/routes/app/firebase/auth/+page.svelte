<script context="module" lang="ts">
	import type { UserRecord } from 'firebase-admin/auth';
	import type { JSONValue } from 'svelte-jsoneditor';
	import { derived } from 'svelte/store';
	import { z } from 'zod';

	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Pagination from '$components/Pagination.svelte';
	import {
		AUTH_MAX_RESULTS_DEFAULT_VALUE,
		AUTH_MAX_RESULTS_QUERY_PARAM,
		AUTH_SEARCH_QUERY_PARAM,
	} from '$lib/constants';
	import { navigateQueryParams } from '$utils/navigate-query-params';
	import { getSearchParam } from '$utils/search-params-utils';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	import Row from './Row.svelte';

	export let data: PageServerData;

	let searchInput: HTMLInputElement;

	$: records = (data.queryResult.records as (UserRecord & JSONValue)[]) ?? [];

	const maxResults = derived(page, ({ url }) =>
		getSearchParam(
			url.searchParams,
			AUTH_MAX_RESULTS_QUERY_PARAM,
			z
				.string()
				.regex(/^\d+$/)
				.transform((str) => Number.parseInt(str, 10)),
			AUTH_MAX_RESULTS_DEFAULT_VALUE,
		),
	);
	const search = derived(page, ({ url }) =>
		getSearchParam(url.searchParams, AUTH_SEARCH_QUERY_PARAM, z.string(), ''),
	);

	function handleSearchKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
	function handleSearch() {
		navigateQueryParams({ [AUTH_SEARCH_QUERY_PARAM]: searchInput.value });
	}
	function handleMaxResultsInput(
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		},
	) {
		navigateQueryParams({ [AUTH_MAX_RESULTS_QUERY_PARAM]: event.currentTarget.value });
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="flex flex-col gap-2">
	<div class="flex flex-row items-center justify-between gap-2">
		<div class="input-group">
			<input
				class="input input-sm input-bordered w-full md:max-w-xs"
				placeholder="Search for users..."
				type="text"
				value="{$search}"
				bind:this="{searchInput}"
				on:keydown="{handleSearchKeyDown}"
			/>

			<button class="btn btn-sm btn-secondary" on:click="{handleSearch}">
				<Icon icon="magnifying-glass" style="solid" />
			</button>
		</div>

		<a
			class="btn btn-sm btn-secondary flex-row gap-2"
			href="/api/v1/firebase/auth/listUsers?{$page.url.searchParams.toString()}"
			rel="noreferrer"
			target="_blank"
			title="Get data"
		>
			<span> Get data </span>

			<Icon icon="file-export" style="solid" />
		</a>
	</div>

	<div class="flex flex-col gap-y-2">
		{#each records as record}
			<Row record="{record}" />
		{/each}
	</div>

	<div class="flex flex-col lg:flex-row items-center justify-between gap-2">
		<Pagination
			min="{data.queryResult.minPage}"
			current="{data.queryResult.currentPage}"
			max="{data.queryResult.maxPage}"
			desktopMaxAdjacentPages="{5}"
			mobileMaxAdjacentPages="{3}"
			showFirstAndLast="{false}"
		/>

		<div class="my-2 flex flex-row items-center justify-end gap-x-2">
			<label for="maxResults"> Rows per page </label>

			<select
				class="select select-bordered select-sm"
				id="maxResults"
				name="maxResults"
				value="{$maxResults}"
				on:change="{handleMaxResultsInput}"
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
</div>
