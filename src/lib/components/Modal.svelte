<script context="module" lang="ts">
	import { portal } from '$client/actions/portal.action';
</script>

<script lang="ts">
	export let bottom = false;

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="modal"
	class:modal-bottom="{bottom}"
	class:modal-open="{isOpen}"
	on:click|self="{close}"
	use:portal="{document.body}"
>
	<div class="modal-box">
		<slot />

		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
</div>
