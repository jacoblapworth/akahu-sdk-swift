import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Picklist from '../picklist/Picklist';
import StatefulPicklist from '../picklist/StatefulPicklist';

import './scss/_dropDown.scss';

/**
 * Presentational component that will automatically output a StatefulPicklist if
 * a Picklist is passed in as a child so that keyboard interactivity is added as
 * a convenience.
 *
 * @export
 * @class DropDownPanel
 * @extends {PureComponent}
 */
export default class DropDownPanel extends PureComponent {
	onKeyDown(e) {
		this.list != null && this.list.onKeyDown(e);
	}

	/**
	 * Get the ID of the currently highlighted item in the child StatefulPicklist (if applicable).
	 *
	 * @public
	 * @returns {String} null if nothing is highlighted or no child StatefulPicklist exists
	 * @memberof DropDownPanel
	 */
	getHighlightedId() {
		return this.list != null ? this.list.getHighlightedId() : null;
	}

	/**
	 * Highlight a specific item in the child StatefulPicklist (if applicable).
	 *
	 * @public
	 * @param {React.element} item
	 * @param {UIEvent} event
	 * @memberof DropDownPanel
	 */
	highlightItem(item, event) {
		this.list != null && this.list.highlightItem(item, event);
	}

	/**
	 * Used to highlight an item immediately after a dropdown opens.
	 *
	 * @public
	 * @memberof DropDownPanel
	 */
	highlightInitial() {
		if (this.list != null) {
			this.list.highlightInitial();
		}
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

	/** Used by NestedDropDown to identify each panel. */
	panelId: PropTypes.string,

	/** Used by NestedDropDown as the header for the panel */
	header: PropTypes.node,

	/** An array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** A generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func,
};

DropDownPanel.defaultProps = {
	ignoreKeyboardEvents: [],
	hasKeyboardEvents: true
};
