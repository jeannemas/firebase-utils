<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Async from '$components/Async.svelte';
	import { getPaginationParams } from '$utils/pagination';

	import type { PageServerData } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import UserCard from './UserCard.svelte';
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
				<UserCard record="{result}" />
			{/each}
		</div>

		<Footer pagination="{response}" resultsPerPage="{resultsPerPage}" />
	</Async>
</div>

<!-- TODO fix broken search -->

<!-- TODO investigate this page randomly crashing, maybe because it runs out of memory because of all the JSONEditors? -->
