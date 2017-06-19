import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Picklist from '../picklist/Picklist';
import StatefulPicklist from '../picklist/StatefulPicklist';

import './scss/_dropDown.scss';

export default class DropDownPanel extends PureComponent {
	onKeyDown(e) {
		this.list && this.list.onKeyDown(e);
	}

	getHighlightedId() {
		return this.list ? this.list.getHighlightedId() : null;
	}

	highlightItem(item, event) {
		this.list && this.list.highlightItem(item, event);
	}

	render() {
		const panel = this;
		const {
			children,
			onSelect,
			ignoreKeyboardEvents,
			onHighlightChange
		} = panel.props;

		let containsPicklist = false;
		React.Children.forEach(children, child => {
			if (child.type === Picklist) {
				containsPicklist = true;
			}
		});
		return (
			containsPicklist ?
			<StatefulPicklist
				ref={c => panel.list = c}
				onSelect={onSelect}
				ignoreKeyboardEvents={ignoreKeyboardEvents}
				onHighlightChange={onHighlightChange}
			>
				{children}
			</StatefulPicklist>
			: children
		);
	}
}

DropDownPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/** @property {String} [panelName] Used by NestedDropDown to identify each panel */
	panelName: PropTypes.string,

	/** @property {String} [panelHeading] Used by NestedDropDown to populate the DropDownHeader content */
	panelHeading: PropTypes.string,

	/** @property {Array} [ignoreKeyboardEvents] Pass in an array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** @property {Function} [onSelect] A generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** @property {function} [onHighlightChange] Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func
};

DropDownPanel.defaultProps = {
	ignoreKeyboardEvents: [],
	hasKeyboardEvents: true
};
