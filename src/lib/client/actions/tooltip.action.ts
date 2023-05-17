import type { Action, ActionReturn } from 'svelte/action';

type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Add a tooltip (on hover) to an element.
 *
 * @param element The element to add the tooltip to.
 */
export const tooltip = ((element, position?: Position): ActionReturn<Position | undefined> => {
	element.classList.add('fb-tooltip', `fb-tooltip-position-${position ?? 'top'}`);

	return {};
}) satisfies Action<HTMLElement, Position>;
