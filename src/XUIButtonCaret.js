import React from 'react';
import XUIClasses from 'xui-css-classes';

const ButtonClasses = XUIClasses.Button;

const PropTypes = {
	/** @property {boolean} [isSelect=false] signal if the caret has select styles */
	isSelect: React.PropTypes.bool
};

const DefaultProps = {
	isSelect: false,
	pureRender: true
};

const XUIButtonCaret = ({ isSelect }) => (
	<span className={isSelect ? 'xui-select--caret' : ButtonClasses.CARET}></span>
);

export default XUIButtonCaret;

XUIButtonCaret.propTypes = PropTypes;
XUIButtonCaret.defaultProps = DefaultProps;
