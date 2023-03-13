<script lang="ts">
	import Container from '$lib/components/tabs/Container.svelte';
	import Display from '$lib/components/tabs/Display.svelte';
	import type { Tab } from '$lib/models/Tab';

	import ListUsers from './ListUsers.svelte';

	const listUsersTab: Tab = {
		hash: '#listUsers',
		label: 'List Users',
	};
</script>

<div class="my-4">
	<Container tabs="{[listUsersTab]}" />
</div>

<Display tab="{listUsersTab}">
	<ListUsers />
</Display>
