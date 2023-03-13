<script lang="ts">
	import type { ListUsersResult, UserRecord } from 'firebase-admin/auth';
	import { derived } from 'svelte/store';

	import { page } from '$app/stores';

	const serviceAccountIdString = derived(page, ({ url }) =>
		url.searchParams.get('serviceAccountId'),
	);
	const rowsPerPage = derived(page, ({ url }) => url.searchParams.get('rowsPerPage'));
	const users = derived(
		[serviceAccountIdString, rowsPerPage],
		([id], set) => {
			fetch(`/api/v1/firebase/service-accounts/${id}/auth/listUsers?rowsPerPage=${rowsPerPage}`)
				.then((response) => response.json() as Promise<ListUsersResult>)
				.then(({ users }) => set(users));
		},
		[] as UserRecord[],
	);
</script>

<div class="my-2 flex flex-row items-center justify-start gap-x-2">
	<input
		type="text"
		placeholder="Search for users..."
		class="input-bordered input w-full md:max-w-xs"
	/>
	<!-- TODO -->
</div>

<div class="overflow-x-auto">
	<table class="table-compact table w-full">
		<thead>
			<tr>
				<th class="hidden"></th>

				<th> Firebase UID </th>

				<th> Email </th>

				<th></th>
			</tr>
		</thead>

		<tbody>
			{#each $users as user}
				<tr>
					<td class="hidden"></td>

					<td>
						{user.uid}
					</td>

					<td>
						{user.email ?? ''}
					</td>

					<td></td>
				</tr>
			{/each}
		</tbody>

		<tfoot></tfoot>
	</table>
</div>

<div class="my-2 flex flex-row items-center justify-end gap-x-2">
	<label for="rowsPerPage"> Rows per page </label>

	<select
		class="select-bordered select"
		id="rowsPerPage"
		name="rowsPerPage"
	>
		<option value="10"> 10 </option>

		<option value="25"> 25 </option>

		<option value="50"> 50 </option>

		<option value="100"> 100 </option>

		<option value="250"> 250 </option>

		<option value="500"> 500 </option>

		<option value="1000"> 1000 </option>
	</select>
</div>
