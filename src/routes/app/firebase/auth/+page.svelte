<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { tooltip } from '$client/actions/tooltip.action';
	import Async from '$components/Async.svelte';
	import Icon from '$components/Icon.svelte';
	import { getPaginationParams } from '$utils/pagination';

	import type { PageServerData } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data: PageServerData;

	$: ({ resultsPerPage, search } = getPaginationParams($page.url.searchParams));
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<Header search="{search}" />

	<Async let:awaited="{response}" promise="{data.streamed.response}">
		<div class="flex flex-col gap-y-2">
			{#each response.results as result}
				<!-- <UserCard record="{result}" /> -->

				<div class="btn-group btn-group-horizontal shadow rounded-box">
					<a
						class="btn btn-ghost flex grow flex-row gap-2 items-center justify-between normal-case font-normal hover:btn-active hover:scale-100 transition-colors"
						href="{$page.url.pathname}/{result.uid}"
					>
						<span>
							{result.email}
						</span>

						<code class="hidden md:block">
							{result.uid}
						</code>
					</a>

					<button
						class="btn btn-ghost hover:btn-active hidden md:flex transition-colors hover:scale-100"
						use:tooltip="{'bottom'}"
						data-tooltip="Copy UID"
					>
						<Icon name="clipboard" style="solid" />
					</button>

					<button class="btn btn-ghost hover:btn-active hidden md:flex transition-colors hover:scale-100">
						<Icon name="ellipsis-vertical" style="solid" />
					</button>
				</div>

				<!-- <div
					class="rounded-box border border-base-200 shadow dark:bg-base-200 flex flex-row items-center justify-between p-4 transition-all hover:bg-primary hover:text-primary-content cursor-pointer"
				>
					<div class="cursor-text text-sm md:text-base">
						{result.email}
					</div>

					<code class="cursor-text hidden md:block">
						{result.uid}
					</code>
				</div> -->
			{/each}
		</div>

		<Footer pagination="{response}" resultsPerPage="{resultsPerPage}" />
	</Async>
</div>

<!-- TODO fix broken search -->

<!-- TODO investigate this page randomly crashing, maybe because it runs out of memory because of all the JSONEditors? -->
