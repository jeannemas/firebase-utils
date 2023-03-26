<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	import Alert from '$components/Alert.svelte';
	import type { Toast } from '$models/Toast.model';
</script>

<script lang="ts">
	const alerts = writable<Toast[]>([]);

	export function unshift(payload: Toast) {
		alerts.update((alerts) => [payload, ...alerts]);
	}
	export function push(payload: Toast) {
		alerts.update((alerts) => [...alerts, payload]);
	}
</script>

<div class="toast-end toast-bottom toast">
	{#each $alerts as alert}
		<Alert class="{alert.class}" dismissible="{alert.dismissible}" timeout="{alert.timeout}">
			{alert.text}
		</Alert>
	{/each}
</div>
