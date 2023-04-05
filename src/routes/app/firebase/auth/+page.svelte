<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { download } from '$client/services/auth.service';
	import Dropdown from '$components/Dropdown.svelte';
	import Icon from '$components/Icon.svelte';
	import LoadingMessage from '$components/LoadingMessage.svelte';
	import Pagination from '$components/Pagination.svelte';
	import { PAGINATION } from '$lib/constants';
	import type { DownloadFormat } from '$models/DownloadFormat.model';
	import { navigateQueryParams } from '$utils/navigate-query-params';
	import { getPaginationParams } from '$utils/pagination';

	import Row from './Row.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data;

	let searchInput: HTMLInputElement;

	$: ({ resultsPerPage, search } = getPaginationParams($page.url.searchParams));

	function handleSearchKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
	function handleSearch() {
		navigateQueryParams({ [PAGINATION.SEARCH.QUERY_PARAM]: searchInput.value });
	}
	function handleResultsPerPageInput(
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		},
	) {
		navigateQueryParams({ [PAGINATION.RESULTS_PER_PAGE.QUERY_PARAM]: event.currentTarget.value });
	}
	function handleExport(format: DownloadFormat) {
		void download('*', format);
	}
	function handleCustomExport() {
		alert('This feature is not yet implemented.'); // TODO
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center justify-between gap-2">
		<Dropdown hover>
			<button class="btn btn-sm btn-secondary" slot="toggle" title="Export"> Export </button>

			<ul
				class="menu shadow border border-base-200 rounded-lg mt-1 bg-base-100 whitespace-nowrap"
				slot="content"
			>
				<li>
					<span>Export all users</span>

					<ul class="shadow border border-base-200 rounded-lg bg-base-100">
						<li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span on:click|preventDefault="{() => handleExport('csv')}">
								<Icon name="file-csv" style="solid" />

								CSV
							</span>
						</li>

						<li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span on:click|preventDefault="{() => handleExport('json')}">
								<Icon name="file-code" style="solid" />

								JSON
							</span>
						</li>
					</ul>
				</li>

				<li>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click|preventDefault="{handleCustomExport}"> Custom export </span>
				</li>
			</ul>
		</Dropdown>

		<div>
			<div class="input-group">
				<input
					class="input input-sm input-bordered w-full md:max-w-xs"
					placeholder="Search for users..."
					type="text"
					value="{search}"
					bind:this="{searchInput}"
					on:keydown="{handleSearchKeyDown}"
				/>

				<button class="btn btn-sm btn-secondary" title="Search" on:click="{handleSearch}">
					<Icon name="magnifying-glass" style="solid" />
				</button>
			</div>
		</div>
	</div>

	{#await data.streamed.response}
		<LoadingMessage />
	{:then response}
		<div class="flex flex-col gap-y-2">
			{#each response.results as result}
				<Row record="{result}" />
			{/each}
		</div>

		<div class="flex flex-col lg:flex-row items-center justify-between gap-2">
			<Pagination
				desktopMaxAdjacentPages="{5}"
				mobileMaxAdjacentPages="{3}"
				showFirstAndLast="{false}"
				pagination="{response}"
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
	{/await}
</div>

<!-- TODO investigate this page randomly crashing, maybe because it runs out of memory because of all the JSONEditors? -->
