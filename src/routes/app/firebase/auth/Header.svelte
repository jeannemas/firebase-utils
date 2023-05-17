<script context="module" lang="ts">
	import Icon from '$components/Icon.svelte';
	import { PAGINATION } from '$lib/constants';
	import { navigateQueryParams } from '$utils/navigate-query-params';
</script>

<script lang="ts">
	export let search: string;

	let searchInput: HTMLInputElement;

	function handleSearchKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
	function handleSearch() {
		navigateQueryParams({ [PAGINATION.SEARCH.QUERY_PARAM]: searchInput.value });
	}
</script>

<!-- TODO comment -->

<div class="flex flex-row items-center justify-between gap-2">
	<div>
		<div class="input-group">
			<input
				class="input input-bordered w-full md:max-w-xs"
				placeholder="Search for users..."
				type="search"
				value="{search}"
				bind:this="{searchInput}"
				on:focusout="{handleSearch}"
				on:keydown="{handleSearchKeyDown}"
			/>

			<button class="btn btn-primary" title="Search" on:click="{handleSearch}">
				<Icon name="magnifying-glass" style="solid" />
			</button>
		</div>
	</div>

	<a href="/app/firebase/auth/export">
		<button class="btn btn-primary" title="Export"> Export </button>
	</a>
</div>
