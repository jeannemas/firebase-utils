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
		<div class="divide-y-2 divide-base-200 shadow-lg rounded-lg bg-base-100">
			{#each serviceAccounts as serviceAccount}
				{@const isActive = $page.url.pathname.includes(serviceAccount.id)}

				<a
					class="block p-4 text-xl transition-all duration-200 hover:bg-primary hover:text-primary-content hover:scale-x-101 hover:rounded-lg"
					class:bg-primary="{isActive}"
					class:text-primary-content="{isActive}"
					class:scale-x-101="{isActive}"
					class:rounded-lg="{isActive}"
					href="{$page.url.pathname}/{serviceAccount.id}"
				>
					{serviceAccount.label}
				</a>
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
