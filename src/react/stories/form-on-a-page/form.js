import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Form = ({children, className, inline, stacked, ...other}) => (
	<form
		className={cn(
			{
				'xui-form-inline': inline && !stacked,
				'xui-form-layout': stacked &&! inline
			}, className)
		}
		{...other}>
		{children}
	</form>
);
Form.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	inline: PropTypes.bool,
	stacked: PropTypes.bool
}

export default Form;
