import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';

export default function XUIToastAction(props) {
	const classNames = cn(props.className, 'xui-toast--link');
	const isLink = !!props.href;

	return (
		<li className="xui-toast--action">
			<XUIButton {...props} isLink={isLink} variant="link" className={classNames}>{props.children}</XUIButton>
		</li>
	);
}

XUIToastAction.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node
};
