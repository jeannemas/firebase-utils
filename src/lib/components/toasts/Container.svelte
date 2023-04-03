<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	import Alert from '$components/Alert.svelte';
	import type { Toast } from '$models/Toast.model';
</script>

<!-- TODO rework this -->
<script lang="ts">
	const alerts = writable<Toast[]>([]); // TODO this should be inside it's own store

	// TODO we should name those toasts and not alerts
	export function unshift(payload: Toast) {
		alerts.update((alerts) => [payload, ...alerts]);
	}
	export function push(payload: Toast) {
		alerts.update((alerts) => [...alerts, payload]);
	}
</script>

<!-- TODO comment -->

<div class="toast-end toast-bottom toast">
	{#each $alerts as alert}
		<Alert class="{alert.type}" dismissible="{alert.dismissible}" timeout="{alert.timeout}">
			{alert.text}
		</Alert>
	{/each}
</div>
