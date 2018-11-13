import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/7-components/_contentblocks.scss';

const baseClass = `${ns}-contentblock`;

export default class XUIContentBlock extends PureComponent {
	render() {
		const {
			className,
			children,
		} = this.props;
		const listClasses = cn(className, baseClass);

		return (
			<div className={listClasses}>
				{children}
			</div>
		);
	}
}

XUIContentBlock.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

XUIContentBlock.defaultProps = {};
