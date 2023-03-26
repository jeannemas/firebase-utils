<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { serialize } from 'cookie';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
</script>

<script lang="ts">
	const serviceAccounts = getContext<Writable<ServiceAccount[]>>('serviceAccounts');
	const selectedServiceAccountId = getContext<Writable<string | null>>('selectedServiceAccountId');
	const links = [
		{
			pathname: '/service-accounts',
			label: 'Service Accounts',
		},
		{
			pathname: '/firebase/auth',
			label: 'Authentication',
		},
		{
			pathname: '/firebase/firestore',
			label: 'Firestore',
		},
		{
			pathname: '/firebase/storage',
			label: 'Storage',
		},
		{
			pathname: '/firebase/functions',
			label: 'Functions',
		},
	];

	let mobileNavbarIsOpen = false;

	async function handleServiceAccountIdSelect(id: string | null) {
		const yearInMs = 1000 * 60 * 60 * 24 * 365;
		const cookie = serialize('serviceAccountId', id ?? '', {
			path: '/',
			expires: new Date(id ? Date.now() + yearInMs : 0),
			maxAge: id ? yearInMs : 0,
		});

		document.cookie = cookie;

		await invalidateAll();
	}
</script>

<div
	class="navbar min-h-fit flex-col justify-between items-stretch gap-2 bg-base-200 p-0 lg:min-h-16 lg:flex-row lg:py-2 lg:px-4"
>
	<div class="flex flex-col lg:flex-row items-stretch">
		<div class="flex grow flex-row items-center justify-between">
			<a href="/">
				<Logo />
			</a>

			<button
				class="relative p-4 text-primary-focus lg:hidden"
				type="button"
				on:click="{() => (mobileNavbarIsOpen = !mobileNavbarIsOpen)}"
			>
				<Icon
					class="absolute top-0 left-0 w-full h-full -translate-x-1/2 translate-y-1/2 transition-opacity {!mobileNavbarIsOpen &&
						'opacity-0'}"
					icon="xmark"
					modifiers="{['xl']}"
					style="solid"
				/>

				<Icon
					class="absolute top-0 left-0 w-full h-full -translate-x-1/2 translate-y-1/2 transition-opacity {mobileNavbarIsOpen &&
						'opacity-0'}"
					icon="bars"
					modifiers="{['xl']}"
					style="solid"
				/>
			</button>
		</div>

		<div class="flex items-center p-2 pt-0 lg:p-0">
			<select
				class="select w-full lg:max-w-[16rem] focus:border-transparent focus:outline-none"
				id="serviceAccount"
				name="serviceAccount"
				placeholder="Select a service account"
				bind:value="{$selectedServiceAccountId}"
				on:change="{(event) => handleServiceAccountIdSelect(event.currentTarget.value)}"
			>
				<option disabled value="{null}"> Select a service account </option>

				{#each $serviceAccounts as serviceAccount}
					<option value="{serviceAccount.id}">
						{serviceAccount.label}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<ul
		class="menu menu-compact menu-vertical items-stretch lg:gap-2 overflow-y-hidden transition-[max-height] lg:menu-normal lg:menu-horizontal"
		class:max-h-0="{!mobileNavbarIsOpen}"
		class:max-h-screen="{mobileNavbarIsOpen}"
		class:lg:max-h-screen="{!mobileNavbarIsOpen}"
	>
		{#each links as link}
			<li>
				<a
					class="rounded-none lg:rounded-md"
					class:active="{$page.url.pathname.startsWith(link.pathname)}"
					href="{link.pathname}"
					on:click="{() => (mobileNavbarIsOpen = false)}"
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
