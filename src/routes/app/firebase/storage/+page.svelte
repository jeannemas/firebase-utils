<script context="module" lang="ts">
	import { derived } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Code from '$components/Code.svelte';
	import { STORAGE_BUCKET_QUERY_PARAM } from '$lib/constants';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	const bucket = derived(
		[page],
		([$page]) => $page.url.searchParams.get(STORAGE_BUCKET_QUERY_PARAM) ?? data.defaultBucket,
	);
</script>

<select
	class="select select-sm select-bordered"
	value="{$bucket}"
	on:change="{({ currentTarget }) => {
		const url = new URL($page.url);

		url.searchParams.set(STORAGE_BUCKET_QUERY_PARAM, currentTarget.value);

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

<Code value="{data.files}" />
