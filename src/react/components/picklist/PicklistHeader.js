import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { picklistClassName } from './private/constants';

/**
 * Presentational (aka dumb) component used to display a non-selectable header in a
 * list of items.
 *
 * @export
 * @class PicklistHeader
 * @extends {PureComponent}
 */
export default class PicklistHeader extends PureComponent {
	render() {
		const {
			id,
			className,
			ariaRole,
			children,
		} = this.props;

		const classes = cn(
			`${picklistClassName}--header`,
			className,
		);

		return (
			<li
				className={classes}
				role={ariaRole}
				id={id}
			>
				<span className={`${picklistClassName}--header--text`}>{children}</span>
			</li>
		);
	}
}

PicklistHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** ARIA attribute defining what purpose this item serves. */
	ariaRole: PropTypes.string,
};
