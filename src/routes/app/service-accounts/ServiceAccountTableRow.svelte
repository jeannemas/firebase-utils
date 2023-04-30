<script context="module" lang="ts">
	import type { ServiceAccount } from '@prisma/client';

	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
</script>

<!-- TODO comment -->
<script lang="ts">
	export let serviceAccount: ServiceAccount;
</script>

<tr>
	<td class="overflow-scroll">
		{serviceAccount.label}
	</td>

	<td class="overflow-scroll hidden md:table-cell">
		{new Date(serviceAccount.createdAt).toLocaleString()}
	</td>

	<td class="overflow-scroll hidden md:table-cell">
		{new Date(serviceAccount.updatedAt).toLocaleString()}
	</td>

	<td>
		<div class="flex flex-row items-center justify-center gap-1">
			<a href="{$page.url.pathname}/{serviceAccount.id}">
				<button class="btn btn-info btn-outline" title="View">
					<span class="hidden md:inline-block"> View </span>

					<span class="md:hidden">
						<Icon name="search" style="solid" />
					</span>
				</button>
			</a>

			<a href="{$page.url.pathname}/{serviceAccount.id}/edit">
				<button class="btn btn-warning btn-outline" title="Edit">
					<span class="hidden md:inline-block"> Edit </span>

					<span class="md:hidden">
						<Icon name="pen" style="solid" />
					</span>
				</button>
			</a>

			<a href="{$page.url.pathname}/{serviceAccount.id}/delete">
				<button class="btn btn-error btn-outline" title="Delete">
					<span class="hidden md:inline-block"> Delete </span>

					<span class="md:hidden">
						<Icon name="trash" style="solid" />
					</span>
				</button>
			</a>
		</div>
	</td>
</tr>
