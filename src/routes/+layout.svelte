<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import type { Link } from '$lib/models/Link';

	import '../app.postcss';
	import type { LayoutServerData } from './$types';
	import Navbar from './Navbar.svelte';
</script>

<script lang="ts">
	export let data: LayoutServerData;

	const serviceAccounts = writable<ServiceAccount[]>([]);
	const selectedServiceAccountId = writable<string | null>(null);

	$: serviceAccounts.set(data.serviceAccounts);
	$: selectedServiceAccountId.set(data.selectedServiceAccountId);

	setContext('serviceAccounts', serviceAccounts);
	setContext('selectedServiceAccountId', selectedServiceAccountId);
	setContext(
		'links',
		writable<Link[]>([
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
		]),
	);
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<div class="flex grow flex-col">
		<main class="mx-4 my-2 grow lg:my-8 lg:mx-24">
			<slot />
		</main>

		<footer class="footer footer-center bg-base-300 p-4 py-8 text-base-content">
			<div>
				<p>
					Copyright &copy; {new Date().getFullYear()} - All right reserved by Jeanne Mas
				</p>
			</div>
		</footer>
	</div>
</div>
