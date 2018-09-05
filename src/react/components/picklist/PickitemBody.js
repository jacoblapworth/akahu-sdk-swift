import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUICheckbox from '../checkbox/XUICheckbox';
import { ns } from '../helpers/xuiClassNamespace';

const NOOP = () => {};

/**
 * INTERNAL USE ONLY
 *
 * This presentation component is used internally in the XUI library to display the
 * contents of a Pickitem.
 *
 * @param {Object} props
 */
const PickitemBody = ({
	onClick,
	onKeyDown,
	shouldTruncate,
	onMouseOver,
	isSelected,
	href,
	isMultiselect,
	children,
	checkboxClassName,
	target,
	qaHook,
	tabIndex,
}) => {
	if (isMultiselect) {
		return (
			<div
				className={`${ns}-pickitem--body`}
				onClick={onClick}
				onKeyDown={onKeyDown}
				onMouseOver={onMouseOver}
				onFocus={onMouseOver}
				data-automationid={qaHook}
				role="presentation"
			>
				<XUICheckbox
					onChange={NOOP}
					isChecked={isSelected}
					tabIndex={-1}
					qaHook={qaHook && `${qaHook}--checkbox`}
					htmlClassName={`${ns}-pickitem--input`}
					className={cn(checkboxClassName, `${ns}-pickitem-multiselect--checkbox`)}
					labelClassName={`${ns}-pickitem-multiselect--label`}
					isGrouped
				>
					<span
						className={shouldTruncate ? `${ns}-text-truncated` : ''}
						data-automationid={qaHook && `${qaHook}--label`}
					>
						{children}
					</span>
				</XUICheckbox>
			</div>
		);
	}
	const rel = target ? 'noopener noreferrer' : null;
	const childProps = {
		className: `${ns}-pickitem--body`,
		onClick,
		onKeyDown,
		onMouseOver,
		rel,
		tabIndex,
	};

	const textClassName = cn(
		`${ns}-pickitem--text`,
		shouldTruncate && `${ns}-text-truncated`,
	);

	const text = <span className={textClassName}>{children}</span>;
	return href ? (
		<a href={href} target={target} data-automationid={qaHook} {...childProps}>{text}</a>
	) : (
		<button type="button" data-automationid={qaHook} {...childProps}>{text}</button>
	);
};

PickitemBody.propTypes = {
	children: PropTypes.node,
	isSelected: PropTypes.bool,
	isMultiselect: PropTypes.bool,
	href: PropTypes.string,
	checkboxClassName: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	onMouseOver: PropTypes.func,
	target: PropTypes.string,
	shouldTruncate: PropTypes.bool,
	qaHook: PropTypes.string,
	tabIndex: PropTypes.string,
};

export default PickitemBody;
