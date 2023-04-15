<script context="module" lang="ts">
	import Collapse from '$components/Collapse.svelte';
	import Input from '$components/Input.svelte';
	import type { PublicUser } from '$server/services/firebase-auth.service';
</script>

<script lang="ts">
	export let record: PublicUser;

	let isBeingEdited = false;
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

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-t-base-200">
			<Input
				class="checkbox-lg"
				label="Disabled"
				name="disabled"
				readonly="{!isBeingEdited}"
				type="checkbox"
				bind:value="{record.disabled}"
			/>

			<Input
				label="Display name"
				name="displayName"
				readonly="{!isBeingEdited}"
				type="text"
				bind:value="{record.displayName}"
			/>

			<Input
				class="checkbox-lg"
				label="Email verified"
				name="emailVerified"
				readonly="{!isBeingEdited}"
				type="checkbox"
				bind:value="{record.emailVerified}"
			/>

			<Input
				label="Email"
				name="email"
				readonly="{!isBeingEdited}"
				type="email"
				bind:value="{record.email}"
			/>

			<Input
				label="Phone number"
				name="phoneNumber"
				readonly="{!isBeingEdited}"
				type="tel"
				bind:value="{record.phoneNumber}"
			/>

			<Input
				label="Photo URL"
				name="photoURL"
				readonly="{!isBeingEdited}"
				type="url"
				bind:value="{record.photoURL}"
			/>

			<Input
				label="Creation time"
				name="creationTime"
				readonly
				type="text"
				bind:value="{record.creationTime}"
			/>

			<Input
				label="Last sign-in time"
				name="lastSignInTime"
				readonly
				type="text"
				bind:value="{record.lastSignInTime}"
			/>

			<!-- TODO -->
			<!-- <button class="btn btn-secondary"> Custom claims </button>

			{#if isBeingEdited}
				<div class="grid grid-cols-2 gap-4">
					<button class="btn btn-success" on:click="{() => (isBeingEdited = false)}"> Save </button>

					<button class="btn btn-info" on:click="{() => (isBeingEdited = false)}"> Cancel </button>
				</div>
			{:else}
				<button class="btn btn-secondary" on:click="{() => (isBeingEdited = true)}"> Edit </button>
			{/if} -->
		</div>
	</Collapse>
</div>
