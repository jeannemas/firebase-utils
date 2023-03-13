<script lang="ts">
	type IconStyle = 'regular' | 'solid';

	export let style: IconStyle;
	export let icon: string;
	export let modifiers: string[] = [];

	const classes = [style, icon, ...modifiers].map((modifier) => `fa-${modifier}`).join(' ');
</script>

<i class="{classes}"></i>
