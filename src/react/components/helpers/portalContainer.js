export const portalClass = 'xui-portal';

function createPortalContainer() {
	const portalContainer = document.createElement('div');
	portalContainer.classList.add(portalClass);
	document.body.appendChild(portalContainer);
}

const portalContainerNode = () =>
	document.querySelector(`body > .${portalClass}`);

const observer = new MutationObserver((mutations, observer) => {
	if (portalContainerNode()) {
		observer.disconnect();
		return portalContainerNode();
	}
});

export default function portalContainer() {
	if (!portalContainerNode()) {
		createPortalContainer();
		return observer.observe(document.body, { childList: true, subtree: true });
	} else {
		return portalContainerNode();
	}
}
