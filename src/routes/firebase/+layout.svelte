<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Alert from '$components/alerts/Alert.svelte';

	import ServiceAccountHeader from './ServiceAccountHeader.svelte';
</script>

<script lang="ts">
	const serviceAccounts = getContext<Writable<ServiceAccount[]>>('serviceAccounts');
</script>

<ServiceAccountHeader />

{#if $serviceAccounts.length}
	<slot />
{:else}
	<div class="flex flex-row justify-center">
		<Alert style="warning" text="You need to upload a service account to use this page." />
	</div>
{/if}
