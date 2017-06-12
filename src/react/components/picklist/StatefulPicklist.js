import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	findInitialHighlightedItem,
	findPreviousItem,
	findNextItem,
	cloneChildren,
	getId,
	walk,
	isNestedListTrigger,
	findParentGroupContainer,
	isMenuItem,
	getInstanceForChild,
	isSplitMenuItem
} from './private/helpers';

/**
 * @private
 *
 * Manages the arrow key events, checks the event is valid and based on the current
 * highlighted element will decide which action to take next to find the next item to highlight.
 *
 * @param {Event} event
 * @param {StatefulPicklist} spl
 */
function handleArrowKeyEvents(event, spl) {
	const highlighted = spl.getHighlighted();
	switch (event.keyCode) {
		case 37: { // Arrow Left
			const container = findParentGroupContainer(spl.list, highlighted);
			if (container) {
				if (isNestedListTrigger(highlighted)) {
					const containerInstance = getInstanceForChild(spl.idCache, container);

					// If the nested list is open, close it
					if (containerInstance.isOpen()) {
						getInstanceForChild(spl.idCache, container).close();
					} else {
						// If the nested list is closed, check to see if the previous item is a split menu item.  If
						// it is, highlight that
						const prev = findPreviousItem(spl.list, highlighted, spl.idCache);
						if (isSplitMenuItem(prev)) {
							spl.highlightItem(prev);
						}
					}
				} else if (isMenuItem(highlighted)) {
					spl.highlightItem(container.props.children.find(isNestedListTrigger));
				}
			}
			break;
		}
		case 38: // Arrow Up
			spl.highlightPrevious(highlighted);
			break;
		case 39: // Arrow Right
			if (isSplitMenuItem(highlighted)) {
				spl.highlightNext(highlighted);
			} else if (isNestedListTrigger(highlighted)) {
				const container = findParentGroupContainer(spl.list, highlighted);
				if (container) {
					getInstanceForChild(spl.idCache, container).open();
				}
			}
			break;
		case 40: // Arrow Down
			spl.highlightNext(highlighted);
			break;
	}
}

class StatefulPicklist extends Component {
	constructor(props) {
		super(props);

		const spl = this;

		spl.state = {
			highlightedElement: null
		};
		spl.idCache = {};
		spl.onKeyDown = spl.onKeyDown.bind(spl);
		spl.selectHighlighted = spl.selectHighlighted.bind(spl);
		spl.highlightNext = spl.highlightNext.bind(spl);
		spl.highlightPrevious = spl.highlightPrevious.bind(spl);
		spl.findItemById = spl.findItemById.bind(spl);
		spl.onClick = spl.onClick.bind(spl);
		spl.onMouseDown = spl.onMouseDown.bind(spl);
		spl.onMouseOver = spl.onMouseOver.bind(spl);
	}

	componentDidUpdate() {
		const spl = this;

		/**
		 * We could be in two scenarios here. We've opened the list and no item is highlighted so lets highlight it
		 * OR
		 * We're an inline open list and we've click on an item to force the list in focus, it doesn't have a highlighted item,
		 * but we also need to check there isn't a selected item at this stage too. If not, lets force the first item to be our highlightedElement.
		 */
		if (spl.getHighlighted() == null) {
			const firstItem = findInitialHighlightedItem(spl.list, this.idCache);
			if (firstItem) {
				spl.setState({
					highlightedElement: firstItem
				});
			}
		}
	}

	getHighlighted() {
		return this.state.highlightedElement;
}

	getHighlightedId() {
		return getId(this.getHighlighted());
	}

	/**
	 * @public
	 * onClick of each item in the list we should select that item.
	 *
	 * @param {Event} [event]
	 * @param {String} itemId id of the item
	 */
	onClick(event, itemId) {
		this.selectHighlighted(this.findItemById(itemId));
	}

	/**
	 * @public
	 * Fired when either the enter key or space bar is pressed and calls onclick of the menu item before closing the list.
	 *
	 * @param {Component} item to be selected
	 */
	selectHighlighted(item) {
		const spl = this;
		const value = item.props.value;

		spl.setState({
			highlightedElement: item
		});

		item.props.onSelect && item.props.onSelect(value, item);
		spl.props.onSelect && spl.props.onSelect(value, item);
	}

	/**
	 * @public
	 * Highlights the previous item in the list.
	 *
	 * @param {Component} currentItem - Current item highlighted
	 */
	highlightPrevious(currentItem) {
		const prevItem = findPreviousItem(this.list, currentItem, this.idCache);
		this.highlightItem(prevItem);
	}

