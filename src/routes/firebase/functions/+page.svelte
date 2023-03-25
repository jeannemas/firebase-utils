<script context="module" lang="ts">
	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<pre class="overflow-scroll"><code>{JSON.stringify(data.functions, null, 2)}</code></pre>
