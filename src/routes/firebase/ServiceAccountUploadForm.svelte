<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import type { POSTPayload } from '$routes/api/v1/firebase/service-accounts/+server';
	import type { JSONTypedResponse } from '$utils/typed-http';
</script>

<script lang="ts">
	const dispatch = createEventDispatcher();
	const filelist = field<FileList | null>('serviceAccountFile', null, [required()], {
		checkOnInit: true,
	});
	const label = field<string>('serviceAccountLabel', '', [required()], {
		checkOnInit: true,
	});
	const serviceAccountForm = form(filelist, label);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!$serviceAccountForm.valid) {
			return;
		}

		try {
			const serviceAccount = await fetch<JSONTypedResponse<ServiceAccount>>(
				'/api/v1/firebase/service-accounts',
				{
					body: JSON.stringify({
						json: await $filelist.value![0].text(),
						label: $label.value,
					} satisfies POSTPayload),
					method: 'POST',
				},
			).then((response) => response.json());

			dispatch('uploaded', serviceAccount);
		} catch (error) {
			dispatch('error', error);
		}
	}
</script>

<form
	class="prose flex flex-col items-center justify-center gap-4"
	method="post"
	on:submit="{handleSubmit}"
>
	<h3>Select a service account file to upload</h3>

	<p>Use the Firebase's project settings page to download the service account file.</p>

	<div class="form-control w-full max-w-xs">
		<label class="label" for="serviceAccountFile">
			<span class="label-text"> Service Account </span>
		</label>

		<input
			accept=".json,application/json"
			class="file-input-bordered file-input-ghost file-input w-full max-w-xs"
			id="serviceAccountFile"
			name="serviceAccountFile"
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
		<label class="label" for="serviceAccountLabel">
			<span class="label-text"> Service Account label </span>
		</label>

		<input
			class="input-bordered input w-full max-w-xs"
			id="serviceAccountLabel"
			name="serviceAccountLabel"
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
