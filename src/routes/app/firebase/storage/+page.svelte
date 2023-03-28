<script context="module" lang="ts">
	import { z } from 'zod';

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingMessage from '$components/LoadingMessage.svelte';
	import { STORAGE_BUCKET_QUERY_PARAM, STORAGE_FILE_PATH_QUERY_PARAM } from '$lib/constants';
	import { getSearchParam } from '$utils/search-params-utils';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	function handleBucketChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const url = new URL($page.url);

		url.searchParams.set(STORAGE_BUCKET_QUERY_PARAM, event.currentTarget.value);

		goto(url, { invalidateAll: true });
	}
	function getFileURL(path: string) {
		const url = new URL($page.url);

		url.searchParams.set(STORAGE_FILE_PATH_QUERY_PARAM, path);

		return url.toString();
	}
</script>

<div class="flex flex-col gap-4">
	{#await Promise.all([data.streamed.buckets, data.streamed.defaultBucket])}
		<LoadingMessage />
	{:then [buckets, defaultBucket]}
		{@const bucket = getSearchParam(
			$page.url.searchParams,
			STORAGE_BUCKET_QUERY_PARAM,
			z.string().nonempty(),
			defaultBucket,
		)}
		<div class="form-control">
			<label for="bucket" class="label"> Bucket </label>

			<select
				class="select select-sm select-bordered w-full"
				id="bucket"
				value="{bucket}"
				on:change="{handleBucketChange}"
			>
				<option disabled value="{null}"> Select a bucket </option>

				{#each buckets as bucket}
					<option value="{bucket}">{bucket}</option>
				{/each}
			</select>
		</div>
	{/await}

	{#await Promise.all([data.streamed.files, data.streamed.signedUrl, data.streamed.fileMetadata])}
		<LoadingMessage />
	{:then [files, signedUrl, fileMetadata]}
		{#if $page.url.searchParams.has(STORAGE_FILE_PATH_QUERY_PARAM)}
			<pre><code>{JSON.stringify({ signedUrl, fileMetadata }, null, 2)}</code></pre>
		{:else}
			<ul>
				{#each files as file}
					<li>
						<a
							class="link link-hover font-mono"
							href="{getFileURL(file)}"
							on:click="{() => invalidateAll()}"
						>
							{file}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{/await}

	<!-- TODO add pagination -->
</div>
