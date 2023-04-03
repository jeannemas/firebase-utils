/**
 * This class represents a toast.
 */
export type Toast = {
	/**
	 * The type of toast; no type means the toast will be unstyled.
	 */
	type?: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';
	/** Whether or not the toast is dismissible. */
	dismissible?: boolean;
	/** The text to display in the toast. */
	text: string;
	/**
	 * The timeout for the toast; no timeout means the toast won't disappear by itself.
	 */
	timeout?: number;
};
