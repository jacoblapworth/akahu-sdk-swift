import icons from './private/iconData.js';

let blob = '';
const hiddenVisually = 'xui-u-hidden';

Object.keys(icons).forEach(function(name) {
	blob += (`
		<symbol key="${name}" id="xui-icon-${name}" viewBox="0 0 30 30" class="xui-icon-svg">
			<path d="${icons[name]}"/>
		</symbol>
	`).replace(/[\t\n]/g, '');
});

const XUIIconBlob = `<svg focusable="false" class="${hiddenVisually}">${blob}</svg>`;

export default XUIIconBlob;
export const blobId = 'xui-icon-blob-auto';
export function ensureIconBlobOnPage() {
	if(typeof document !== 'undefined' && !document.getElementById(blobId)) {
		const blobEl = document.createElement('div');
		blobEl.id = blobId;
		blobEl.innerHTML = XUIIconBlob;
		document.body.appendChild(blobEl);
	}
}
