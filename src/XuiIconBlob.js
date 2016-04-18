import React from 'react';
import XUIBaseComponent from 'xui-base-component';
import cn from 'classnames';
import icons from './iconData.js';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default class XuiIconBlob extends XUIBaseComponent {
	render() {
		const iconClasses = cn( 'xui-icon-svg' );
		let iconsJSX = [];
		for (let key in icons) {
			iconsJSX.push(
				<symbol key={key} id={key} viewBox="0 0 30 30" className={iconClasses}>
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
}
