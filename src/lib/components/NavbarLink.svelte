<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	export let href: string;
	export let title: string | null = null;
</script>

<a
	class="rounded-none lg:rounded-md flex flex-row items-center justify-between gap-2 w-full"
	class:active="{$page.url.pathname.startsWith(href)}"
	href="{href}"
	title="{title}"
>
	<slot />
</a>
