import React from 'react';
import cn from 'classNames';

// You can opt to pull in the base component and compose your component with it
// e.g. import Cmp from 'base-component';

export default class XUIButton extends React.Component {
	render() {
		const classNames = cn( /* add your classes here */ );

		return (
			<div className={classNames}>{this.props.children}</div>
		);
	}
}