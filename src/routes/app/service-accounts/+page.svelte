<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';

	import { invalidateAll } from '$app/navigation';
	import {
		create,
		del,
		update,
		type CreatePayload,
		type UpdatePayload,
	} from '$client/services/service-account.service';
	import { toastError, toastSuccess } from '$client/utils/toasts';
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

	let toasts: Container;
	let newServiceAccountModal: Modal;

	async function handleCreate(data: CreatePayload) {
		try {
			const { label } = await create(fetch, data);

			newServiceAccountModal.close();

			toasts.push(toastSuccess(`Service account "${label}" uploaded successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	async function handleUpdate(id: ServiceAccount['id'], data: UpdatePayload) {
		try {
			const { label } = await update(fetch, id, data);

			toasts.push(toastSuccess(`Service account "${label}" updated successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	async function handleDelete(id: ServiceAccount['id']) {
		try {
			const { label } = await del(fetch, id);

			toasts.push(toastSuccess(`Service account "${label}" deleted successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	function handleError(error: Error) {
		console.error(error);

		toasts.push(
			toastError(
				'An error occurred while deleting the service account.\nCheck the console for more details.',
			),
		);
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
	<table class="table table-compact w-full shadow-md rounded-md overflow-hidden">
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
				<TableRow
					serviceAccount="{serviceAccount}"
					on:update="{({ detail }) => handleUpdate(serviceAccount.id, detail)}"
					on:delete="{() => handleDelete(serviceAccount.id)}"
				/>
			{/each}
		</tbody>
	</table>
{:else}
	<div class="flex items-center flex-row justify-center">
		<Alert class="alert-warning">You don't have any service account. Start by uploading one!</Alert>
	</div>
{/if}

<Modal bind:this="{newServiceAccountModal}">
	<UploadForm on:submit="{({ detail }) => handleCreate(detail)}" />
</Modal>

<Container bind:this="{toasts}" />
