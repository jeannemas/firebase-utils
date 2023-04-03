<script context="module" lang="ts">
</script>

<script lang="ts">
	let isOpen = false;

	export function open() {
		isOpen = true;
	}
	export function close() {
		isOpen = false;
	}
	export function toggle() {
		isOpen = !isOpen;
	}
</script>

<!-- TODO comment -->

<!-- TODO use portal -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" class:modal-open="{isOpen}" on:click|self="{close}">
	<div class="modal-box relative">
		<slot />
	</div>
</div>
