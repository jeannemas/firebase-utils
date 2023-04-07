import type { Action, ActionReturn } from 'svelte/action';

/**
 * Prevents the default action of an element if it is read-only.
 *
 * @param element The element to listen to.
 */
export const readonlyCheckbox = ((element): ActionReturn => {
	const listener = (event: MouseEvent) => {
		if (element.readOnly && element.type === 'checkbox') {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	element.addEventListener('click', listener);

	function destroy() {
		element.removeEventListener('click', listener);
	}

	return {
		destroy,
	};
}) satisfies Action<HTMLInputElement>;
