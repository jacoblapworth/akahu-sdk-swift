import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const library = {
	full: '12',
	half: '6',
	third: '4',
	quarter: '3'
};

// Takes a string, turns it into the right class
// `full` => `xui-column-12-of-12`
// `half` => `xui-column-6-of-12`
// `third` => `xui-column-4-of-12`
// `quarter` => `xui-column-3-of-12`
function constructClassName(name) {
	return `xui-column-${library[name]}-of-12`;
}

// Takes an object of named properties, returns the correct class name
// Used in component / props
function getClasses({ className, full, half, third, quarter }) {
	return cn(className, {
		[constructClassName('full')]: full || (!half && !third && !quarter),
		[constructClassName('half')]: half,
		[constructClassName('third')]: third,
		[constructClassName('quarter')]: quarter
	});
}

// Nice name space for exporting and getting classes
export function column(columnNeeded) {
	return constructClassName(columnNeeded);
}

const Column = ({
	children,
	className,
	full,
	half,
	third,
	quarter,
	...other
}) => {
	const columnClasses = getClasses({ className, full, half, third, quarter });

	return (
		<div {...other} className={columnClasses}>
			{children}
		</div>
	);
};
Column.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	full: PropTypes.bool,
	half: PropTypes.bool,
	third: PropTypes.bool,
	quarter: PropTypes.bool
};

export default Column;
