import React from 'react';
import Component from 'xui-base-component';
import {Button as ButtonClasses} from 'xui-css-classes';

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
