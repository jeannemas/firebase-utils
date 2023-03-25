<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import { create } from '$client/services/service-account.service';
</script>

<script lang="ts">
	const dispatch = createEventDispatcher<{
		uploaded: ServiceAccount;
		error: Error;
	}>();
	const filelist = field<FileList | null>('filelist', null, [required()], {
		checkOnInit: true,
	});
	const label = field<string>('label', '', [required()], {
		checkOnInit: true,
	});
	const serviceAccountForm = form(filelist, label);

	async function handleSubmit() {
		if (!$serviceAccountForm.valid) {
			return;
		}

		try {
			const serviceAccount = await create(fetch, {
				json: await $filelist.value![0].text(),
				label: $label.value,
			});

			dispatch('uploaded', serviceAccount);
		} catch (error) {
			console.error(error);

			dispatch('error', error as Error);
		}
	}
</script>

<form
	class="prose flex flex-col items-center justify-center gap-4"
	method="post"
	on:submit|preventDefault="{handleSubmit}"
>
	<h3>Select a service account file to upload</h3>

	<p>Use the Firebase's project settings page to download the service account file.</p>

	<div class="form-control w-full max-w-xs">
		<label class="label" for="filelist">
			<span class="label-text"> Service Account </span>
		</label>

		<input
			accept=".json,application/json"
			class="file-input-bordered file-input-ghost file-input w-full max-w-xs"
			id="filelist"
			name="filelist"
			type="file"
			bind:files="{$filelist.value}"
			on:change="{({ currentTarget }) => {
				const { name = null } = currentTarget.files?.[0] ?? {};

				if (name && !$label.value) {
					$label.value = name;
				}
			}}"
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<label class="label" for="label">
			<span class="label-text"> Service Account label </span>
		</label>

		<input
			class="input-bordered input w-full max-w-xs"
			id="label"
			name="label"
			type="text"
			bind:value="{$label.value}"
		/>
	</div>

	<button
		class="btn-primary btn w-full max-w-xs"
		disabled="{!$serviceAccountForm.valid}"
		type="submit"
	>
		Upload
	</button>
</form>
