import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAllClasses } from '../../../components/structural/XUIColumn';

const InputGroup = ({ children, className, isFieldLayout, ...other }) => {
	const columns = {
		1: 'full',
		2: 'half',
		3: 'third',
		4: 'quarter'
	};

	const noOfChildren = children.length;
	const columnChosen = noOfChildren <= 4 ? columns[noOfChildren] : columns[1];

	return (
		<div
			{...other}
			className={cn(className, 'xui-textinputgroup', {
				'xui-field-layout': isFieldLayout
			})}
		>
			{children.map((child, idx) => {
				const newChild = React.cloneElement(child, {
					key: idx,
					fieldClassName: getAllClasses({
						className: child.props.className,
						gridColumns: columnChosen
					})
				});
				return newChild;
			})}
		</div>
	);
};
InputGroup.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	isFieldLayout: PropTypes.bool
};

export default InputGroup;
