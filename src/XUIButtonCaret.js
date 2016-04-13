import React from 'react';
import XUIClasses from 'xui-css-classes';

const ButtonClasses = XUIClasses.Button;

const PropTypes = {
	/** @property {boolean} [isSelect=false] signal if the caret has select styles */
	isSelect: React.PropTypes.bool
};

const XUIButtonCaret = ({ isSelect }) => (
	<span className={isSelect ? 'xui-select--caret' : ButtonClasses.CARET}></span>
);

XUIButtonCaret.propTypes = PropTypes;

export default XUIButtonCaret;
