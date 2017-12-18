import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function getClasses({className, full, half, third, quarter}) {
	return cn(className, {
		'xui-column-12-of-12': full || !half && !third && !quarter,
		'xui-column-6-of-12': half,
		'xui-column-4-of-12': third,
		'xui-column-3-of-12': quarter
	});
}

const Column = ({children, className, full, half, third, quarter, ...other}) => {

	const columnClasses = getClasses({className, full, half, third, quarter});

	return (
		<div
			className={columnClasses}
			{...other}>
			{children}
		</div>
	);
}
Column.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	full: PropTypes.bool,
	half: PropTypes.bool,
	third: PropTypes.bool,
	quarter: PropTypes.bool
};

export default Column;
