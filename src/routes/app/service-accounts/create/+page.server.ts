import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { create } from '$client/services/service-account.service';
import { schema } from '$schemas/service-account-create.schema';

import type { Actions, PageServerLoad } from './$types';

// TODO comment

export const actions = {
	default: async ({ fetch, request, url }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			console.error(form);

			return fail(400, { form });
		}

		const { id } = await create(fetch, form.data);

		throw redirect(303, `${url.pathname}/../${id}`);
	},
} satisfies Actions;

export const load = (async ({ request }) => {
	const form = await superValidate(request, schema);

	return {
		form,
	};
}) satisfies PageServerLoad;
