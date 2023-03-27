<script context="module" lang="ts">
	import type { UserRecord } from 'firebase-admin/auth';
	import type { JSONValue } from 'svelte-jsoneditor';

	import Code from '$components/Code.svelte';
</script>

<script lang="ts">
	export let record: UserRecord & JSONValue;

	let collapseIsOpen = false;
</script>

<div
	class="collapse collapse-arrow rounded-box shadow dark:bg-base-200"
	class:collapse-open="{collapseIsOpen}"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="collapse-title items-center min-h-fit py-3 flex justify-between text-sm md:text-base cursor-pointer"
		on:click="{() => (collapseIsOpen = !collapseIsOpen)}"
	>
		<div>
			{record.email}
		</div>

		<div class="hidden md:block">
			{record.uid}
		</div>
	</div>

	<div class="collapse-content duration-300">
		<Code value="{record}" />
	</div>
</div>
