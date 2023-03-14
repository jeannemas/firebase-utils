<script context="module" lang="ts">
	import type { ListUsersResult } from 'firebase-admin/auth';
	import { derived, type Writable } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
</script>

<script lang="ts">
	const selectedServiceAccountId = getContext<Writable<string | null>>('selectedServiceAccountId');
	const rowsPerPage = derived(page, ({ url }) => url.searchParams.get('rowsPerPage') ?? '10');
	const fetchUrl = derived([rowsPerPage], ([$rowsPerPage]) => {
		const url = new URL($page.url.origin);

		url.pathname = '/api/v1/firebase/auth/listUsers';

		if ($rowsPerPage) {
			url.searchParams.set('maxResults', $rowsPerPage);
		}

		return url;
	});
	const result = derived(
		[fetchUrl, selectedServiceAccountId],
		([$url], set) => {
			fetch($url)
				.then((response) => response.json() as Promise<ListUsersResult>)
				.then(set);
		},
		{ users: [] } as ListUsersResult,
	);
	const users = derived(result, ({ users }) => users);
	// TODO handle error + loading state + pagination
</script>

<div class="my-2 flex flex-row items-center justify-start gap-x-2">
	<input
		class="input-bordered input w-full lg:max-w-xs"
		placeholder="Search for users..."
		type="text"
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

<!-- TODO -->
<div class="my-2 flex flex-row items-center justify-end gap-x-2">
	<label for="rowsPerPage"> Rows per page </label>

	<select
		class="select-bordered select"
		id="rowsPerPage"
		name="rowsPerPage"
		value="{$rowsPerPage}"
		on:change="{(event) => {
			const url = new URL($page.url);

			if (event.currentTarget.value) {
				url.searchParams.set('rowsPerPage', event.currentTarget.value);
			}

			goto(url);
		}}"
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
