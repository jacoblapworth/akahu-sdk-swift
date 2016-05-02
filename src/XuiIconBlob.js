import React from 'react';
import CSSClasses from 'xui-css-classes';
import icons from './iconData.js';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default function XuiIconBlob () {
	const iconsJSX = Object.keys(icons).map(function(name) {
		const iconName = 'xui-icon-' + name;
		return (
			<symbol key={iconName} id={iconName} viewBox="0 0 30 30" className={'xui-icon-svg'}>
				<path d={icons[name]}/>
			</symbol>
		);
	});

	return (
		<svg className={CSSClasses.Utility.Hidden.VISUALLY}>
			{iconsJSX}
		</svg>
	);
}
