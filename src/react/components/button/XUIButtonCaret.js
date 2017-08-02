import React from 'react';
import XUIIcon from '../icon/XUIIcon';
import caret from '@xero/xui-icon/icons/caret';
import PropTypes from "prop-types";
import cn from 'classnames';

export default function XUIButtonCaret({className, ...props}) {
	const classes = cn(className, 'xui-button--caret');
	return (
		<XUIIcon path={caret} className={classes} {...props}/>
	);
}

XUIButtonCaret.propTypes = {
	className: PropTypes.string
};
