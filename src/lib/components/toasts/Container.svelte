<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	import Alert from '$components/Alert.svelte';
</script>

<script lang="ts">
	type AlertPayload = {
		class?: string;
		dismissible?: boolean;
		text: string;
		timeout?: number;
	};

	const alerts = writable<AlertPayload[]>([]);

	export function unshift(payload: AlertPayload) {
		alerts.update((alerts) => [payload, ...alerts]);
	}
	export function push(payload: AlertPayload) {
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
