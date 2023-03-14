<script lang="ts">
	type IconStyle = 'regular' | 'solid';

	export let style: IconStyle;
	export let icon: string;
	export let modifiers: string[] = [];

	let className = '';

	$: classes = [style, icon, ...modifiers].map((modifier) => `fa-${modifier}`).join(' ');

	export { className as class };
</script>

<i class="{classes} {className}"></i>
