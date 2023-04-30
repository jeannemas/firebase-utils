<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Alert from '$components/Alert.svelte';
	import Icon from '$components/Icon.svelte';
	import LoadingMessage from '$components/LoadingMessage.svelte';

	import type { LayoutServerData } from './$types';
	import ServiceAccountTableRow from './ServiceAccountTableRow.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data: LayoutServerData;
</script>

<div class="flex flex-row items-center justify-between my-4">
	<h1 class="font-bold text-xl">Service Accounts</h1>

	<a href="{$page.url.pathname}/create">
		<button class="btn btn-secondary" title="Upload a service account">
			<span class="hidden md:inline-block">Upload a service account</span>

			<span class="md:hidden">
				<Icon name="plus" style="solid" />
			</span>
		</button>
	</a>
</div>

{#await data.streamed.serviceAccounts}
	<LoadingMessage />
{:then serviceAccounts}
	{#if serviceAccounts.length}
		<!-- TODO fix table overflowing on mobile when there is long labels -->
		<table class="table table-compact w-full shadow-md rounded-md overflow-hidden">
			<thead>
				<tr>
					<th class="w-2/3 md:w-1/4">Label</th>

					<th class="hidden md:table-cell md:w-1/4">Created</th>

					<th class="hidden md:table-cell md:w-1/4">Updated</th>

					<th class="w-1/3 md:w-1/4">Actions</th>
				</tr>
			</thead>

			<tbody>
				{#each serviceAccounts as serviceAccount}
					<ServiceAccountTableRow serviceAccount="{serviceAccount}" />
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="flex items-center flex-row justify-center">
			<Alert class="alert-warning">
				You don't have any service account. Start by uploading one!
			</Alert>
		</div>
	{/if}
{/await}

<slot />
