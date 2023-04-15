<script context="module" lang="ts">
</script>

<script lang="ts">
	let classes: string | null = null;

	export { classes as class };
	export let label: string | null = null;
	export let name: string;
	export let readonly = false;
	export let required = false;
	export let type = 'text';
	export let value: unknown;

	let input: HTMLInputElement;

	function handleClick(event: MouseEvent) {
		if (input.readOnly && input.type === 'checkbox') {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	function handleInput() {
		switch (type) {
			case 'number':
				value = Number.parseFloat(input.value);

				break;
			case 'checkbox':
				value = input.checked;

				break;
			default:
				value = input.value;
		}
	}
</script>

<!-- TODO comment -->

<div class="form-control">
	{#if label}
		<label class="label" for="{name}">
			<span class="label-text">
				{label}
			</span>
		</label>
	{/if}

	<input
		checked="{typeof value === 'boolean' ? value : null}"
		class="{type === 'checkbox'
			? 'checkbox'
			: 'input [&:not(:read-only)]:input-bordered read-only:input-ghost'} {classes}"
		id="{name}"
		name="{name}"
		readonly="{readonly}"
		required="{required}"
		type="{type}"
		value="{value}"
		bind:this="{input}"
		on:click="{handleClick}"
		on:input="{handleInput}"
	/>
</div>
