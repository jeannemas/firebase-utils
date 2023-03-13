<script lang="ts">
	import { page } from '$app/stores';
	import type { Tab } from '$lib/models/Tab';

	export let tab: Tab;
</script>

<a
	class="tab"
	class:tab-active="{$page.url.hash === tab.hash}"
	href="{tab.hash}"
>
	{tab.label}
</a>
