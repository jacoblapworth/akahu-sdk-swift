import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import '../../../.kss/scss/example.scss';

export default function ExampleContainer({
	isInverted,
	className,
	style,
	children,
}) {
	const classnames = cn(
		{
			'ds-example-dark': isInverted,
		},
		className,
	);
	return (
		<div className={classnames} style={style}>
			{children}
		</div>
	);
}

ExampleContainer.propTypes = {
	children: PropTypes.node,
	isInverted: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
};