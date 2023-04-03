import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// TODO comment

const loggerHandle = (async ({ event, resolve }) => {
	const startAt = process.hrtime();
	const ip = event.getClientAddress();
	const { method, url } = event.request;
	const response = await resolve(event);
	const { status } = response;
	const diff = process.hrtime(startAt);
	const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
	const time = new Date().toISOString();

	console.log(`${time} - ${method} | ${url} | ${status} | ${responseTime}ms - ${ip}`);

	return response;
}) satisfies Handle;

export const handle = sequence(loggerHandle);
