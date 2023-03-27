<script context="module" lang="ts">
	import { JSONEditor, Mode, type JSONValue } from 'svelte-jsoneditor';
</script>

<script lang="ts">
	export let value: JSONValue;
</script>

<div style="--jse-main-border: none;">
	<JSONEditor
		content="{{
			text: undefined,
			json: value,
		}}"
		mainMenuBar="{false}"
		mode="{Mode.tree}"
		readOnly="{true}"
	/>
</div>

<!-- <pre class="overflow-scroll text-sm"><code>{JSON.stringify(value, null, 2)}</code></pre> -->
