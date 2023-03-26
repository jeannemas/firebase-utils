<script context="module" lang="ts">
	import '../app.postcss';
	import type { LayoutServerData } from './$types';
	import Navbar from './Navbar.svelte';
</script>

<script lang="ts">
	export let data: LayoutServerData;
</script>

<div class="flex min-h-screen flex-col">
	<Navbar
		availableServiceAccounts="{data.serviceAccounts}"
		selectedServiceAccountId="{data.selectedServiceAccountId}"
	/>

	<div class="m-4 lg:mx-24">
		<slot />
	</div>

	<footer class="sticky top-full footer footer-center bg-base-300 p-8 text-base-content">
		<div>
			<p>
				Copyright &copy; 2023 - {new Date().getFullYear()}
				| All right reserved by

				<a href="https://jeannemas.me/?reference=firebase-utils" rel="noreferrer" target="_blank">
					Jeanne Mas
				</a>
			</p>
		</div>
	</footer>
</div>
