import React from 'react';
import PropTypes from 'prop-types';

const InputLabel = ({children}) => (
	<label className="xui-text-label xui-fieldlabel-layout">{children}</label>
);
InputLabel.propTypes = {
	children: PropTypes.string
};

export default InputLabel;
