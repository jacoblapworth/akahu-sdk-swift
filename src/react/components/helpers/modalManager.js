import { unlockScroll, lockScroll } from "./lockScroll";
import { portalClass } from './portalContainer';

const openedModals = []; // modal registry

// Which modal is on the top of the stack?
const getTopModal = () => openedModals[openedModals.length - 1];

// To properly set the aria-hidden attribute, we need all the siblings of the portal.
const getModalSiblings = () => {
	// Only do this, if the portal is found where expected.
	if (document.querySelector(`body > .${portalClass}`)) {
		return document.querySelectorAll(`body > :not(.${portalClass})`);
	}
	// For non-portal modal implementations, aria-hidden won't be managed, as we can't reasonably
	// predict the markup structure to correctly apply the attribute. It can be done, but not reasonably.
	return [];
};

// Set or unset portal siblings from being aria-hidden.
// NB: If a direct child of the body has its own aria-hidden values, these will be overridden.
const setSiblingsAriaHidden = (toHide) => {
	[...getModalSiblings()].forEach(node => node.setAttribute('aria-hidden', toHide));
};

export const registerModal = newModal => {
	if (!openedModals.length) {
		// First modal displayed triggers changes to the main page.
		setSiblingsAriaHidden(true);
	} else {
		// Set the most recent modal's state, before adding a new one.
		getTopModal().setState({ isTopModal: false });
	}
	// There are multiple possible layers of scroll locking, so let the existing helper keep track.
	lockScroll();
	// Add the new modal on top.
	openedModals.push(newModal);
	newModal.setState({ isTopModal: true });
};

export const deRegisterTopModal = () => {
	// Remove the topmost modal and adjust its state.
	const removedModal = openedModals.pop();
	removedModal.setState({ isTopModal: false });

	if (!openedModals.length) {
		// If it was the last modal, reset the main page.
		setSiblingsAriaHidden(false);
	} else {
		// Otherwise, set the next modal's state.
		getTopModal().setState({ isTopModal: true });
	}
	// There are multiple possible layers of scroll locking, so let the existing helper keep track.
	unlockScroll();
	// Closing the modal always returns the user to the prior focus context.
	removedModal.priorFocusedEl && removedModal.priorFocusedEl.focus();
};
