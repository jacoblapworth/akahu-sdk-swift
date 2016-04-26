import React from 'react';
import icons from './iconData.js';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default function XuiIconBlob (){
	let iconsJSX = [];
	for (let key in icons) {
		iconsJSX.push(
			<symbol key={key} id={key} viewBox="0 0 20 20" className={'xui-icon-svg' }>
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
