<script lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Toggle from '$lib/components/modals/Toggle.svelte';
	import Container from '$lib/components/toasts/Container.svelte';

	import ServiceAccountUploadForm from './ServiceAccountUploadForm.svelte';

	const serviceAccounts = getContext<Writable<ServiceAccount[]>>('serviceAccounts');

	let modal: Modal;
	let container: Container;
	let selectedServiceAccountId: string | null = null;

	const LOCAL_STORAGE_KEY = 'firebase-utils_selectedServiceAccountId';

	if (browser) {
		selectServiceAccount();
	}

	function selectServiceAccount() {
		const idFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
		const serviceAccountFromLocalStorage = $serviceAccounts.find(
			({ id }) => id.toString() === idFromLocalStorage,
		);

		selectedServiceAccountId =
			(serviceAccountFromLocalStorage?.id ?? $serviceAccounts.find(() => true)?.id)?.toString() ??
			null;

		handleServiceAccountIdSelect(selectedServiceAccountId);
	}
	function handleServiceAccountIdSelect(id: string | null) {
		const url = new URL($page.url);

		if (id) {
			localStorage.setItem(LOCAL_STORAGE_KEY, id);
			url.searchParams.set('serviceAccountId', id);
		} else {
			localStorage.removeItem(LOCAL_STORAGE_KEY);
			url.searchParams.delete('serviceAccountId');
		}

		goto(url);
	}
	function handleUploadSuccess(serviceAccount: ServiceAccount) {
		serviceAccounts.update((serviceAccounts) => [...serviceAccounts, serviceAccount]);

		selectServiceAccount();

		modal.close();

		container.push({
			closable: true,
			style: 'success',
			text: `Service account "${serviceAccount.label}" uploaded successfully.`,
			timeout: 10000,
		});
	}
	function handleUploadError(error: Error) {
		console.error(error);

		container.push({
			closable: true,
			style: 'error',
			text: 'An error occurred while uploading the service account file.\nCheck the console for more details.',
		});
	}
</script>

<div class="mb-4 flex flex-col justify-between gap-4 md:flex-row">
	<select
		class="select-bordered select focus:border-transparent focus:outline-none"
		id="serviceAccount"
		name="serviceAccount"
		placeholder="Select a service account"
		bind:value="{selectedServiceAccountId}"
		on:change="{(event) => handleServiceAccountIdSelect(event.currentTarget.value)}"
	>
		<option
			disabled
			value="{null}"
		>
			Select a service account
		</option>

		{#each $serviceAccounts as serviceAccount}
			<option value="{serviceAccount.id.toString()}">
				{serviceAccount.label}
			</option>
		{/each}
	</select>

	<Toggle
		className="btn-outline btn-primary btn"
		id="uploadServiceAccountModal"
	>
		Upload a service account
	</Toggle>
</div>

<Modal
	id="uploadServiceAccountModal"
	bind:this="{modal}"
>
	<ServiceAccountUploadForm
		on:error="{(event) => handleUploadError(event.detail)}"
		on:uploaded="{(event) => handleUploadSuccess(event.detail)}"
	/>
</Modal>

<Container bind:this="{container}" />
