<script context="module" lang="ts">
	import { Mode } from 'svelte-jsoneditor';
	import { derived } from 'svelte/store';
	import { z } from 'zod';

	import { page } from '$app/stores';
	import Code from '$components/Code.svelte';
	import Icon from '$components/Icon.svelte';
	import LoadingMessage from '$components/LoadingMessage.svelte';
	import { FIRESTORE_PATH_DEFAULT_VALUE, FIRESTORE_PATH_QUERY_PARAM } from '$lib/constants';
	import { getSearchParam } from '$utils/search-params-utils';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	const path = derived(page, ({ url }) =>
		getSearchParam(
			url.searchParams,
			FIRESTORE_PATH_QUERY_PARAM,
			z.string(),
			FIRESTORE_PATH_DEFAULT_VALUE,
		),
	);
	const pathParts = derived(path, ($path) => $path.split('/').filter(Boolean));

	function getUpdatedPathURL(path: string) {
		const url = new URL($page.url);

		url.searchParams.set(FIRESTORE_PATH_QUERY_PARAM, path);

		return url.toString();
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Firestore</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center justify-between gap-2">
		<div class="grow breadcrumbs rounded-box p-2 border border-base-200">
			<ul class="!min-h-6">
				<li>
					<a href="{getUpdatedPathURL(FIRESTORE_PATH_DEFAULT_VALUE)}">
						<Icon icon="house" style="solid" />
					</a>
				</li>

				{#each $pathParts as part, index (index)}
					<li>
						<a href="{getUpdatedPathURL($pathParts.slice(0, index + 1).join('/'))}">
							{part}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<a
			class="btn btn-sm btn-secondary flex-row gap-2"
			href="/api/v1/firebase/firestore/query?{$page.url.searchParams.toString()}"
			rel="noreferrer"
			target="_blank"
			title="Get data"
		>
			<span class="hidden md:inline-block"> Get data </span>

			<Icon icon="file-export" style="solid" />
		</a>
	</div>

	{#await data.streamed.response}
		<LoadingMessage />
	{:then response}
		<div class="flex flex-col rounded-box shadow-lg overflow-hidden border border-base-200">
			<div class="flex flex-col gap-4 m-4">
				{#if response.collections}
					<ul>
						{#if $pathParts.length > 0}
							<li>
								<a
									class="link link-hover"
									href="{getUpdatedPathURL($pathParts.slice(0, -1).join('/'))}"
								>
									<Icon icon="turn-up" style="solid" />
								</a>
							</li>
						{/if}

						{#each response.collections as collection}
							<li>
								<a
									class="link link-hover after:content-['/']"
									href="{getUpdatedPathURL(collection.path)}"
								>
									{collection.id}
								</a>
							</li>
						{/each}
					</ul>
				{/if}

				{#if response.documents}
					<ul>
						{#if $pathParts.length > 0}
							<li>
								<a
									class="link link-hover"
									href="{getUpdatedPathURL($pathParts.slice(0, -1).join('/'))}"
								>
									<Icon icon="turn-up" style="solid" />
								</a>
							</li>
						{/if}

						{#each response.documents as document}
							<li>
								<a class="link link-hover" href="{getUpdatedPathURL(document.path)}">
									{document.id}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			{#if response.document}
				<Code
					config="{{
						mainMenuBar: false,
						mode: Mode.tree,
						readOnly: true,
						statusBar: false,
					}}"
					value="{response.document}"
				/>
			{/if}
		</div>
	{/await}
</div>

<!-- TODO add pagination -->
