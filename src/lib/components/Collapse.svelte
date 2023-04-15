<script context="module" lang="ts">
</script>

<script lang="ts">
	export let lazyload = false;
	export let title: string | null = null;

	let collapseIsOpen = false;
	let hasBeenOpened = false;

	function handleToggleCollapse() {
		collapseIsOpen = !collapseIsOpen;

		if (collapseIsOpen) {
			hasBeenOpened = true;
		}
	}
</script>

<!-- TODO comment -->

<div class="collapse collapse-arrow" class:collapse-open="{collapseIsOpen}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="collapse-title flex flex-row items-center justify-between min-h-fit cursor-pointer"
		on:click|self="{handleToggleCollapse}"
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
