<script lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import Alert from '$lib/components/alerts/Alert.svelte';

	import type { LayoutServerData } from './$types';
	import ServiceAccountHeader from './ServiceAccountHeader.svelte';

	export let data: LayoutServerData;

	const serviceAccounts = writable<ServiceAccount[]>([]);

	$: serviceAccounts.set(data.serviceAccounts);

	setContext('serviceAccounts', serviceAccounts);
</script>

<ServiceAccountHeader />

{#if $serviceAccounts.length}
	<slot />
{:else}
	<div class="flex flex-row justify-center">
		<Alert
			style="warning"
			text="You need to upload a service account to use this page."
		/>
	</div>
{/if}
