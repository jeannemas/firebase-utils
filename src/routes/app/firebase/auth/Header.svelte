<script context="module" lang="ts">
	import { download } from '$client/services/auth.service';
	import Dropdown from '$components/Dropdown.svelte';
	import Icon from '$components/Icon.svelte';
	import { PAGINATION } from '$lib/constants';
	import type { DownloadFormat } from '$models/DownloadFormat.model';
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
	function handleExport(format: DownloadFormat) {
		void download('*', format);
	}
	function handleCustomExport() {
		alert('This feature is not yet implemented.'); // TODO
	}
</script>

<!-- TODO comment -->

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
						<span on:click="{() => handleExport('csv')}">
							<Icon name="file-csv" style="solid" />

							CSV
						</span>
					</li>

					<li>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span on:click="{() => handleExport('json')}">
							<Icon name="file-code" style="solid" />

							JSON
						</span>
					</li>
				</ul>
			</li>

			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click="{handleCustomExport}"> Custom export </span>
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
