<script lang="ts">
	type IconStyle = 'regular' | 'solid';

	export let style: IconStyle;
	export let icon: string;
	export let modifiers: string[] = [];

	let className = '';

	$: classes = [style, icon, ...modifiers].map((modifier) => `fa-${modifier}`).join(' ');

	// TODO rework

	export { className as class };
</script>

<!-- TODO comment -->

<i class="{classes} {className}"></i>
