<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Modal from '$lib/components/modals/Modal.svelte';
	import Toggle from '$lib/components/modals/Toggle.svelte';
	import Container from '$lib/components/toasts/Container.svelte';

	import ServiceAccountUploadForm from './ServiceAccountUploadForm.svelte';
</script>

<script lang="ts">
	const serviceAccounts = getContext<Writable<ServiceAccount[]>>('serviceAccounts');

	let modal: Modal;
	let container: Container;

	function handleUploadSuccess(serviceAccount: ServiceAccount) {
		serviceAccounts.update((serviceAccounts) => [...serviceAccounts, serviceAccount]);

		modal.close();

		container.push({
			dismissible: true,
			style: 'success',
			text: `Service account "${serviceAccount.label}" uploaded successfully.`,
			timeout: 10000,
		});
	}
	function handleUploadError(error: Error) {
		console.error(error);

		container.push({
			dismissible: true,
			style: 'error',
			text: 'An error occurred while uploading the service account file.\nCheck the console for more details.',
		});
	}
</script>

<div class="mb-4 flex flex-col justify-between gap-4 lg:flex-row">
	<Toggle class="btn-outline btn-primary btn" id="uploadServiceAccountModal">
		Upload a service account
	</Toggle>
</div>

<Modal id="uploadServiceAccountModal" bind:this="{modal}">
	<ServiceAccountUploadForm
		on:error="{(event) => handleUploadError(event.detail)}"
		on:uploaded="{(event) => handleUploadSuccess(event.detail)}"
	/>
</Modal>

<Container bind:this="{container}" />
