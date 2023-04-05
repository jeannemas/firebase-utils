<script context="module" lang="ts">
	import { page } from '$app/stores';
	import LoadingMessage from '$components/LoadingMessage.svelte';
	import { getPaginationParams } from '$utils/pagination';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import UserCard from './UserCard.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data;

	$: ({ resultsPerPage, search } = getPaginationParams($page.url.searchParams));
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<Header search="{search}" />

	{#await data.streamed.response}
		<LoadingMessage />
	{:then response}
		<div class="flex flex-col gap-y-2">
			{#each response.results as result}
				<UserCard record="{result}" />
			{/each}
		</div>

		<Footer pagination="{response}" resultsPerPage="{resultsPerPage}" />
	{/await}
</div>

<!-- TODO investigate this page randomly crashing, maybe because it runs out of memory because of all the JSONEditors? -->
