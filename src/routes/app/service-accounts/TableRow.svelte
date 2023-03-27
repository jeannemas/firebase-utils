<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import type { UpdatePayload } from '$client/services/service-account.service';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';

	export type EventMap = {
		update: [id: ServiceAccount['id'], data: UpdatePayload];
		delete: ServiceAccount['id'];
	};
</script>

<script lang="ts">
	export let serviceAccount: ServiceAccount;

	const dispatch = createEventDispatcher<EventMap>();

	$: label = field('label', serviceAccount.label, [required()], { checkOnInit: true });

	let editMode = false;
	let deleteModal: Modal;
	let labelInput: HTMLInputElement;

	function edit() {
		editMode = true;

		requestAnimationFrame(() => labelInput.focus());
	}
	function del() {
		dispatch('delete', serviceAccount.id);

		deleteModal.close();
	}
	function update() {
		if (!$label.valid) {
			return;
		}

		editMode = false;

		dispatch('update', [serviceAccount.id, { label: $label.value }]);
	}
	function cancel() {
		editMode = false;

		label.reset();
	}
</script>

<tr>
	<td>
		<input
			class="input input-sm input-bordered w-full max-w-full"
			class:hidden="{!editMode}"
			type="text"
			bind:this="{labelInput}"
			bind:value="{$label.value}"
			on:keydown="{({ key }) => {
				if (key === 'Enter') {
					update();
				} else if (key === 'Escape') {
					cancel();
				}
			}}"
		/>

		<span class="px-3" class:hidden="{editMode}">
			{serviceAccount.label}
		</span>
	</td>

	<td class="overflow-scroll hidden md:table-cell">
		{new Date(serviceAccount.createdAt).toLocaleString()}
	</td>

	<td class="overflow-scroll hidden md:table-cell">
		{new Date(serviceAccount.updatedAt).toLocaleString()}
	</td>

	<td>
		{#if editMode}
			<button class="btn btn-sm btn-info btn-outline" title="Cancel" on:click="{cancel}">
				<span class="hidden md:inline-block"> Cancel </span>

				<Icon class="md:hidden" icon="ban" style="solid" />
			</button>

			<button
				class="btn btn-sm btn-success btn-outline"
				disabled="{!$label.valid}"
				title="Save"
				on:click="{update}"
			>
				<span class="hidden md:inline-block"> Save </span>

				<Icon class="md:hidden" icon="floppy-disk" style="solid" />
			</button>
		{:else}
			<button class="btn btn-sm btn-warning btn-outline" title="Edit" on:click="{edit}">
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

		<button class="btn btn-error" on:click="{del}"> Delete </button>
	</div>
</Modal>
