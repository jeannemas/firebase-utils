<script context="module" lang="ts">
	import type { UserRecord } from 'firebase-admin/auth';
	import { Mode } from 'svelte-jsoneditor';

	import Code from '$components/Code.svelte';
	import Collapse from '$components/Collapse.svelte';
</script>

<script lang="ts">
	export let record: UserRecord;
</script>

<!-- TODO comment -->

<div class="rounded-box shadow dark:bg-base-200">
	<Collapse lazyload>
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
			value="{JSON.parse(JSON.stringify(record))}"
		/>
	</Collapse>
</div>
