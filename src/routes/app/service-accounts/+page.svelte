<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';

	import { invalidateAll } from '$app/navigation';
	import Alert from '$components/Alert.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';
	import Container from '$components/toasts/Container.svelte';

	import type { PageServerData } from './$types';
	import TableRow from './TableRow.svelte';
	import UploadForm from './UploadForm.svelte';
</script>

<script lang="ts">
	export let data: PageServerData;

	let container: Container;
	let newServiceAccountModal: Modal;

	function handleUploadSuccess({ label }: ServiceAccount) {
		newServiceAccountModal.close();

		container.push({
			class: 'alert-success',
			dismissible: true,
			text: `Service account "${label}" uploaded successfully.`,
			timeout: 10000,
		});

		invalidateAll();
	}
	function handleUploadError() {
		container.push({
			class: 'alert-error',
			dismissible: true,
			text: `
				An error occurred while uploading the service account file.
				Check the console for more details.
			`.trim(),
		});
	}
</script>

<svelte:head>
	<title>Firebase Utils | Service Accounts</title>
</svelte:head>

<div class="flex flex-row items-center justify-between my-4">
	<h1 class="font-bold text-xl">Service Accounts</h1>

	<button
		class="btn-outline btn-primary btn btn-sm"
		title="Upload a service account"
		on:click="{() => newServiceAccountModal.open()}"
	>
		<span class="hidden md:inline-block">Upload a service account</span>

		<Icon class="md:hidden" icon="plus" style="solid" />
	</button>
</div>

{#if data.serviceAccounts.length}
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th class="w-2/3 md:w-1/4">Label</th>

				<th class="hidden md:table-cell md:w-1/4">Created</th>

				<th class="hidden md:table-cell md:w-1/4">Updated</th>

				<th class="w-1/3 md:w-1/4">Actions</th>
			</tr>
		</thead>

		<tbody>
			{#each data.serviceAccounts as serviceAccount}
				<TableRow serviceAccount="{serviceAccount}" />
			{/each}
		</tbody>
	</table>
{:else}
	<div class="flex items-center flex-row justify-center">
		<Alert class="alert-warning">You don't have any service account. Start by uploading one!</Alert>
	</div>
{/if}

<Modal bind:this="{newServiceAccountModal}">
	<UploadForm
		on:error="{handleUploadError}"
		on:uploaded="{(event) => handleUploadSuccess(event.detail)}"
	/>
</Modal>

<Container bind:this="{container}" />
