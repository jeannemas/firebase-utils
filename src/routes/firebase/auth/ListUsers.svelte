<script context="module" lang="ts">
	import { getContext } from 'svelte';
	import { derived, type Writable } from 'svelte/store';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { debounce } from '$lib/utils/debounce';
	import type { GetJSONResponseType } from '$lib/utils/typed-http';

	import type { GET as ListUsersAPIResponse } from '../../api/v1/firebase/auth/listUsers/+server';
</script>

<script lang="ts">
	let loading = false;

	const selectedServiceAccountId = getContext<Writable<string | null>>('selectedServiceAccountId');
	const maxResults = derived(page, ({ url }) => url.searchParams.get('maxResults') ?? '10');
	const search = derived(page, ({ url }) => url.searchParams.get('search') ?? '');
	const pageNumber = derived(page, ({ url }) => url.searchParams.get('page') ?? '1');
	const fetchUrl = derived(
		[maxResults, search, pageNumber],
		([$maxResults, $search, $pageNumber]) => {
			const url = new URL($page.url.origin);

			url.pathname = '/api/v1/firebase/auth/listUsers';
			url.searchParams.set('maxResults', $maxResults);
			url.searchParams.set('search', $search);
			url.searchParams.set('page', $pageNumber);

			return url;
		},
	);
	const users = derived(
		[fetchUrl, selectedServiceAccountId],
		([$url], set) => {
			if (!browser) {
				return set(null);
			}

			loading = true;

			fetch<ListUsersAPIResponse>($url)
				.then((response) => response.json())
				.then((users) => {
					loading = false;

					set(users);
				});
		},
		null as GetJSONResponseType<ListUsersAPIResponse> | null,
	);
	const minPage = derived(users, ($users) => $users?.minPage ?? 0);
	const maxPage = derived(users, ($users) => $users?.maxPage ?? 0);
	const currentPage = derived(users, ($users) => $users?.currentPage ?? null);
	const records = derived(users, ($users) => $users?.records ?? []);
	// TODO handle error

	const handleSearchInput = debounce(500, (value: string) =>
		handleSearchParamsChange('search', value),
	);

	function handleMaxResultsInput(value: string) {
		handleSearchParamsChange('maxResults', value);
	}
	function handlePageChange(value: number) {
		handleSearchParamsChange('page', value.toString());
	}
	function handleSearchParamsChange(key: string, value: string) {
		const url = new URL($page.url);

		url.searchParams.set(key, value);

		goto(url);
	}
</script>

<div class="my-2 flex flex-row items-center justify-start gap-x-2">
	<input
		class="input-bordered input w-full lg:max-w-xs"
		placeholder="Search for users..."
		type="text"
		value="{$search}"
		on:input="{({ currentTarget }) => handleSearchInput(currentTarget.value)}"
	/>
</div>

<div class="relative">
	<div class="flex flex-col rounded-t-box border-2 border-base-300">
		{#each $records as record}
			<div class="collapse collapse-arrow border-y border-base-300 border-collapse" tabindex="-1">
				<div
					class="collapse-title items-center min-h-fit py-3 flex justify-between text-sm lg:text-base"
				>
					<div>
						{record.email ?? ''}
					</div>

					<div class="hidden lg:block">
						{record.uid}
					</div>
				</div>

				<div class="collapse-content overflow-x-auto">
					<pre><code>{JSON.stringify(record, null, 2)}</code></pre>
				</div>
			</div>
		{/each}
	</div>

	{#if loading}
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
			<Spinner />
		</div>
	{/if}
</div>

<Pagination
	min="{minPage}"
	current="{currentPage}"
	max="{maxPage}"
	maxAdjacentPages="{1}"
	on:pageChange="{({ detail }) => handlePageChange(detail)}"
/>

<div class="my-2 flex flex-row items-center justify-end gap-x-2">
	<label for="maxResults"> Rows per page </label>

	<select
		class="select-bordered select"
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
