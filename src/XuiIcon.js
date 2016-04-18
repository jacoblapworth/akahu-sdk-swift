import React from 'react';
import XUIBaseComponent from 'xui-base-component';
import cn from 'classnames';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default class XuiIcon extends XUIBaseComponent {
	render() {
		const classNames = cn( /* add your classes here */ );

		return (
			<div className={classNames}>{this.props.children}</div>
		);
	}
}