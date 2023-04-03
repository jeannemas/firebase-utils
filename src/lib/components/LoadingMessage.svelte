<script context="module" lang="ts">
	import Icon from './Icon.svelte';
</script>

<script lang="ts">
</script>

<!-- TODO comment -->

<div class="flex flex-row items-center justify-center gap-2">
	<Icon class="animate-spin" icon="spinner" modifiers="{['2xl']}" style="solid" />

	<span class="text-2xl"> Loading... </span>
</div>
