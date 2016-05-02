import React from 'react';
import icons from './iconData.js';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default function XuiIconBlob (){
	let iconsJSX = [];
	for (let key in icons) {
		const iconName = 'xui-icon-' + key;
		iconsJSX.push(
			<symbol key={iconName} id={iconName} viewBox="0 0 30 30" className={'xui-icon-svg' }>
				<path d = {icons[key]}/>
			</symbol>
		);
	}
	return (
		<svg style={{display:'none'}}>
			{iconsJSX}
		</svg>
	);
}
