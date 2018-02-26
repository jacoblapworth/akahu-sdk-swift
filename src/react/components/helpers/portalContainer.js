export const portalClass = 'xui-portal';

function createPortalContainer() {
	const portalContainer = document.createElement('div');
	portalContainer.classList.add(portalClass);
	document.body.appendChild(portalContainer);
	return portalContainer;
}

export default function portalContainer() {
	return document.querySelector(`body > .${portalClass}`) || createPortalContainer();
}
