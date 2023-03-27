<script context="module" lang="ts">
	import { derived } from 'svelte/store';

	import { page } from '$app/stores';
	import Code from '$components/Code.svelte';
	import { FIRESTORE_PATH_DEFAULT_VALUE, FIRESTORE_PATH_QUERY_PARAM } from '$lib/constants';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	const path = derived(
		page,
		({ url }) => url.searchParams.get(FIRESTORE_PATH_QUERY_PARAM) ?? FIRESTORE_PATH_DEFAULT_VALUE,
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

<div class="breadcrumbs my-2">
	<ul>
		<li>
			<a href="{getUpdatedPathURL(FIRESTORE_PATH_DEFAULT_VALUE)}"> Home </a>
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

{#if data.result.collections}
	<ul>
		{#each data.result.collections as collection}
			<li>
				<a class="link link-hover" href="{getUpdatedPathURL(collection.path)}">
					{collection.id}
				</a>
			</li>
		{/each}
	</ul>
{/if}

{#if data.result.documents}
	<ul>
		{#each data.result.documents as document}
			<li>
				<a class="link link-hover" href="{getUpdatedPathURL(document.path)}">
					{document.id}
				</a>
			</li>
		{/each}
	</ul>
{/if}

{#if data.result.document}
	<Code value="{data.result.document}" />
{/if}
