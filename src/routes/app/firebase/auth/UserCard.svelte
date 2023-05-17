<script context="module" lang="ts">
	import Collapse from '$components/Collapse.svelte';
	import Input from '$components/Input.svelte';
	import type { PublicUser } from '$server/services/firebase-auth.service';
</script>

<script lang="ts">
	export let record: PublicUser;

	let collapse: Collapse;
</script>

<!-- TODO comment -->

<div class="rounded-box border border-base-200 shadow dark:bg-base-200">
	<Collapse bind:this="{collapse}">
		<svelte:fragment slot="title">
			<div class="cursor-text text-sm md:text-base">
				{record.email}
			</div>

			<code class="cursor-text hidden md:block">
				{record.uid}
			</code>
		</svelte:fragment>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-t-base-200">
			<Input
				class="checkbox-lg"
				label="Disabled"
				name="disabled"
				readonly
				type="checkbox"
				value="{record.disabled}"
			/>

			<Input
				label="Display name"
				name="displayName"
				readonly
				type="text"
				value="{record.displayName}"
			/>

			<Input
				class="checkbox-lg"
				label="Email verified"
				name="emailVerified"
				readonly
				type="checkbox"
				value="{record.emailVerified}"
			/>

			<Input label="Email" name="email" readonly type="email" value="{record.email}" />

			<Input
				label="Phone number"
				name="phoneNumber"
				readonly
				type="tel"
				value="{record.phoneNumber}"
			/>

			<Input label="Photo URL" name="photoURL" readonly type="url" value="{record.photoURL}" />

			<Input
				label="Creation time"
				name="creationTime"
				readonly
				type="text"
				value="{new Date(record.creationTime).toLocaleString()}"
			/>

			<Input
				label="Last sign-in time"
				name="lastSignInTime"
				readonly
				type="text"
				value="{new Date(record.lastSignInTime).toLocaleString()}"
			/>

			<!-- TODO -->
			<button class="btn btn-secondary"> Custom claims </button>
		</div>
	</Collapse>
</div>
