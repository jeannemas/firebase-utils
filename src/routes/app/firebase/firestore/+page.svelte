<script context="module" lang="ts">
	import { Mode } from 'svelte-jsoneditor';
	import { derived } from 'svelte/store';
	import { z } from 'zod';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Async from '$components/Async.svelte';
	import Code from '$components/Code.svelte';
	import Icon from '$components/Icon.svelte';
	import { FIRESTORE_PATH_DEFAULT_VALUE, FIRESTORE_PATH_QUERY_PARAM } from '$lib/constants';
	import { navigateQueryParams } from '$utils/navigate-query-params';
	import { getSearchParam } from '$utils/search-params-utils';

	import type { PageServerData } from './$types';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data: PageServerData;

	let pathInput: HTMLInputElement;
	let pathIsInEditMode = false;

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
	async function handlePathKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			await navigateQueryParams({ [FIRESTORE_PATH_QUERY_PARAM]: pathInput.value });

			pathIsInEditMode = false;

			invalidateAll();
		}
	}
	function handleTogglePathEditMode() {
		pathIsInEditMode = !pathIsInEditMode;

		if (pathIsInEditMode) {
			requestAnimationFrame(() => pathInput.focus());
		}
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Firestore</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center justify-between gap-2">
		<div
			class="flex flex-row items-center justify-between gap-x-2 grow rounded-box p-2 border border-base-200 h-12 overflow-x-scroll"
		>
			{#if pathIsInEditMode}
				<input
					class="grow input font-mono h-6 pl-2 rounded-box"
					type="text"
					value="{$path}"
					bind:this="{pathInput}"
					on:keydown="{handlePathKeyDown}"
				/>
			{:else}
				<div class="grow breadcrumbs p-0 font-mono">
					<ul class="!min-h-6">
						<li>
							<a href="{getUpdatedPathURL(FIRESTORE_PATH_DEFAULT_VALUE)}">
								<Icon name="house" style="solid" />
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
			{/if}

			<button
				class="swap swap-rotate"
				class:swap-active="{pathIsInEditMode}"
				on:click="{handleTogglePathEditMode}"
			>
				<span class="swap-on duration-100">
					<Icon name="times" style="solid" />
				</span>

				<span class="swap-off duration-100">
					<Icon name="pen" style="solid" />
				</span>
			</button>
		</div>

		<a
			class="btn btn-secondary flex-row gap-2"
			href="/api/v1/firebase/firestore/query?{$page.url.searchParams.toString()}"
			rel="noreferrer"
			target="_blank"
			title="Get data"
		>
			<span class="hidden md:inline-block"> Get data </span>

			<Icon name="file-export" style="solid" />
		</a>
	</div>

	<Async let:awaited="{response}" promise="{data.streamed.response}">
		<div class="flex flex-col rounded-box shadow-lg overflow-hidden border border-base-200">
			{#if response.collections?.length || response.documents?.length}
				<div class="flex flex-col gap-2 m-4">
					{#if response.collections?.length}
						{@const collections = response.collections}

						<h3 class="flex flex-row items-center justify-between">
							<span>Collections</span>

							<span class="select-none">
								{collections.length} collection{collections.length > 1 ? 's' : ''}
							</span>
						</h3>

						<ul class="ml-4">
							{#if $pathParts.length > 0}
								<li>
									<a
										class="link link-hover"
										href="{getUpdatedPathURL($pathParts.slice(0, -1).join('/'))}"
									>
										<Icon name="turn-up" style="solid" />
									</a>
								</li>
							{/if}

							{#each collections as collection}
								<li>
									<a
										class="link link-hover font-mono before:content-['↳_'] after:content-['/']"
										href="{getUpdatedPathURL(collection.path)}"
									>
										{collection.id}
									</a>
								</li>
							{/each}
						</ul>
					{/if}

					{#if response.documents?.length}
						{@const documents = response.documents}

						<h3 class="flex flex-row items-center justify-between">
							<span>Documents</span>

							<span class="select-none">
								{documents.length} document{documents.length > 1 ? 's' : ''}
							</span>
						</h3>

						<ul class="ml-4">
							{#if $pathParts.length > 0}
								<li>
									<a
										class="link link-hover"
										href="{getUpdatedPathURL($pathParts.slice(0, -1).join('/'))}"
									>
										<Icon name="turn-up" style="solid" />
									</a>
								</li>
							{/if}

							{#each documents as document}
								<li>
									<a
										class="link link-hover font-mono before:content-['↳_']"
										href="{getUpdatedPathURL(document.path)}"
									>
										{document.id}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}

			{#if response.document}
				<div class="flex flex-col gap-2 m-4">
					<h3>Fields</h3>

					{#if $pathParts.length > 0}
						<a
							class="ml-4 link link-hover"
							href="{getUpdatedPathURL($pathParts.slice(0, -1).join('/'))}"
						>
							<Icon name="turn-up" style="solid" />
						</a>
					{/if}
				</div>

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
	</Async>
</div>

<!-- TODO remove duplicate "go back" button while we have both a document and sub-collections -->
<!-- TODO handle document not found -->
<!-- TODO add pagination -->
