<script context="module" lang="ts">
	import { page } from '$app/stores';

	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';
</script>

<script lang="ts">
	export let root = '/';

	let mobileNavbarIsOpen = false;

	page.subscribe(() => (mobileNavbarIsOpen = false));
</script>

<div class="navbar flex-col justify-between items-stretch gap-2 bg-base-200 p-0 lg:flex-row lg:p-2">
	<div class="flex flex-col lg:flex-row items-stretch">
		<div class="flex grow flex-row items-center justify-between">
			<a class="text-xl" href="{root}">
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

		<slot name="left" />
	</div>

	<ul
		class="menu menu-compact menu-vertical items-stretch lg:gap-2 overflow-y-hidden transition-[max-height]  lg:menu-horizontal"
		class:max-h-0="{!mobileNavbarIsOpen}"
		class:max-h-screen="{mobileNavbarIsOpen}"
		class:lg:max-h-screen="{!mobileNavbarIsOpen}"
	>
		<slot name="right" />
	</ul>
</div>
