import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-contentblock`;

export default class XUIContentBlock extends PureComponent {
	render() {
		const {
			className,
			children,
		} = this.props;
		const listClasses = cn(className, baseClass);

		return (
			<ol className={listClasses}>
				{children}
			</ol>
		);
	}
}

XUIContentBlock.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

XUIContentBlock.defaultProps = {};
