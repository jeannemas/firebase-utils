<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { JSONEditor, Mode, type JSONValue } from 'svelte-jsoneditor';
</script>

<script lang="ts">
	export let value: JSONValue;

	let wrapper: HTMLDivElement;
	let editor: JSONEditor;

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

		editor.refresh();
	}
</script>

<style lang="postcss">
	/* load one or multiple themes */
	@import 'svelte-jsoneditor/themes/jse-theme-dark.css';
</style>

<div class="jse-theme-dark" style="--jse-main-border: none;" bind:this="{wrapper}">
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
</div>

<!-- <pre class="overflow-scroll text-sm"><code>{JSON.stringify(value, null, 2)}</code></pre> -->
