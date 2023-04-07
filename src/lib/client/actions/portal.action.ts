import type { Action, ActionReturn } from 'svelte/action';

/**
 * Portals an element to a target element.
 *
 * @param element The element to portal.
 * @param target The target element to portal to.
 */
export const portal = ((element, target): ActionReturn<HTMLElement> => {
	let targetElement: HTMLElement | null = null;

	function update(newTarget?: HTMLElement) {
		targetElement = newTarget ?? null;

		targetElement?.appendChild(element);

		element.hidden = false;
	}

	function destroy() {
		if (!element.parentNode) {
			return;
		}

		element.parentNode.removeChild(element);
	}

	update(target);

	return {
		update,
		destroy,
	};
}) satisfies Action<HTMLElement, HTMLElement>;
