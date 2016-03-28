import React from 'react';
import Component from 'xui-base-component';
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

export default class XUIButtonCaret extends Component {
	render() {
		const caretClass = this.props.isSelect ? 'xui-select--caret' : ButtonClasses.CARET;

		return (
				<span className={caretClass}></span>
		);
	}
}

XUIButtonCaret.propTypes = PropTypes;
XUIButtonCaret.defaultProps = DefaultProps;
