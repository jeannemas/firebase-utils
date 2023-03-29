<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { JSONEditor, type Content, type JSONValue } from 'svelte-jsoneditor';
	import type { JsonEditorProps } from 'svelte-jsoneditor/components/JSONEditor.svelte';

	export type Props = Pick<
		JsonEditorProps,
		| 'escapeControlCharacters'
		| 'flattenColumns'
		| 'indentation'
		| 'mainMenuBar'
		| 'mode'
		| 'navigationBar'
		| 'readOnly'
		| 'statusBar'
		| 'tabSize'
	>;
</script>

<script lang="ts">
	export let value: JSONValue;
	export let config: Props = {};

	let wrapper: HTMLDivElement | null = null;
	let editor: JSONEditor | null = null;
	let content: Content;

	$: content = {
		text: undefined,
		json: value,
	};

	onMount(() => {
		handleThemeChange();

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
	});

	function handleThemeChange() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			wrapper?.classList.add('jse-theme-dark');
		} else {
			wrapper?.classList.remove('jse-theme-dark');
		}

		editor?.refresh();
	}
</script>

<style lang="postcss">
	@import 'svelte-jsoneditor/themes/jse-theme-dark.css';
</style>

<div class="jse-theme-dark" style="--jse-main-border: none;" bind:this="{wrapper}">
	<JSONEditor {...config} bind:content="{content}" bind:this="{editor}" />
</div>

<!-- <pre class="overflow-scroll text-sm"><code>{JSON.stringify(value, null, 2)}</code></pre> -->
