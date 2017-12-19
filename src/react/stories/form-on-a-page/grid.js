import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({children}) => (
	<div className="xui-row-grid">
		{children}
	</div>
);
Grid.propTypes = {
	children: PropTypes.any
};

export default Grid;
