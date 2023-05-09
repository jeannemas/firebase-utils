<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Alert from '$components/Alert.svelte';
	import Async from '$components/Async.svelte';
	import Icon from '$components/Icon.svelte';

	import type { LayoutServerData } from './$types';
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

<Async let:awaited="{serviceAccounts}" promise="{data.streamed.serviceAccounts}">
	{#if serviceAccounts.length}
		<div class="divide-y divide-base-200 shadow-lg rounded-lg border border-base-100">
			{#each serviceAccounts as serviceAccount}
				<div class="flex flex-row p-2 gap-2 items-center justify-between">
					<div>
						{serviceAccount.label}
					</div>

					<a href="{$page.url.pathname}/{serviceAccount.id}">
						<button class="btn btn-info"> Details </button>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex items-center flex-row justify-center">
			<Alert class="alert-warning">
				You don't have any service account. Start by uploading one!
			</Alert>
		</div>
	{/if}
</Async>

<slot />
