import React from 'react';
import Component from 'xui-base-component';

const PropTypes = {
	/** @property {Boolean} [isSelect=false] signal if the caret has select styles */
	isSelect: React.PropTypes.bool
};

const DefaultProps = {
	isSelect: false
};

export default class XUIButtonCaret extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const caretClass = this.props.isSelect ? 'xui-select--caret' : 'xui-button--caret';

		return (
				<span className={caretClass}></span>
		);
	}
}

XUIButtonCaret.propTypes = PropTypes;
XUIButtonCaret.defaultProps = DefaultProps;
