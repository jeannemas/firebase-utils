import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

import type { POST as POST_ApiV2AuthUsersExport } from '$routes/api/v2/auth/users/export/+server';
import {
	exportConfigSchema,
	fieldNames,
	fieldsWithLabels,
} from '$server/services/firebase-auth.service';
import { fetchJson } from '$utils/endpoints/json';

import type { Actions, PageServerLoad } from './$types';

// TODO comment

export const actions = {
	default: async ({ fetch, request }) => {
		const form = await superValidate(request, exportConfigSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		let errorsCount = 0;

		for (const key of fieldNames) {
			// We validate that the provided names do not contain any commas nor have duplicate names.
			if (form.data.fields[key].name.includes(',')) {
				errorsCount++;

				setError(form, ['fields', key, 'name'], 'The name cannot contain any commas.');
			}

			if (
				Object.values(form.data).filter((value) => value === form.data.fields[key].name).length > 1
			) {
				errorsCount++;

				setError(form, ['fields', key, 'name'], 'The name must be unique.');
			}
		}

		if (errorsCount > 0) {
			return fail(400, { form });
		}

		const exportResult = await fetchJson<typeof POST_ApiV2AuthUsersExport>(
			fetch,
			'/api/v2/auth/users/export',
			{
				body: form.data,
				method: 'POST',
			},
		).then((response) => response.json());

		return {
			exportResult,
			form,
		};
	},
} satisfies Actions;

export const load = (async ({ request }) => {
	const form = await superValidate(request, exportConfigSchema);

	return {
		fields: fieldsWithLabels,
		fieldNames,
		form,
	};
}) satisfies PageServerLoad;
