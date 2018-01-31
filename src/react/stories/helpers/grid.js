import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Grid = ({children, className}) => {
	const classes = cn('xui-row-grid', className);
	return (
		<div className={classes}>
			{children}
		</div>
	);
}
Grid.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export default Grid;
