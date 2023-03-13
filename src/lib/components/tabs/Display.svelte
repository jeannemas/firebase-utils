<script lang="ts">
	import { page } from '$app/stores';
	import type { Tab } from '$lib/models/Tab';

	export let tab: Tab;
</script>

{#if $page.url.hash === tab.hash}
	<slot />
{/if}
