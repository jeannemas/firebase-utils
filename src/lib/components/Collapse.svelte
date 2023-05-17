<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte';
</script>

<script lang="ts">
	interface $$Events {
		open: CustomEvent<void>;
		close: CustomEvent<void>;
	}

	const dispatch = createEventDispatcher();

	export let lazyload = false;
	export let title: string | null = null;

	let isOpen = false;
	let hasBeenOpened = false;

	export function open() {
		isOpen = true;
		hasBeenOpened = true;

		dispatch('open');
	}
	export function close() {
		isOpen = false;

		setTimeout(() => dispatch('close'), 200);
	}
	export function toggle() {
		if (isOpen) {
			close();
		} else {
			open();
		}
	}
</script>

<!-- TODO comment -->

<div class="collapse collapse-arrow" class:collapse-open="{isOpen}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="collapse-title flex flex-row items-center justify-between min-h-fit cursor-pointer"
		on:click|self="{toggle}"
	>
		<slot name="title">
			{#if title}
				<span class="select-none">
					{title}
				</span>
			{/if}
		</slot>
	</div>

	<div class="collapse-content">
		{#if hasBeenOpened || !lazyload}
			<slot />
		{/if}
	</div>
</div>
