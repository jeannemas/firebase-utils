<script context="module" lang="ts">
	import { Mode } from 'svelte-jsoneditor';

	import Async from '$components/Async.svelte';
	import Code from '$components/Code.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<!-- TODO complete -->
<!-- TODO comment -->
<Async let:awaited="{functions}" promise="{data.streamed.functions}">
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
</Async>
