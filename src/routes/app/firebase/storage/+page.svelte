<script context="module" lang="ts">
	import { Mode } from 'svelte-jsoneditor';
	import { z } from 'zod';

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Async from '$components/Async.svelte';
	import Code from '$components/Code.svelte';
	import Icon from '$components/Icon.svelte';
	import { STORAGE_BUCKET_QUERY_PARAM, STORAGE_FILE_PATH_QUERY_PARAM } from '$lib/constants';
	import { getSearchParam } from '$utils/search-params-utils';

	import type { PageServerData } from './$types';
</script>

<!-- TODO comment -->
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

<!-- TODO fix page not working -->

<div class="flex flex-col gap-4">
	<Async
		let:awaited="{[buckets, defaultBucket]}"
		promise="{Promise.all([data.streamed.buckets, data.streamed.defaultBucket])}"
	>
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
	</Async>

	<Async
		let:awaited="{[files, signedUrl, fileMetadata]}"
		promise="{Promise.all([
			data.streamed.files,
			data.streamed.signedUrl,
			data.streamed.fileMetadata,
		])}"
	>
		{#if $page.url.searchParams.has(STORAGE_FILE_PATH_QUERY_PARAM)}
			<div class="rounded-box p-2 border border-base-200 before:content-['/']">
				{$page.url.searchParams.get(STORAGE_FILE_PATH_QUERY_PARAM)}
			</div>

			<div class="flex items-center justify-center">
				<a class="btn btn-sm btn-primary gap-2" href="{signedUrl}" rel="noreferrer" target="_blank">
					<span> Open externally </span>

					<Icon name="arrow-up-right-from-square" style="solid" modifiers="{['xl']}" />
				</a>
			</div>

			<Code
				config="{{
					mainMenuBar: false,
					mode: Mode.tree,
					readOnly: true,
					statusBar: false,
				}}"
				value="{fileMetadata}"
			/>
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
	</Async>

	<!-- TODO add pagination -->
</div>
