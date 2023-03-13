<script lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

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
			const serviceAccount = await fetch('/api/v1/firebase/service-accounts', {
				method: 'POST',
				body: JSON.stringify({
					json: await $filelist.value![0].text(),
					label: $label.value,
				} satisfies Pick<ServiceAccount, 'json' | 'label'>),
			}).then((response) => response.json() as Promise<ServiceAccount>);

			dispatch('uploaded', serviceAccount);
		} catch (error) {
			dispatch('error', error);
		}
	}
</script>

<form
	method="post"
	class="prose flex flex-col items-center justify-center gap-4"
	on:submit="{handleSubmit}"
>
	<h3>Select a service account file to upload</h3>

	<p>Use the Firebase's project settings page to download the service account file.</p>

	<div class="form-control w-full max-w-xs">
		<label
			class="label"
			for="serviceAccountFile"
		>
			<span class="label-text">Service Account</span>
		</label>

		<input
			accept=".json,application/json"
			type="file"
			id="serviceAccountFile"
			name="serviceAccountFile"
			class="file-input-bordered file-input-ghost file-input w-full max-w-xs"
			bind:files="{$filelist.value}"
			on:change="{(event) => {
				const { name = null } = event.currentTarget.files?.[0] ?? {};

				if (name && !$label.value) {
					$label.value = name;
				}
			}}"
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<label
			class="label"
			for="serviceAccountLabel"
		>
			<span class="label-text">Service Account label</span>
		</label>

		<input
			type="text"
			id="serviceAccountLabel"
			name="serviceAccountLabel"
			class="input-bordered input w-full max-w-xs"
			bind:value="{$label.value}"
		/>
	</div>

	<button
		class="btn-primary btn w-full max-w-xs"
		type="submit"
		disabled="{!$serviceAccountForm.valid}"
	>
		Upload
	</button>
</form>
