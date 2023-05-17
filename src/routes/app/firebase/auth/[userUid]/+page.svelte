<script context="module" lang="ts">
	import Async from '$components/Async.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<!-- TODO comment -->

<Async let:awaited="{userRecord}" promise="{data.streamed.user}">
	<pre><code>{JSON.stringify(userRecord, null, 2)}</code></pre>
</Async>
