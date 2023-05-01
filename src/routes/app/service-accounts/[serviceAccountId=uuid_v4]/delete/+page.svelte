<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	let modal: Modal;

	onMount(() => queueMicrotask(() => modal.openModal()));

	const { constraints, delayed, enhance, errors, form, submitting } = superForm(data.form, {
		multipleSubmits: 'prevent',
		taintedMessage: null,
	});
</script>

<svelte:head>
	<title>Firebase Utils | Service Accounts | {data.serviceAccount.label}</title>
</svelte:head>

<Modal bind:this="{modal}" on:close="{() => goto(`${$page.url.pathname}/..`)}">
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold truncate">Delete service account</h2>

		<p>Are you sure you want to delete the service account?</p>

		<i class="italic">{data.serviceAccount.label}</i>

		<p class="text-warning">This action cannot be undone.</p>
	</div>

	<svelte:fragment slot="action">
		<button class="btn btn-ghost" on:click="{() => modal.closeModal()}"> Cancel </button>

		<form method="POST" use:enhance>
			<input
				name="id"
				type="hidden"
				data-invalid="{$errors.id}"
				{...$constraints.id}
				bind:value="{$form.id}"
			/>

			<button class="btn btn-error" disabled="{$submitting}" type="submit">
				<span class:hidden="{!$delayed}">
					<Icon modifiers="{['spin', '2xl']}" name="spinner" style="solid" />
				</span>

				<span class:hidden="{$delayed}">Confirm delete</span>
			</button>
		</form>
	</svelte:fragment>
</Modal>
