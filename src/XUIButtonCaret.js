import React from 'react';
import XUIIcon from 'xui-icon';
import cn from 'classnames';

const propTypes = {
	className: React.PropTypes.string
};

const XUIButtonCaret = ({className, ...props}) => {
	const classes = cn(className, 'xui-button--caret');
	return (
		<XUIIcon icon="caret" className={classes} {...props}/>
	)
};

XUIButtonCaret.propTypes = propTypes;

export default XUIButtonCaret;
