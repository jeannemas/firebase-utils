<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	import Alert from '../alerts/Alert.svelte';
</script>

<script lang="ts">
	type AlertPayload = {
		dismissible?: boolean;
		style: string;
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
		<svelte:component this="{Alert}" {...alert} />
	{/each}
</div>
