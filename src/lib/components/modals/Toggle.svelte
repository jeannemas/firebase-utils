<script lang="ts">
	let className: string | null = null;

	export let id: string;

	export { className as class };
</script>

<label class="{className}" for="{id}">
	<slot />
</label>
