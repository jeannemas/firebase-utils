<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { page } from '$app/stores';
	import type { Link } from '$lib/models/Link';

	import Logo from '$lib/components/Logo.svelte';

	const dispatch = createEventDispatcher();

	export let links: Link[];

	let navbarToggle: HTMLInputElement;
</script>

<style lang="postcss">
	#navbarToggle:not(:checked) ~ .menu {
		@apply max-h-0 md:max-h-screen;
	}

	#navbarToggle:checked ~ .menu {
		@apply max-h-screen;
	}
</style>

<!-- TODO toggle the navbar using JS -->
<div
	class="navbar min-h-fit flex-col justify-between bg-base-200 p-0 md:min-h-16 md:flex-row md:py-2 md:px-4"
>
	<div class="flex w-full grow flex-row justify-between md:w-auto">
		<a href="/">
			<Logo />
		</a>

		<label
			role="button"
			class="p-4 md:hidden"
			for="navbarToggle"
		>
			<i class="fa-solid fa-bars fa-2xl"></i>
		</label>
	</div>

	<input
		type="checkbox"
		id="navbarToggle"
		class="h-0 w-0 appearance-none border-0 opacity-0 checked:pointer-events-auto"
		bind:this="{navbarToggle}"
	/>

	<ul
		class="menu menu-vertical w-full gap-x-2 overflow-y-hidden transition-[max-height] duration-300 md:menu-horizontal md:w-auto"
	>
		{#each links as link}
			<li class="w-full md:w-auto">
				<a
					href="{link.pathname}{$page.url.search}"
					class="rounded-none md:rounded-md"
					class:active="{$page.url.pathname.startsWith(link.pathname)}"
					on:click="{() => (navbarToggle.checked = false)}"
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
