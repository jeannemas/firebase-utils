<script context="module" lang="ts">
	import Collapse from '$components/Collapse.svelte';
	import Input from '$components/Input.svelte';
	import type { PublicUser } from '$server/services/firebase-auth.service';
</script>

<script lang="ts">
	export let record: PublicUser;
</script>

<!-- TODO comment -->

<div class="rounded-box border border-base-200 shadow dark:bg-base-200">
	<Collapse lazyload>
		<svelte:fragment slot="title">
			<div class="cursor-text text-sm md:text-base">
				{record.email}
			</div>

			<code class="cursor-text hidden md:block">
				{record.uid}
			</code>
		</svelte:fragment>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end border-t border-t-base-200">
			<Input
				class="checkbox-lg checkbox-success checked:checkbox-error"
				label="Disabled"
				name="disabled"
				readonly
				required
				type="checkbox"
				bind:value="{record.disabled}"
			/>

			<Input
				label="Display name"
				name="displayName"
				readonly
				required
				type="text"
				bind:value="{record.displayName}"
			/>

			<Input
				class="checkbox-lg checkbox-error checked:checkbox-success"
				label="Email verified"
				name="emailVerified"
				readonly
				required
				type="checkbox"
				bind:value="{record.emailVerified}"
			/>

			<Input
				label="Email"
				name="email"
				readonly
				required
				type="email"
				bind:value="{record.email}"
			/>

			<Input
				label="Phone number"
				name="phoneNumber"
				readonly
				required
				type="tel"
				bind:value="{record.phoneNumber}"
			/>

			<Input
				label="Photo URL"
				name="photoURL"
				readonly
				required
				type="url"
				bind:value="{record.photoURL}"
			/>

			<Input
				label="Creation time"
				name="metadata.creationTime"
				readonly
				required
				type="text"
				bind:value="{record.metadata.creationTime}"
			/>

			<Input
				label="Last sign-in time"
				name="metadata.lastSignInTime"
				readonly
				required
				type="text"
				bind:value="{record.metadata.lastSignInTime}"
			/>

			<button class="btn btn-info"> Custom claims </button>

			<button class="btn btn-secondary"> Edit </button>
		</div>
	</Collapse>
</div>
