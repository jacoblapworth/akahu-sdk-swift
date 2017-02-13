import React from 'react';
import XUIIcon from 'xui-icon';
import cn from 'classnames';

export default function XUIButtonCaret({className, ...props}) {
	const classes = cn(className, 'xui-button--caret');
	return (
		<XUIIcon icon="caret" className={classes} {...props}/>
	);
}

XUIButtonCaret.propTypes = {
	className: React.PropTypes.string
};
