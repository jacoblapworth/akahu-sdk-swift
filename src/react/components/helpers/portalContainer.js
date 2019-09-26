import { ns } from '../helpers/xuiClassNamespace';

export const portalClass = `${ns}-portal`;

function createPortalContainer() {
  const container = document.createElement('div');
  container.classList.add(portalClass);
  document.body.appendChild(container);
  return container;
}

export default function portalContainer() {
  return document.querySelector(`body > .${portalClass}`) || createPortalContainer();
}
