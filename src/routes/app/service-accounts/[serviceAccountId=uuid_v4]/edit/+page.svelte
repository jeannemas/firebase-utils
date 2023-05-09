<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal.svelte';
	import InputText from '$components/forms/InputText.svelte';

	import type { PageServerData } from './$types';
</script>

<script lang="ts">
	export let data: PageServerData;

	let formElement: HTMLFormElement;
	let modal: Modal;

	onMount(() => queueMicrotask(() => modal.openModal()));

	const form = superForm(data.form, {
		multipleSubmits: 'prevent',
		taintedMessage: null,
	});

	const { delayed, enhance, submitting } = form;
</script>

<svelte:head>
	<title>Firebase Utils | Service Accounts | {data.serviceAccount.label}</title>
</svelte:head>

<Modal bind:this="{modal}" on:close="{() => goto(`${$page.url.pathname}/..`)}">
	<form class="flex flex-col gap-4" method="POST" bind:this="{formElement}" use:enhance>
		<h2 class="text-2xl font-bold truncate">Update service account</h2>

		<InputText field="label" form="{form}" label="Label" />
	</form>

	<svelte:fragment slot="action">
		<button class="btn btn-ghost" on:click="{() => modal.closeModal()}"> Cancel </button>

		<button
			class="btn btn-warning"
			disabled="{$submitting}"
			type="submit"
			on:click|preventDefault="{() => formElement.requestSubmit()}"
		>
			<span class:hidden="{!$delayed}">
				<Icon modifiers="{['spin', '2xl']}" name="spinner" style="solid" />
			</span>

			<span class:hidden="{$delayed}"> Confirm update </span>
		</button>
	</svelte:fragment>
</Modal>
