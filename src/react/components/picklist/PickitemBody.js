import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUICheckbox from '../checkbox/XUICheckbox';

const NOOP = () => {};

/**
 * INTERNAL USE ONLY
 *
 * This presentation component is used internally in the XUI library to display the
 * contents of a Pickitem.
 *
 * @param {Object} props
 */
const PickitemBody = ({ onClick, onKeyDown, shouldTruncate, onMouseOver, isSelected, href, isMultiselect, children, checkboxClassName, target, qaHook }) => {
	if (isMultiselect) {
		return (
			<div className="xui-pickitem--body" onClick={onClick} onKeyDown={onKeyDown} onMouseOver={onMouseOver} data-automationid={qaHook}>
				<XUICheckbox
					onChange={NOOP}
					isChecked={isSelected}
					tabIndex={-1}
					qaHook={qaHook && `${qaHook}--checkbox`}
					svgClassName="xui-pickitem--icon"
					className={cn(checkboxClassName, 'xui-pickitem--multiselect-checkbox')}
					labelClassName="xui-pickitem--multiselect-label"
				>
					<span className={shouldTruncate ? 'xui-text-truncated' : null} data-automationid={qaHook && `${qaHook}--label`}>{children}</span>
				</XUICheckbox>
			</div>
		);
	}
	const rel = target ? "noopener noreferrer" : null;
	const childProps = {
		className: 'xui-pickitem--body',
		tabIndex: '-1',
		onClick,
		onKeyDown,
		onMouseOver,
		rel,
	};

	const textClassName = cn('xui-pickitem--text', {
		'xui-text-truncated': shouldTruncate
	});

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
	qaHook: PropTypes.string
};

export default PickitemBody;
