import type { Toast } from '$models/Toast.model';

export function toastError(message: string): Toast {
	return {
		class: 'alert-error',
		dismissible: true,
		text: message,
	};
}

export function toastSuccess(message: string): Toast {
	return {
		class: 'alert-success',
		dismissible: true,
		text: message,
		timeout: 10000,
	};
}
