<script context="module" lang="ts">
	import Code from '$components/Code.svelte';
	import LoadingMessage from '$components/LoadingMessage.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<!-- TODO complete -->
{#await data.streamed.functions}
	<LoadingMessage />
{:then functions}
	<Code value="{functions.map((func) => func ?? null)}" />
{/await}
