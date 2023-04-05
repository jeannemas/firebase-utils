import { writable } from 'svelte/store';

import type { Toast } from '$models/Toast.model';

export const toasts = writable<Toast[]>([]);

export function unshift(payload: Toast) {
	toasts.update((toasts) => [payload, ...toasts]);
}
export function push(payload: Toast) {
	toasts.update((toasts) => [...toasts, payload]);
}

// TODO comment
