import React from 'react';
import PropTypes from 'prop-types';

const InputLabel = ({ children, htmlFor }) => (
	<label htmlFor={htmlFor} className="xui-text-label xui-fieldlabel-layout">
		{children}
	</label>
);
InputLabel.propTypes = {
	children: PropTypes.string,
	htmlFor: PropTypes.string
};

export default InputLabel;
