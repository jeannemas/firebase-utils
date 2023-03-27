<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import type { JSONEditor, JSONValue } from 'svelte-jsoneditor';
</script>

<script lang="ts">
	export let value: JSONValue;

	let wrapper: HTMLDivElement;
	let editor: JSONEditor | null = null;

	onMount(() => {
		handleThemeChange();

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
	});

	function handleThemeChange() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			wrapper.classList.add('jse-theme-dark');
		} else {
			wrapper.classList.remove('jse-theme-dark');
		}

		editor?.refresh();
	}
</script>

<style lang="postcss">
	@import 'svelte-jsoneditor/themes/jse-theme-dark.css';
</style>

<div class="jse-theme-dark" style="--jse-main-border: none;" bind:this="{wrapper}">
	{#await import('svelte-jsoneditor').then( ({ JSONEditor, Mode }) => ({ JSONEditor, Mode }), ) then { JSONEditor, Mode }}
		<JSONEditor
			content="{{
				text: undefined,
				json: value,
			}}"
			mainMenuBar="{false}"
			mode="{Mode.tree}"
			readOnly="{true}"
			bind:this="{editor}"
		/>
	{/await}
</div>

<!-- <pre class="overflow-scroll text-sm"><code>{JSON.stringify(value, null, 2)}</code></pre> -->
