<script context="module" lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { create, del, update } from '$client/services/service-account.service';
	import { push } from '$client/stores/toasts';
	import { toastError, toastSuccess } from '$client/utils/toasts';
	import Alert from '$components/Alert.svelte';
	import Icon from '$components/Icon.svelte';
	import LoadingMessage from '$components/LoadingMessage.svelte';
	import Modal from '$components/Modal.svelte';

	import type { PageServerData } from './$types';
	import TableRow, { type EventMap as TableRowEventMap } from './TableRow.svelte';
	import UploadForm, { type EventMap as UploadFormEventMap } from './UploadForm.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data: PageServerData;

	let newServiceAccountModal: Modal;

	async function handleCreate(event: CustomEvent<UploadFormEventMap['submit']>) {
		try {
			const { label } = await create(fetch, event.detail);

			newServiceAccountModal.close();

			push(toastSuccess(`Service account "${label}" uploaded successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	async function handleUpdate(event: CustomEvent<TableRowEventMap['update']>) {
		try {
			const [id, data] = event.detail;
			const { label } = await update(fetch, id, data);

			push(toastSuccess(`Service account "${label}" updated successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	async function handleDelete(event: CustomEvent<TableRowEventMap['delete']>) {
		try {
			const { label } = await del(fetch, event.detail);

			push(toastSuccess(`Service account "${label}" deleted successfully.`));

			invalidateAll();
		} catch (error) {
			handleError(error as Error);
		}
	}
	function handleError(error: Error) {
		console.error(error);

		push(
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
		class="btn btn-secondary"
		title="Upload a service account"
		on:click="{() => newServiceAccountModal.open()}"
	>
		<span class="hidden md:inline-block">Upload a service account</span>

		<span class="md:hidden">
			<Icon name="plus" style="solid" />
		</span>
	</button>
</div>

{#await data.streamed.serviceAccounts}
	<LoadingMessage />
{:then serviceAccounts}
	{#if serviceAccounts.length}
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
				{#each serviceAccounts as serviceAccount}
					<TableRow
						serviceAccount="{serviceAccount}"
						on:update="{handleUpdate}"
						on:delete="{handleDelete}"
					/>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="flex items-center flex-row justify-center">
			<Alert class="alert-warning">
				You don't have any service account. Start by uploading one!
			</Alert>
		</div>
	{/if}
{/await}

<Modal bind:this="{newServiceAccountModal}">
	<UploadForm on:submit="{handleCreate}" />
</Modal>
