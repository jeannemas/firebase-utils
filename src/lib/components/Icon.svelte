<script context="module" lang="ts">
	export type IconStyle = 'regular' | 'solid';
</script>

<script lang="ts">
	/* The name of the Font Awesome icon. */
	export let name: string;
	/* The style of the Font Awesome icon. */
	export let style: IconStyle;
	/* The modifiers of the Font Awesome icon. */
	export let modifiers: string[] = [];

	let modifiersString: string;

	$: modifiersString = modifiers.map((modifier) => `fa-${modifier}`).join(' ');
</script>

<i class="fa-{name} fa-{style} {modifiersString}"></i>
