import React from 'react';
import Classes from 'xui-css-classes';

const PropTypes = {
	/** @property {boolean} [isSelect=false] signal if the caret has select styles */
	isSelect: React.PropTypes.bool
};

const XUIButtonCaret = ({ isSelect }) => (
	<span className={isSelect ? Classes : `${Classes.Button.CARET} ${Classes.Margin.LEFT}`}></span>
);

XUIButtonCaret.propTypes = PropTypes;

export default XUIButtonCaret;
