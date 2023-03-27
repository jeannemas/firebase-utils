<script context="module" lang="ts">
	import Code from '$components/Code.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<!-- TODO complete -->

<Code value="{data.functions.map((func) => func ?? null)}" />
