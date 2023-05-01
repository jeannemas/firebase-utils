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
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold">{data.serviceAccount.label}</h2>

		<div class="grid grid-cols-2 gap-2">
			<div class="form-control w-full">
				<label class="label" for="">
					<span class="label-text">Created at</span>
				</label>

				<div class="flex flex-col md:flex-row gap-x-1">
					<span>
						{new Date(data.serviceAccount.createdAt).toLocaleDateString()}
					</span>

					<span>
						{new Date(data.serviceAccount.createdAt).toLocaleTimeString()}
					</span>
				</div>
			</div>

			<div class="form-control w-full">
				<label class="label" for="">
					<span class="label-text">Updated at</span>
				</label>

				<div class="flex flex-col md:flex-row gap-x-1">
					<span>
						{new Date(data.serviceAccount.updatedAt).toLocaleDateString()}
					</span>

					<span>
						{new Date(data.serviceAccount.updatedAt).toLocaleTimeString()}
					</span>
				</div>
			</div>
		</div>
	</div>

	<svelte:fragment slot="action">
		<a href="{$page.url.pathname}/edit">
			<button class="btn btn-warning"> Edit </button>
		</a>

		<a href="{$page.url.pathname}/delete">
			<button class="btn btn-error"> Delete </button>
		</a>
	</svelte:fragment>
</Modal>
