import { TOASTS_DISMISSIBLE_DEFAULT_TIMEOUT } from '$lib/constants';
import type { Toast } from '$models/Toast.model';

/**
 * An helper function to create a toast representing an error.
 *
 * @param message The message to display in the toast.
 * @returns The toast.
 */
export function toastError(message: string): Toast {
	return {
		type: 'alert-error',
		dismissible: true,
		text: message,
	};
}

/**
 * An helper function to create a toast representing a success.
 *
 * @param message The message to display in the toast.
 * @returns The toast.
 */
export function toastSuccess(message: string): Toast {
	return {
		type: 'alert-success',
		dismissible: true,
		text: message,
		timeout: TOASTS_DISMISSIBLE_DEFAULT_TIMEOUT,
	};
}
