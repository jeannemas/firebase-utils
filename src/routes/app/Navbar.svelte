<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { serialize } from 'cookie';

	import { invalidateAll } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import Navbar from '$components/Navbar.svelte';
	import NavbarLink from '$components/NavbarLink.svelte';
	import { SERVICE_ACCOUNT_ID_COOKIE } from '$lib/constants';
</script>

<script lang="ts">
	export let availableServiceAccounts: Pick<ServiceAccount, 'id' | 'label'>[];
	export let selectedServiceAccountId: string | null;

	async function handleServiceAccountIdSelect(id: string | null) {
		const yearInMs = 1000 * 60 * 60 * 24 * 365;
		const cookie = serialize(SERVICE_ACCOUNT_ID_COOKIE, id ?? '', {
			path: '/',
			expires: new Date(id ? Date.now() + yearInMs : 0),
			maxAge: id ? yearInMs : 0,
		});

		document.cookie = cookie;

		await invalidateAll();
	}
</script>

<Navbar root="/app">
	<svelte:fragment slot="left">
		{#if availableServiceAccounts.length > 0}
			<div class="flex items-center p-2 pt-0 lg:p-0">
				<select
					class="select select-sm lg:select-md w-full lg:max-w-[16rem] focus:border-transparent focus:outline-none"
					id="serviceAccount"
					name="serviceAccount"
					placeholder="Select a service account"
					bind:value="{selectedServiceAccountId}"
					on:change="{(event) => handleServiceAccountIdSelect(event.currentTarget.value)}"
				>
					<option disabled value="{null}"> Select a service account </option>

					{#each availableServiceAccounts as serviceAccount}
						<option value="{serviceAccount.id}">
							{serviceAccount.label}
						</option>
					{/each}
				</select>
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="right">
		<li>
			<NavbarLink href="/app/service-accounts">Service Accounts</NavbarLink>
		</li>

		{#if selectedServiceAccountId}
			<li>
				<NavbarLink href="/app/firebase/auth">Authentication</NavbarLink>
			</li>

			<li>
				<NavbarLink href="/app/firebase/firestore">Firestore</NavbarLink>
			</li>

			<li>
				<NavbarLink href="/app/firebase/storage">Storage</NavbarLink>
			</li>

			<li>
				<NavbarLink href="/app/firebase/functions">Functions</NavbarLink>
			</li>
		{/if}

		<li>
			<NavbarLink href="/docs" title="Go to documentation">
				<span> Documentation </span>

				<Icon icon="book" style="solid" />
			</NavbarLink>
		</li>
	</svelte:fragment>
</Navbar>
