<script context="module" lang="ts">
	import type { Tab } from '$models/Tab';

	import TabComponent from './Tab.svelte';
</script>

<script lang="ts">
	export let tabs: Tab[];
</script>

<div class="tabs tabs-boxed gap-2">
	{#each tabs as tab}
		<svelte:component this="{TabComponent}" tab="{tab}" />
	{/each}
</div>
