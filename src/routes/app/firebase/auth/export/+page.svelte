<script context="module" lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import { page } from '$app/stores';
	import { downloadBlob } from '$client/utils/download-blob';
	import Icon from '$components/Icon.svelte';

	import type { ActionData, PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;
	export let form: ActionData;

	const {
		constraints,
		delayed,
		enhance,
		errors,
		form: suprForm,
		submitting,
	} = superForm(data.form, {
		dataType: 'json',
		multipleSubmits: 'prevent',
		taintedMessage: null,
	});

	$: if (form?.exportResult) {
		const { content, contentType, filename } = form.exportResult;

		downloadBlob(new Blob([content], { type: contentType }), filename);
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication | Export users</title>
</svelte:head>

<!-- TOOD comment -->

<form class="flex flex-col gap-4" method="POST" use:enhance>
	<div class="breadcrumbs">
		<ul>
			<li>
				<a href="{$page.url.pathname}/.."> Authentication </a>
			</li>

			<li>Export users</li>
		</ul>
	</div>

	<div class="form-control">
		<label class="label" for="format">
			<span class="label-text">Format</span>
		</label>

		<select
			class="select select-bordered"
			id="format"
			name="format"
			data-invalid="{$errors.format}"
			{...$constraints.format}
			bind:value="{$suprForm.format}"
		>
			<option value="csv"> CSV </option>

			<option value="json"> JSON </option>
		</select>

		{#if $errors.format}
			<ul class="text-error">
				{#each $errors.format as error}
					<li>
						{error}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="grid grid-cols-12 gap-2">
		{#each data.fieldNames as key}
			{@const constraints = $constraints.fields?.[key] ?? {}}
			{@const errors = $errors.fields?.[key] ?? {}}
			{@const include = `fields.${key}.include`}
			{@const name = `fields.${key}.name`}

			<div class="col-span-5 lg:col-span-4">
				<label class="label cursor-pointer justify-start gap-2">
					<input
						class="checkbox"
						id="{include}"
						name="{include}"
						type="checkbox"
						data-invalid="{errors.include}"
						{...constraints.include}
						bind:checked="{$suprForm.fields[key].include}"
					/>

					<span class="label-text">
						{data.fields[key]}
					</span>
				</label>

				{#if errors.include}
					<ul class="text-error">
						{#each errors.include ?? [] as error}
							<li>
								{error}
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="col-span-2 lg:col-span-4">
				<label for="{name}" class="label">
					<span class="label-text">
						<span class="hidden lg:inline-block"> export </span>

						<span> as </span>
					</span>
				</label>
			</div>

			<div class="col-span-5 lg:col-span-4">
				<input
					class="input input-bordered w-full"
					disabled="{!$suprForm.fields[key].include}"
					id="{name}"
					name="{name}"
					type="text"
					data-invalid="{errors.name}"
					{...constraints.name}
					bind:value="{$suprForm.fields[key].name}"
				/>

				{#if errors.name}
					<ul class="text-error">
						{#each errors.name ?? [] as error}
							<li>
								{error}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>

	<button class="btn btn-secondary" disabled="{$submitting}" type="submit">
		<span class:hidden="{!$delayed}">
			<Icon modifiers="{['spin', '2xl']}" name="spinner" style="solid" />
		</span>

		<span class:hidden="{$delayed}">Export</span>
	</button>
</form>