	/**
	 * @public
	 * Highlights the next item in the list.
	 *
	 * @param {Component} currentItem - Current item highlighted
	 */
	highlightNext(currentItem) {
		const nextItem = findNextItem(this.list, currentItem, this.idCache);
		this.highlightItem(nextItem);
	}

	/**
	 * @public
	 * Highlights the item passed in and fires the onHighlightChange callback.
	 *
	 * @param {Component} item - Item to highlight
	 * @param {Event} [event]
	 */
	highlightItem(item, event) {
		const spl = this;
		spl.setState({
			highlightedElement: item
		});

		spl.props.onHighlightChange && spl.props.onHighlightChange(item, event);
	}

	/**
	 * @public
	 * Find a child element by its ID. Used so we have access to the keys of that item.
	 *
	 * @param {String} id of the item you want to find the instance of.
	 */
	findItemById(id) {
		let foundItem = null;

		const findItem = node => {
			if (getId(node) === id) {
				foundItem = node;
				return true;
			}
		};

		walk(this.list, findItem);
		return foundItem;
	}

	/**
	 * @public
	 *
	 * Handles a keydown event, switch statement tells the list which action to take next based on they key pressed
	 *
	 * @param {KeyboardEvent} event Event
	 */
	onKeyDown(event) {
		const spl = this;
		const { ignoreKeyboardEvents } = spl.props;
		if (ignoreKeyboardEvents.indexOf(event.keyCode) === -1) {
			switch (event.keyCode){
				// 'space' and 'enter' keys
				case 13:
				case 32: {
					event.preventDefault();
					const el = spl.getHighlighted();
					if (el) {
						if (isNestedListTrigger(el)) {
							const container = findParentGroupContainer(spl.list, el);
							if (container) {
								getInstanceForChild(spl.idCache, container).toggle();
							}
						} else {
							spl.selectHighlighted(el);
						}
					}
					break;
				}
				// All arrow keys
				case 37:
				case 38:
				case 39:
				case 40:
					event.preventDefault();
					handleArrowKeyEvents(event, spl);
					break;
			}
		}
	}

	/**
	 * @public
	 *
	 * Removes any previously highlighted elements and sets the class on the next one.
	 *
	 * @param {MouseEvent} event
	 * @param {String} itemId  id of item
	 */
	onMouseOver(event, itemId) {
		const spl = this;
		const currentItem = spl.findItemById(itemId);

		if (currentItem !== spl.state.highlightedElement) {
			spl.highlightItem(currentItem, event);
		}

	}

	/**
	 * @public
	 *
	 * Stops individual items from stealing focus from the list itself when clicked.
	 *
	 * @param {MouseEvent} event
	 */
	onMouseDown(event) {
		event.preventDefault();
	}

	render() {
		const spl = this;
		const { children, qaHook, className, canFocus, id, secondaryProps } = spl.props;
		return (
			<StatefulPicklistWrapper
				data-automationid={qaHook}
				ref={c => spl.list = c}
				onMouseDown={spl.onMouseDown}
				onKeyDown={spl.onKeyDown}
				className={className}
				id={id}
				tabIndex={canFocus ? 0 : null}
				aria-activedescendant={spl.getHighlightedId()}
				{...secondaryProps}
			>
				{cloneChildren(children, spl)}
			</StatefulPicklistWrapper>
		);
	}
}

StatefulPicklist.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** @property {Array} [ignoreKDEvent] Pass in an array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** @property {String} [id] id of the list */
	id: PropTypes.string,

	/** @property {Function} [onSelect] Enables a generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** @property {boolean} [canFocus=false] Whether or not the user should be allowed to tab to this component */
	canFocus: PropTypes.bool,

	/** @property {Function} [onHighlightChange] callback when the highlighted element has changed. */
	onHighlightChange: PropTypes.func,

	/** @property {object} [secondaryProps] An object of props that can be spread on the stateful picklist, useful for aria attributes. */
	secondaryProps: PropTypes.object
};

StatefulPicklist.defaultProps = {
	ignoreKeyboardEvents: [],
	hidden: false,
	canFocus: false,
	secondaryProps : {
		role:"tree"
	}
};

/**
 * This wrapper class is so we can reference the list through the virtual DOM. When a react DOM node is used the ref is the
 * actual DOM node rendered instead of React's virtual DOM. As the StatefulPicklist relies on this virtual DOM to
 * navigate through it's children we need to create a wrapper.
 */
class StatefulPicklistWrapper extends Component {
	render() {
		const { children, ...spreadProps } = this.props;
		return <div { ...spreadProps }>{children}</div>
	}
}

StatefulPicklistWrapper.propTypes = {
	children: PropTypes.node
};

export { StatefulPicklist as default, findPreviousItem, findNextItem };
