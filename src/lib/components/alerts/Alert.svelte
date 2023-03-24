<script context="module" lang="ts">
	import { onMount } from 'svelte';

	import Icon from '$components/Icon.svelte';
</script>

<script lang="ts">
	/** Whether or not the alert can be dismissed */
	export let dismissible = false;
	export let style: string;
	export let text: string;
	export let timeout: number | null = null;

	let component: HTMLDivElement;

	onMount(() => {
		component.classList.remove('opacity-0');

		if (timeout) {
			setTimeout(remove, timeout);
		}
	});

	export function remove() {
		component.classList.add('opacity-0');

		setTimeout(() => component.parentNode?.removeChild(component), 500);
	}
</script>

<div
	class="alert z-50 opacity-0 shadow-lg transition-opacity duration-500 ease-in-out lg:w-fit alert-{style}"
	bind:this="{component}"
>
	<div class="flex flex-row justify-between">
		<span>
			{text}
		</span>

		{#if dismissible}
			<button class="btn-ghost btn-sm btn" on:click="{remove}">
				<Icon icon="circle-xmark" modifiers="{['lg']}" style="regular" />
			</button>
		{/if}
	</div>
</div>
