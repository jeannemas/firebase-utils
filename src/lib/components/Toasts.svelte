<script context="module" lang="ts">
	import { toasts } from '$client/stores/toasts';
	import Alert from '$components/Alert.svelte';
</script>

<script lang="ts">
</script>

<!-- TODO comment -->

<div class="toast toast-end toast-bottom items-end justify-end">
	{#each $toasts as { text, dismissible, timeout, type }}
		<Alert class="{type}" dismissible="{dismissible}" timeout="{timeout}">
			{text}
		</Alert>
	{/each}
</div>
