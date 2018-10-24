import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	findFirstMenuItem,
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
	isSplitMenuItem,
} from './private/helpers';
import StatefulPicklistWrapper from './StatefulPicklistWrapper';

/**
 * Manages the arrow key events, checks the event is valid and based on the current
 * highlighted element will decide which action to take next to find the next item to highlight.
 *
 * @private
 * @param {Event} event
 * @param {StatefulPicklist} spl
 */
function handleArrowKeyEvents(event, spl) {
	const highlighted = spl.getHighlighted();
	const { isHorizontal } = spl.props;

	switch (event.keyCode) {
	case 37: { // Arrow Left
		const container = findParentGroupContainer(spl.list.current, highlighted);
		if (isHorizontal) {
			spl.highlightPrevious(highlighted);
		} else if (container) {
			if (isNestedListTrigger(highlighted)) {
				const containerInstance = getInstanceForChild(spl.idCache, container);

				// If the nested list is open, close it
				if (containerInstance.isOpen()) {
					getInstanceForChild(spl.idCache, container).close();
				} else {
					// If the nested list is closed, check to see if the previous item is a split menu item.  If
					// it is, highlight that
					const prev = findPreviousItem(spl.list.current, highlighted, spl.idCache);
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
		if (isHorizontal) {
			spl.highlightNext(highlighted);
		} else if (isSplitMenuItem(highlighted)) {
			spl.highlightNext(highlighted);
		} else if (isNestedListTrigger(highlighted)) {
			const container = findParentGroupContainer(spl.list.current, highlighted);
			if (container) {
				getInstanceForChild(spl.idCache, container).open();
			}
		}
		break;
	case 40: // Arrow Down
		spl.highlightNext(highlighted);
		break;
	default:
		break;
	}
}

/**
 * A Picklist that keeps track of the currently highlighted menu item.  APIs exist
 * to change the highlighted item, and a keydown event handler exists to either
 * automatically handle keyboard events (down arrow selects next item, etc) or
 * simulate that if the focus is elsewhere.
 *
 * @export
 * @class StatefulPicklist
 * @extends {React.element}
 */
class StatefulPicklist extends Component {
	constructor(props) {
		super(props);

		const spl = this;

		spl.state = {
			highlightedElement: null,
		};
		spl.idCache = {};
		spl.onKeyDown = spl.onKeyDown.bind(spl);
		spl.selectHighlighted = spl.selectHighlighted.bind(spl);
		spl.highlightNext = spl.highlightNext.bind(spl);
		spl.highlightPrevious = spl.highlightPrevious.bind(spl);
		spl.highlightInitial = spl.highlightInitial.bind(spl);
		spl.findItemById = spl.findItemById.bind(spl);
		spl.onClick = spl.onClick.bind(spl);
		spl.onMouseOver = spl.onMouseOver.bind(spl);
		spl.list = React.createRef();
	}

	componentDidUpdate() {
		/**
		 * We could be in two scenarios here. We've opened the list and no item is
		 * highlighted so lets highlight it
		 * OR
		 * We're an inline open list and we've click on an item to force the list
		 * in focus, it doesn't have a highlighted item, but we also need to check
		 * there isn't a selected item at this stage too. If not, lets force the
		 * first item to be our highlightedElement.
		 */
		this.highlightInitial();
	}

	/**
	 * Get the React virtual DOM representation of the currently highlighted element.
	 *
	 * @public
	 * @returns {React.element}
	 * @memberof StatefulPicklist
	 */
	getHighlighted() {
		return this.state.highlightedElement;
	}

	/**
	 * Get the ID of the currently highlighted element.
	 *
	 * @public
	 * @returns {String} null if nothing is highlighted
	 * @memberof StatefulPicklist
	 */
	getHighlightedId() {
		return getId(this.getHighlighted());
	}

	/**
	 * onClick of each item in the list we should select that item.
	 *
	 * @param {Event} [event]
	 * @param {String} itemId id of the item
	 */
	onClick(event, itemId) {
		this.selectHighlighted(this.findItemById(itemId));
	}

	/**
	 * Fired when either the enter key or space bar is pressed and calls onclick of
	 * the menu item before closing the list.
	 *
	 * @public
	 * @param {React.element} item to be selected
	 */
	selectHighlighted(item) {
		const spl = this;
		const { value } = item.props;

		spl.setState({
			highlightedElement: item,
		});

		item.props.onSelect && item.props.onSelect(value, item);
		spl.props.onSelect && spl.props.onSelect(value, item);
	}

	/**
	 * Highlights the previous item in the list.
	 *
	 * @public
	 * @param {React.element} currentItem - Current item highlighted
	 */
	highlightPrevious(currentItem) {
		const prevItem = findPreviousItem(this.list.current, currentItem, this.idCache);
		this.highlightItem(prevItem);
	}

	/**
	 * Highlights the next item in the list.
	 *
	 * @public
	 * @param {React.element} currentItem - Current item highlighted
	 */
	highlightNext(currentItem) {
		const nextItem = findNextItem(this.list.current, currentItem, this.idCache);
		this.highlightItem(nextItem);
	}

	/**
	 * Highlights the first item in the list.
	 *
	 * @public
	 */
	highlightFirst() {
		const firstItem = findFirstMenuItem(this.list.current, this.idCache);
		this.highlightItem(firstItem);
	}

	/**
	 * Highlights the item passed in and fires the onHighlightChange callback.
	 *
	 * @public
	 * @param {React.element} item - Item to highlight
	 * @param {Event} [event]
	 */
	highlightItem(item, event) {
		const spl = this;
		spl.setState({
			highlightedElement: item,
		});

		spl.props.onHighlightChange && spl.props.onHighlightChange(item, event);
	}

	/**
	 * This API is used to ensure that something appropriate is highlighted. Here's
	 * the logical ordering of operations:
	 *
	 * 1. If something's already highlighted, leave it alone.
	 * 2. Try and highlight the first selected item.
	 * 3. Highlight the first item in the list.
	 *
	 * If these rules don't apply to you - for example, if you're a search box - you
	 * can get the shouldManageInitialHighlight prop to false
	 *
	 * @public
	 * @memberof StatefulPicklist
	 */
	highlightInitial() {
		if (this.props.shouldManageInitialHighlight === false) {
			return;
		}
		const highlightedEl = this.getHighlighted();
		const canFindHighlightedEl = highlightedEl
			// eslint-disable-next-line no-prototype-builtins
			&& this.idCache.hasOwnProperty(highlightedEl.props.id)
			&& this.idCache[highlightedEl.props.id];
		if (!canFindHighlightedEl) {
			const firstItem = findInitialHighlightedItem(this.list.current, this.idCache);
			if (firstItem) {
				this.setState({
					highlightedElement: firstItem,
				});
			}
		}
	}

	/**
	 * Find a child element by its ID. Used so we have access to the keys of that item.
	 *
	 * @public
	 * @param {String} id of the item you want to find the instance of.
	 */
	findItemById(id) {
		let foundItem = null;

		const findItem = node => {
			if (getId(node) === id) {
				foundItem = node;
				return true;
			}
			return false;
		};

		walk(this.list.current, findItem);
		return foundItem;
	}

	/**
	 * Handles a keydown event, switch statement tells the list which action to take
	 * next based on they key pressed.  Public API that can be used to simulate
	 * keydown events if the DOM focus is elsewhere.
	 *
	 * @public
	 * @param {KeyboardEvent} event Event
	 */
	onKeyDown(event) {
		const spl = this;
		const { ignoreKeyboardEvents } = spl.props;

		if (ignoreKeyboardEvents.indexOf(event.keyCode) === -1) {
			switch (event.keyCode) {
			// 'space' and 'enter' keys
			case 13:
			case 32: {
				event.preventDefault();
				const el = spl.getHighlighted();
				if (el) {
					if (isNestedListTrigger(el)) {
						const container = findParentGroupContainer(spl.list.current, el);
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
			default:
				break;
			}
		}
	}

	/**
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

	render() {
		const spl = this;
		const {
			children,
			qaHook,
			className,
			canFocus,
			id,
			secondaryProps,
		} = spl.props;

		return (
			<StatefulPicklistWrapper
				{...secondaryProps}
				data-automationid={qaHook}
				ref={spl.list}
				onMouseDown={e => e.preventDefault()}
				onKeyDown={spl.onKeyDown}
				className={className}
				id={id}
				tabIndex={canFocus ? 0 : null}
				aria-activedescendant={spl.getHighlightedId()}
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

	/** AN array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** ID of the list */
	id: PropTypes.string,

	/** Whether the StatefulPicklist manages highlighting of list elements */
	shouldManageInitialHighlight: PropTypes.bool,

	/** Enables a generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** Whether or not the user should be allowed to tab to this component */
	canFocus: PropTypes.bool,

	/** Callback when the highlighted element has changed. */
	onHighlightChange: PropTypes.func,

	/** An object of props that can be spread on the stateful picklist, useful for aria attributes. */
	secondaryProps: PropTypes.object,

	/** Whether to use left/right arrow keys to move between pickitems as opposed to up/down */
	isHorizontal: PropTypes.bool,
};

StatefulPicklist.defaultProps = {
	ignoreKeyboardEvents: [],
	canFocus: false,
	secondaryProps: {
		role: 'tree',
	},
	shouldManageInitialHighlight: true,
};

export { StatefulPicklist as default, findPreviousItem, findNextItem };
