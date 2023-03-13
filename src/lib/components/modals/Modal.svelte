<script lang="ts">
	export let id: string;

	let toggle: HTMLInputElement;

	export function close() {
		toggle.checked = false;
	}
</script>

<input
	type="checkbox"
	id="{id}"
	class="modal-toggle"
	bind:this="{toggle}"
/>

<label
	for="{id}"
	class="modal cursor-pointer"
>
	<label
		class="modal-box relative"
		for=""
	>
		<slot />
	</label>
</label>
