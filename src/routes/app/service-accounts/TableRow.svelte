<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import { invalidateAll } from '$app/navigation';
	import { del, update } from '$client/services/service-account.service';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';
</script>

<script lang="ts">
	export let serviceAccount: ServiceAccount;

	$: label = field('label', serviceAccount.label, [required()], { checkOnInit: true });

	let editMode = false;
	let deleteModal: Modal;

	function edit() {
		editMode = true;
	}
	async function remove() {
		return await del(fetch, serviceAccount.id).then(() => invalidateAll());
	}
	async function save() {
		if (!$label.valid) {
			return;
		}

		editMode = false;

		return await update(fetch, serviceAccount.id, {
			label: $label.value,
		}).then(() => invalidateAll());
	}
	function cancel() {
		editMode = false;

		label.reset();
	}
</script>

<tr>
	<td>
		<!-- TODO wrap inside a form to add autosubmit -->
		{#if editMode}
			<input class="input input-sm input-bordered w-full" type="text" bind:value="{$label.value}" />
		{:else}
			{serviceAccount.label}
		{/if}
	</td>

	<td class="hidden md:table-cell">
		{new Date(serviceAccount.createdAt).toLocaleString()}
	</td>

	<td class="hidden md:table-cell">
		{new Date(serviceAccount.updatedAt).toLocaleString()}
	</td>

	<td>
		{#if editMode}
			<button class="btn btn-sm" title="Cancel" on:click="{cancel}">
				<span class="hidden md:inline-block"> Cancel </span>

				<Icon class="md:hidden" icon="ban" style="solid" />
			</button>

			<button
				class="btn btn-sm btn-success"
				disabled="{!$label.valid}"
				title="Save"
				on:click="{save}"
			>
				<span class="hidden md:inline-block"> Save </span>

				<Icon class="md:hidden" icon="floppy-disk" style="solid" />
			</button>
		{:else}
			<button class="btn btn-sm btn-info btn-outline" title="Edit" on:click="{edit}">
				<span class="hidden md:inline-block"> Edit </span>

				<Icon class="md:hidden" icon="pen" style="solid" />
			</button>

			<button
				class="btn btn-sm btn-error btn-outline"
				title="Delete"
				on:click="{() => deleteModal.open()}"
			>
				<span class="hidden md:inline-block"> Delete </span>

				<Icon class="md:hidden" icon="trash" style="solid" />
			</button>
		{/if}
	</td>
</tr>

<Modal bind:this="{deleteModal}">
	<h3 class="font-bold text-lg">Delete Service Account</h3>

	<p class="py-2">Are you sure you want to delete the "{serviceAccount.label}" service account?</p>

	<p class="py-2 text-warning">This action cannot be undone.</p>

	<div class="modal-action">
		<button class="btn btn-ghost" on:click="{() => deleteModal.close()}"> Cancel </button>

		<button class="btn btn-error" on:click="{() => remove().then(deleteModal.close)}">
			Delete
		</button>
	</div>
</Modal>
