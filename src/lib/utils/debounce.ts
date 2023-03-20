export function debounce<F extends (...args: never[]) => unknown>(wait: number, func: F) {
	let timeout: NodeJS.Timeout;

	return function (...args) {
		clearTimeout(timeout);

		timeout = setTimeout(() => func(...args), wait);
	} as F;
}
