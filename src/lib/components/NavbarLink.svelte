<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<a
	class="rounded-none lg:rounded-md"
	class:active="{$page.url.pathname.startsWith(href)}"
	href="{href}"
>
	{label}
</a>
