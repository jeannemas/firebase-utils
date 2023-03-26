<script context="module" lang="ts">
	import { onMount } from 'svelte';

	import Icon from '$components/Icon.svelte';
</script>

<script lang="ts">
	export let classes: string | null = null;
	/** Whether or not the alert can be dismissed */
	export let dismissible = false;
	export let timeout: number | null = null;

	let wrapper: HTMLDivElement;

	onMount(() => {
		wrapper.classList.remove('opacity-0');

		timeout && setTimeout(remove, timeout);
	});

	export function remove() {
		wrapper.classList.add('opacity-0');

		setTimeout(() => wrapper.parentNode?.removeChild(wrapper), 500);
	}

	export { classes as class };
</script>

<div class="z-50 opacity-0 transition-opacity duration-500 ease-in-out" bind:this="{wrapper}">
	<div class="alert md:w-fit {classes}">
		<div class="flex flex-row items-center justify-between">
			<span>
				<slot />
			</span>

			{#if dismissible}
				<button class="btn-ghost btn-sm btn" on:click="{remove}">
					<Icon icon="circle-xmark" modifiers="{['lg']}" style="regular" />
				</button>
			{/if}
		</div>
	</div>
</div>
