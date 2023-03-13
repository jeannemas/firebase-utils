<script lang="ts">
	import { onMount } from 'svelte';

	import Icon from '../Icon.svelte';

	export let closable = false;
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
	class="alert z-50 opacity-0 shadow-lg transition-opacity duration-500 ease-in-out md:w-fit alert-{style}"
	bind:this="{component}"
>
	<div class="flex flex-row justify-between">
		<span>
			{text}
		</span>

		{#if closable}
			<button
				class="btn-ghost btn-sm btn"
				on:click="{remove}"
			>
				<Icon
					icon="circle-xmark"
					modifiers="{['lg']}"
					style="regular"
				/>
			</button>
		{/if}
	</div>
</div>
