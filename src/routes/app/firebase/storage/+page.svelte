<script context="module" lang="ts">
	import { derived } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	const bucket = derived([page], ([$page]) => $page.url.searchParams.get('bucket'));
</script>

<select
	class="select select-bordered"
	value="{$bucket ?? data.defaultBucket}"
	on:change="{({ currentTarget }) => {
		const url = new URL($page.url);

		url.searchParams.set('bucket', currentTarget.value);

		goto(url);
	}}"
>
	<option disabled value="{null}"> Select a bucket </option>

	{#each data.buckets as bucket}
		<option value="{bucket}">{bucket}</option>
	{/each}
</select>

<!-- TODO add pagination -->
<!-- TODO complete -->

<pre class="overflow-scroll"><code>{JSON.stringify(data.files, null, 2)}</code></pre>
