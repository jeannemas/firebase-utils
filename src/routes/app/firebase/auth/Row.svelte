<script context="module" lang="ts">
	import type { UserRecord } from 'firebase-admin/auth';
	import { Mode, type JSONValue } from 'svelte-jsoneditor';

	import Code from '$components/Code.svelte';
	import Collapse from '$components/Collapse.svelte';
</script>

<script lang="ts">
	export let record: UserRecord & JSONValue;
</script>

<!-- TODO comment -->

<div class="rounded-box shadow dark:bg-base-200">
	<Collapse lazyload="{true}">
		<svelte:fragment slot="title">
			<div>
				{record.email}
			</div>

			<div class="hidden md:block font-mono">
				{record.uid}
			</div>
		</svelte:fragment>

		<Code
			config="{{
				mainMenuBar: false,
				mode: Mode.tree,
				navigationBar: false,
				readOnly: true,
				statusBar: false,
			}}"
			slot="content"
			value="{record}"
		/>
	</Collapse>
</div>
