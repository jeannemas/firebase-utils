import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { readOne, update } from '$client/services/service-account.service';
import { schema } from '$schemas/service-account-update.schema';

import type { Actions, PageServerLoad } from './$types';

// TODO comment

export const actions = {
	default: async ({ fetch, params, request, url }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			console.error(form);

			return fail(400, { form });
		}

		await update(fetch, params.serviceAccountId, form.data);

		throw redirect(303, `${url.pathname}/..`);
	},
} satisfies Actions;

export const load = (async ({ fetch, params, request }) => {
	const [form, serviceAccount] = await Promise.all([
		superValidate(request, schema),
		readOne(fetch, params.serviceAccountId),
	]);

	if (!serviceAccount) {
		throw redirect(303, '/app/service-accounts');
	}

	form.data.label = serviceAccount.label;

	return {
		form,
		serviceAccount,
	};
}) satisfies PageServerLoad;
