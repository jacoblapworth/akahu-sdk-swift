import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import {baseClass} from './private/constants';
import {ns} from "../helpers/xuiClassNamespace";

export default function XUIToastAction(props) {
	const classNames = cn(props.className, `${ns}-button-small`);
	const isLink = !!props.href;
	const buttonQaHook = props.qaHook && `${props.qaHook}-button`;

	return (
		<li className={`${baseClass}--action`} data-automationid={props.qaHook}>
			<XUIButton {...props} isLink={isLink} variant="link" className={classNames} qaHook={buttonQaHook}>{props.children}</XUIButton>
		</li>
	);
}

XUIToastAction.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string
};
