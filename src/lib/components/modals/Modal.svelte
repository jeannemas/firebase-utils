<script lang="ts">
	export let id: string;

	let toggle: HTMLInputElement;

	export function close() {
		toggle.checked = false;
	}
</script>

<input class="modal-toggle" id="{id}" type="checkbox" bind:this="{toggle}" />

<label class="modal cursor-pointer" for="{id}">
	<label class="modal-box relative" for="">
		<slot />
	</label>
</label>
