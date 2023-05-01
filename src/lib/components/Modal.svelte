<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { portal } from '$client/actions/portal.action';
</script>

<script lang="ts">
	interface $$Events {
		open: CustomEvent<void>;
		close: CustomEvent<void>;
	}

	const dispatch = createEventDispatcher();

	let isOpen = false;

	export function openModal() {
		isOpen = true;

		dispatch('open');
	}
	export function closeModal() {
		isOpen = false;

		setTimeout(() => dispatch('close'), 200);
	}
	export function toggleModal() {
		if (isOpen) {
			closeModal();
		} else {
			openModal();
		}
	}
</script>

<!-- TODO comment -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="modal modal-bottom md:modal-middle duration-200"
	class:modal-open="{isOpen}"
	on:click|self="{closeModal}"
	use:portal="{document.body}"
>
	<div class="modal-box">
		<slot />

		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
</div>
