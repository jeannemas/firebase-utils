<script context="module" lang="ts">
	import Icon from './Icon.svelte';
</script>

<script lang="ts">
</script>

<!-- TODO comment -->

<div class="flex flex-row items-center justify-center gap-2">
	<span class="animate-spin">
		<Icon name="spinner" style="solid" modifiers="{['2xl']}" />
	</span>

	<span class="text-2xl"> Loading... </span>
</div>
