<script context="module" lang="ts">
	import { Mode } from 'svelte-jsoneditor';

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
	<Code
		config="{{
			mainMenuBar: false,
			mode: Mode.tree,
			navigationBar: false,
			readOnly: true,
			statusBar: false,
		}}"
		value="{functions.map((func) => func ?? null)}"
	/>
{/await}
