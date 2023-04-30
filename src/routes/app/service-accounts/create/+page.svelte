<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	let modal: Modal;

	onMount(() => queueMicrotask(() => modal.openModal()));

	const { constraints, delayed, enhance, errors, form, submitting } = superForm(data.form, {
		multipleSubmits: 'prevent',
		taintedMessage: null,
	});
</script>

<svelte:head>
	<title>FirebaseUtils | Service accounts | Create</title>
</svelte:head>

<Modal bind:this="{modal}" on:close="{() => goto(`${$page.url.pathname}/..`)}">
	<form class="flex flex-col items-center justify-center gap-4" method="POST" use:enhance>
		<input type="hidden" name="json" bind:value="{$form.json}" />

		<h2 class="text-2xl">Select a service account file to upload</h2>

		<p>Use the Firebase's project settings page to download the service account file.</p>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="jsonProxy">
				<span class="label-text"> Service Account </span>
			</label>

			<input
				accept=".json,application/json"
				class="file-input-bordered file-input-ghost file-input w-full max-w-xs"
				id="jsonProxy"
				type="file"
				data-invalid="{$errors.json}"
				{...$constraints.json}
				on:change="{({ currentTarget }) => {
					const { name = null } = currentTarget.files?.[0] ?? {};

					if (name && !$form.label) {
						$form.label = name;
					}
				}}"
				on:input="{async ({ currentTarget }) => {
					const { files } = currentTarget;

					if (!files) {
						return;
					}

					const file = files.item(0);

					if (!file) {
						return;
					}

					if (file.type !== 'application/json') {
						$errors.json?.push('Invalid file type');

						return;
					}

					$form.json = await file.text();
				}}"
			/>

			{#if $errors.json}
				<ul class="text-error">
					{#each $errors.json as error}
						<li>
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="label">
				<span class="label-text"> Label </span>
			</label>

			<input
				class="input-bordered input w-full max-w-xs"
				id="label"
				name="label"
				placeholder="Ex: My Service Account"
				type="text"
				data-invalid="{$errors.label}"
				{...$constraints.label}
				bind:value="{$form.label}"
			/>

			{#if $errors.label}
				<ul class="text-error">
					{#each $errors.label as error}
						<li>
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<button class="btn-primary btn w-full max-w-xs" disabled="{$submitting}" type="submit">
			<span class:hidden="{!$delayed}">
				<Icon modifiers="{['spin', '2xl']}" name="spinner" style="solid" />
			</span>

			<span class:hidden="{$delayed}">Upload</span>
		</button>
	</form>
</Modal>
