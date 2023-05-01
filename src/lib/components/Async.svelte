<script context="module" lang="ts">
	import { portal } from '$client/actions/portal.action';

	import Icon from './Icon.svelte';
</script>

<script lang="ts">
	type T = $$Generic;

	export let promise: PromiseLike<T>;

	$: wrapped = new Promise<T>((resolve) =>
		promise.then((data) => setTimeout(() => resolve(data), 250)),
	);
</script>

{#await wrapped}
	<div
		class="absolute top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-center gap-2"
		use:portal="{document.body}"
	>
		<span class="animate-spin">
			<Icon name="spinner" style="solid" modifiers="{['2xl']}" />
		</span>

		<span class="text-2xl"> Loading... </span>
	</div>
{:then awaited}
	<slot awaited="{awaited}" />
{/await}
