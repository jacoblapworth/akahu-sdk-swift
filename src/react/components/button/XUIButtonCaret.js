import React from 'react';
import XUIIcon from '../icon/XUIIcon';
import caret from '@xero/xui-icon/icons/caret';
import PropTypes from "prop-types";
import cn from "classnames";
import {ns} from "../helpers/xuiClassNamespace";

export default function XUIButtonCaret({className, ...props}) {
	return (
		<XUIIcon
			{...props}
			className={cn(className, `${ns}-button--caret`)}
			icon={caret}
		/>
	);
}

XUIButtonCaret.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string
};
