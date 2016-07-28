const SVG_NS = 'http://www.w3.org/2000/svg';

export default function(options) {
	options = Object.assign({
		viewBox: '0 0 30 30',
		class: 'xui-icon'
	}, options);

	const svg = document.createElementNS(SVG_NS, 'svg');
	const path = document.createElementNS(SVG_NS, 'path');
	svg.setAttribute('viewBox', options.viewBox);
	svg.setAttribute('class', options.class);
	path.setAttribute('d', options.path);
	svg.appendChild(path);
	return svg;
}
