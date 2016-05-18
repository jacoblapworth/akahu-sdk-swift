import icons from './iconData.js';

let blob = '';

Object.keys(icons).forEach(function(name) {
	blob += (`
		<symbol key="${name}" id="xui-icon-${name}" viewBox="0 0 30 30" class="xui-icon-svg">
			<path d="${icons[name]}"/>
		</symbol>
	`).replace(/[\t\n]/g, '');
});

export default `<svg class="xui-u-hidden-visually">${blob}</svg>`;
