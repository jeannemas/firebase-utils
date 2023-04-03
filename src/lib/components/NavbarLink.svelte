<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	export let href: string;
	export let title: string;
</script>

<!-- TODO comment -->

<a
	class="rounded-none lg:rounded-md flex flex-row items-center justify-between gap-2 w-full"
	class:active="{$page.url.pathname.startsWith(href)}"
	href="{href}"
	title="{title}"
>
	<span>
		{title}
	</span>

	<span class="lg:hidden">
		<slot />
	</span>
</a>
