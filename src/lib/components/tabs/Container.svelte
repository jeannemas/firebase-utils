<script lang="ts">
	import type { Tab } from '$lib/models/Tab';

	import TabComponent from './Tab.svelte';

	export let tabs: Tab[];
</script>

<div class="tabs tabs-boxed gap-2">
	{#each tabs as tab}
		<svelte:component
			this="{TabComponent}"
			tab="{tab}"
		/>
	{/each}
</div>
