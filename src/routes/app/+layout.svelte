<script context="module" lang="ts">
	import '../../app.postcss'; // Needed in order to prevent FOUC
	import type { LayoutServerData } from './$types';
	import Navbar from './Navbar.svelte';
</script>

<script lang="ts">
	export let data: LayoutServerData;
</script>

<!-- TODO comment -->

<Navbar
	availableServiceAccounts="{data.serviceAccounts}"
	selectedServiceAccountId="{data.selectedServiceAccountId}"
/>

<div class="m-4 lg:mx-24">
	<slot />
</div>
