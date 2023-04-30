<script context="module" lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$components/Modal.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	let modal: Modal;

	onMount(() => queueMicrotask(() => modal.openModal()));
</script>

<svelte:head>
	<title>Firebase Utils | Service Accounts | {data.serviceAccount.label}</title>
</svelte:head>

<Modal bind:this="{modal}" on:close="{() => goto(`${$page.url.pathname}/..`)}">
	<div class="flex flex-col items-center justify-center gap-4">
		<h2 class="text-2xl">{data.serviceAccount.label}</h2>
	</div>
</Modal>
