<script context="module" lang="ts">
</script>

<script lang="ts">
	export let end = false;
	export let hover = false;
</script>

<!-- TODO comment -->

<div class="dropdown" class:dropdown-end="{end}" class:dropdown-hover="{hover}">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0">
		<slot name="toggle" />
	</div>

	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="dropdown-content">
		<slot name="content" />
	</div>
</div>
