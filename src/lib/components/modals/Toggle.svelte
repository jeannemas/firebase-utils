<script lang="ts">
	export let className: string | null = null;
	export let id: string;
</script>

<label
	for="{id}"
	class="{className}"
>
	<slot />
</label>
