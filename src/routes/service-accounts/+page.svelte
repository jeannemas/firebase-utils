<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';

	import { invalidateAll } from '$app/navigation';
	import Modal from '$components/Modal.svelte';
	import Container from '$components/toasts/Container.svelte';

	import type { PageServerData } from './$types';
	import TableRow from './TableRow.svelte';
	import UploadForm from './UploadForm.svelte';
</script>

<script lang="ts">
	export let data: PageServerData;

	let container: Container;
	let modal: Modal;

	function handleUploadSuccess({ label }: ServiceAccount) {
		modal.close();

		container.push({
			dismissible: true,
			style: 'success',
			text: `Service account "${label}" uploaded successfully.`,
			timeout: 10000,
		});

		invalidateAll();
	}
	function handleUploadError() {
		container.push({
			dismissible: true,
			style: 'error',
			text: `
				An error occurred while uploading the service account file.
				Check the console for more details.
			`.trim(),
		});
	}
</script>

<div class="flex flex-col md:flex-row items-center justify-between my-4">
	<h1 class="font-bold text-2xl">Service Accounts</h1>

	<button class="btn-outline btn-primary btn" on:click="{() => modal.open()}">
		Upload a service account
	</button>
</div>

<table class="table table-compact w-full">
	<thead>
		<tr>
			<th>Label</th>

			<th class="hidden md:table-cell">Created</th>

			<th class="hidden md:table-cell">Updated</th>

			<th>Actions</th>
		</tr>
	</thead>

	<tbody>
		{#each data.serviceAccounts as serviceAccount}
			<TableRow serviceAccount="{serviceAccount}" />
		{/each}
	</tbody>
</table>

<Modal bind:this="{modal}">
	<UploadForm
		on:error="{handleUploadError}"
		on:uploaded="{(event) => handleUploadSuccess(event.detail)}"
	/>
</Modal>

<Container bind:this="{container}" />
