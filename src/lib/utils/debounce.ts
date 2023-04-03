/**
 * An utility function to debounce a function call.
 *
 * @param wait The time to wait before calling the function (in milliseconds)
 * @param func The function to call
 * @returns The debounced function
 */
export function debounce<F extends (...args: never[]) => unknown>(wait: number, func: F) {
	let timeout: NodeJS.Timeout;

	return function (...args) {
		clearTimeout(timeout);

		timeout = setTimeout(() => func(...args), wait);
	} as F;
}
