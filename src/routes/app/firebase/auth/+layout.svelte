<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { toasts } from '$client/stores/toasts';
	import Async from '$components/Async.svelte';
	import Icon from '$components/Icon.svelte';

	import type { LayoutServerData } from './$types';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let data: LayoutServerData;

	function handleCopyUID(uid: string) {
		navigator.clipboard.writeText(uid);

		toasts.update((toasts) => [
			...toasts,
			{
				text: 'Copied UID to clipboard',
				timeout: 3000,
				type: 'alert-success',
			},
		]);
	}
</script>

<svelte:head>
	<title>FirebaseUtils | Authentication</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center justify-between gap-2">
		<div>
			<div class="input-group">
				<input
					class="input input-bordered w-full md:max-w-xs"
					placeholder="Search for users..."
					type="search"
				/>

				<button class="btn btn-primary" title="Search">
					<Icon name="magnifying-glass" style="solid" />
				</button>
			</div>
		</div>

		<a href="/app/firebase/auth/export">
			<button class="btn btn-primary" title="Export">Export</button>
		</a>
	</div>

	<Async let:awaited="{response}" promise="{data.streamed.response}">
		<table class="table table-compact">
			<thead>
				<tr>
					<th class="w-full">Identifier</th>

					<th class="w-0 hidden md:table-cell">UID</th>

					<th class="w-0 hidden md:table-cell"></th>

					<th class="w-0"></th>
				</tr>
			</thead>

			<tbody>
				{#each response.results as result}
					<tr>
						<td>
							<a class="link" href="{$page.url.pathname}/{result.uid}">{result.email}</a>
						</td>

						<td class="hidden md:table-cell">
							<code>{result.uid}</code>
						</td>

						<td class="hidden md:table-cell">
							<button
								class="btn btn-sm btn-ghost hover:btn-secondary hidden md:flex transition-colors tooltip tooltip-bottom"
								data-tip="Copy UID"
								on:click="{() => handleCopyUID(result.uid)}"
							>
								<Icon name="clipboard" style="solid" />
							</button>
						</td>

						<td>
							<div class="dropdown dropdown-end dropdown-bottom">
								<button
									tabindex="0"
									class="btn btn-sm btn-ghost hover:btn-secondary transition-colors"
								>
									<Icon name="ellipsis-vertical" style="solid" />
								</button>

								<ul
									tabindex="-1"
									class="dropdown-content menu menu-compact p-2 shadow bg-base-100 border border-base-200 rounded-box"
								>
									<li>
										<button on:click="{() => alert('TODO Not implemented yet')}">
											Reset password
										</button>
									</li>

									<li>
										<button on:click="{() => alert('TODO Not implemented yet')}">
											Disable account
										</button>
									</li>

									<li>
										<button on:click="{() => alert('TODO Not implemented yet')}">
											Delete account
										</button>
									</li>
								</ul>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Async>
</div>

<slot />

<!-- TODO fix broken search -->
<!-- TODO add pagination -->

<!-- TODO investigate this page randomly crashing, maybe because it runs out of memory because of all the JSONEditors? -->
