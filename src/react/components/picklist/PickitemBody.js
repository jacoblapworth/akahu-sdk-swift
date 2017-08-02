import React from 'react';
import PropTypes from 'prop-types';
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
const PickitemBody = ({ onClick, onKeyDown, onMouseOver, isSelected, href, multiselect, children, checkboxClassName, target }) => {
	if (multiselect) {
		return (
			<div className="xui-pickitem--body" onClick={onClick} onKeyDown={onKeyDown} onMouseOver={onMouseOver}>
				<XUICheckbox onChange={NOOP} isChecked={isSelected} svgClassName="xui-pickitem--input" className={checkboxClassName} tabIndex={-1}>
					<span className="xui-pickitem--multiselect-label">{children}</span>
				</XUICheckbox>
			</div>
		);
	}
	const rel = target ? "noopener noreferrer" : null
	const childProps = {
		className: 'xui-pickitem--body xui-pickitem--text',
		tabIndex: '-1',
		onClick,
		onKeyDown,
		onMouseOver,
		rel
	};

	if (href) {
		return <a {...childProps} href={href} target={target} >{children}</a>;
	}

	return <button type="button" {...childProps}>{children}</button>;
};

PickitemBody.propTypes = {
	children: PropTypes.node,
	isSelected: PropTypes.bool,
	multiselect: PropTypes.bool,
	href: PropTypes.string,
	checkboxClassName: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	onMouseOver: PropTypes.func,
	target: PropTypes.string
};

export default PickitemBody;
