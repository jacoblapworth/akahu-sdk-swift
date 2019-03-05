import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIPanel from '../structural/XUIPanel';

export default class XUIGridAreaMasterPanelDropdown extends PureComponent {

	render() {
		const {
			children,
			className,
			...otherProps
		} = this.props;

		const classNames = cn(
			className,
		);

		return (
			<XUIPanel
				className={classNames}
				{...otherProps}
			>
				{children}
			</XUIPanel>
		);
	}
}

XUIGridAreaMasterPanelDropdown.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};
