<script context="module" lang="ts">
	import { download } from '$client/services/auth.service';
	import Dropdown from '$components/Dropdown.svelte';
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
	<Dropdown hover>
		<button class="btn btn-secondary" slot="toggle" title="Export"> Export </button>

		<ul
			class="menu shadow border border-base-200 rounded-lg mt-1 bg-base-100 whitespace-nowrap"
			slot="content"
		>
			<li>
				<span>Export all users</span>

				<ul class="shadow border border-base-200 rounded-lg bg-base-100">
					<li>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span on:click="{() => download('*', 'csv')}">
							<Icon name="file-csv" style="solid" />

							CSV
						</span>
					</li>

					<li>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span on:click="{() => download('*', 'json')}">
							<Icon name="file-code" style="solid" />

							JSON
						</span>
					</li>
				</ul>
			</li>

			<li>
				<a href="/app/firebase/auth/export"> Custom export </a>
			</li>
		</ul>
	</Dropdown>

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

			<button class="btn btn-secondary" title="Search" on:click="{handleSearch}">
				<Icon name="magnifying-glass" style="solid" />
			</button>
		</div>
	</div>
</div>
